import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import Config from '../../config';
import './widget.css';
import { FaComments, FaTimes } from "react-icons/fa";
// import { IconName } from "react-icons/fi";

const widgetName = Config.name;

// export default Widget = () => {

//     console.log("I am a component")
//     const [meso, setMeso] = useState(null)
//     const setMessage = (message) => {
//         setMeso({ meso: message })
//         return;
//     }

//     return (
//         <>
//             {meso ? (
//                 <div className="widget-container"><h1>I'm a {widgetName}</h1><div>I have a message: {meso}</div></div>) :
//                 (<div className="widget-container"><h1>I'm a {widgetName}</h1></div>)}
//         </>
//     )
// }


class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            open: false,
            email: '',
            message: '',
            submit: true
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ ...this.state, submit: false });
        console.log("Submit", this.state.submit)
    }
    // ToggleChat(){
    //     this.setState({...this.state, open:!this.state.open});
    //     console.log("Open", this.state.open)
    // }
    render() {
        // console.log("I am a component")
        // if (this.state.message) {
        //     return <div className="widget-container"><h1>I'm a {widgetName}</h1><div>I have a message: {this.state.message}</div></div>;
        // }
        // else {
        return (
            <div style={{ position: 'fixed', bottom: 30, right: 30 }}>
                {this.state.submit ? (
                <>
                    <div className={`message-container ${this.state.open === true && "hidden"}`}>
                        <h2>We are not here, drop us an email...</h2>
                        <form className="content">
                            <input id="email" type="email" required placeholder="Enter your email address" value={this.state.email} onChange={(e)=>this.setState({ ...this.state, email: e.target.value })} />
                            <textarea id='messages'value={this.state.message} onChange={(e)=>this.setState({ ...this.state, message: e.target.value })} placeholder="Enter your message" required>

                            </textarea>
                            <button onClick={()=> { this.state.message !== '' & this.state.email !== '' && this.setState({ ...this.state, submit: false }); console.log("Submit", this.state.submit)}} >Submit</button>
                        </form>
                    </div>

                    <div className='button-container'>
                        <FaComments
                            className={`icon ${this.state.open === true && "hidden"}`}
                            onClick={() => {
                                this.setState({ ...this.state, open: !this.state.open });
                                // console.log("Open", this.state.open)
                            }}
                        />

                        <FaTimes
                            className={`icon ${this.state.open === false && "hidden"}`}
                            onClick={() => {
                                this.setState({ ...this.state, open: !this.state.open });
                                // console.log("Open", this.state.open)
                            }}
                        />
                    </div>
                </>) : (
                    <div className='message-container'>
                        <h2>Thanks for your submission.</h2>
                        <p className="content">Someone will be in touch with your shortly regarding your enquiry</p>
                    </div>
                )}
            </div>
        );
        // }
    }

    // setMessage(message) {
    //     this.setState({ ...this.state, message });
    // }
};

export default Widget;