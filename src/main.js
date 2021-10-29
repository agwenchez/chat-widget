import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Widget from './components/Widget/Widget';
import Config from './config';

const widgetName = Config.name;
const widgetConfigName = widgetName + 'Config'
const defaultconfig = {
    someDefaultConfiguration: false
};
let widgetComponent = null;

function app(window) {
    console.log(`${widgetName} starting`);
    // If we don't already have a name for widget's global object
    // assigned by the host, then they must be using the simple <script> tag method
    // so we need to get our data out of that tag
    if (!window[widgetName]) {
        let tag = document.getElementById(widgetName + '-Script');

        if (!tag) {
            throw Error(`Cannot find script tag with id ${widgetName}-Script`);
        }
        // console.log("Tag", tag)
        let rawData = tag.getAttribute('data-config');
        rawData = rawData.replace(/'/g, "\"");
        // console.log("raw data",rawData);
        let data = JSON.parse(rawData);
        // console.log("Data",data);
        window[widgetName] = data.name;

        let placeholder = {};
        (placeholder.q = []).push(['init', data.config]);

        window[window[widgetName]] = placeholder;
        // console.log("Placeholder", placeholder);
    }


    let placeholder = window[window[widgetName]];
    // console.log("Placeholder", placeholder);

    // override temporary (until the app loaded) handler
    // for widget's API calls
    window[window[widgetName]] = apiHandler;
    window[widgetConfigName] = defaultconfig;

    if (placeholder) {
        console.log(`${widgetName} placeholder found`);

        let queue = placeholder.q;
        if (queue) {
            console.log(`${widgetName} placeholder queue found`);

            for (var i = 0; i < queue.length; i++) {
                apiHandler(queue[i][0], queue[i][1]);
            }
        }
    }
}

/**
    Method that handles all API calls
*/
function apiHandler(api, params) {
    if (!api) throw Error('API method required');
    api = api.toLowerCase();
    let config = window[widgetConfigName];
    console.log("API", api)
    console.log(`Handling API call ${api}`, params, config);

    switch (api) {
        case 'init':
            config = Object.assign({}, config, params);
            window[widgetConfigName] = config;
            // console.log("Config", config)
            // get a reference to the created widget component so we can
            // call methods as needed
            widgetComponent = React.createRef();
            ReactDOM.render(<Widget ref={widgetComponent} />, document.getElementById(config.targetElementId));
            break;
        // case 'message':
        //     // Send the message to the current widget instance
        //     widgetComponent.current.setMessage(params);
        //     // console.log("Widget component", params)
        //     break;
        default:
            throw Error(`Method ${api} is not supported`);
    }
}

app(window);

export default app;
