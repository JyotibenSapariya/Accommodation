import React, {Component} from 'react';
import axios from 'axios';
import styles from '../../../public/css/style.css';
import swal from 'sweetalert'
import io from 'socket.io-client';

let socket = io();
let $messages = $('.messages'); //Message area
let $inputMessage = $('.inputMessage');  //Text area to input msg
let $nameInput = $('.nameInput'); //Name input
let $phoneInput = $('.phoneInput'); //Phone number input
let $emailInput = $('.emailInput'); //Email input
let $form = $('.formArea'); // Details form
let $widgetBox = $('.contentArea'); //Widget box
let $Input = $('.inputFields'); //Input fields in form
let $chatBox = $('.chatArea'); //Chat page after filling form
let $Typing = $(".typing"); //Typing notification
let $newMsg = $('.msg_push_new'); //Dummy to push new msgs
let $oldMsg = $('.msg_push_old'); //Dummy to push msg history
let $msgbox = $('.msg_box');

let id = localStorage.getItem("roomID");
let Chat = React.createClass({

    getInitialState: function () {
        return {
            rooms: [],
            receive: [],


        }
    },
    componentDidMount: function () {
        if(localStorage.getItem("roomID")){
            document.getElementById("formArea").style.display = "none";
            document.getElementById("chatArea").style.display = "block";

        }else{
            document.getElementById("chatArea").style.display = "none";
            document.getElementById("formArea").style.display = "block";

        }

        let _this = this;
        socket.on('roomID', function (roomID) {
            alert(roomID + '  Create room Id')
            id = roomID;
            localStorage.setItem("roomID", roomID);
        });
        socket.on('chat message', function (data) {
            let sender;
            if (data.isAdmin)
                sender = "msg_a";
            else
                sender = "msg_b";
            let $messageBodyDiv = $('<div class="' + sender + '">' + data.msg + '<span class="timestamp">' +
                ((data.timestamp).toLocaleString().substr(15, 6)) + '</span></div>').insertBefore($newMsg);
            $messages[0].scrollTop = $messages[0].scrollHeight;
        });
        socket.on('chat history', function (data) {
            alert('Chat History data' + data);
            let len = data.history.length;
            for (let i = len - 1; i >= 0; i--)
                this.addMessages().bind(this, data.history[i], false);
        });
        socket.on('log message', function (text) {
            let time = ("" + new Date());
            $('#AdminMsgOnline').html($('<li>').text(text));
        });
        socket.on('admin log message', function (text) {
            let _this = this;
            alert('admin text msg offline ' + text);
            $('#AdminMsgOffline').html($('<li>').text(text));
//this.setState={AdminMsgOffline:text};
//alert(this.state.AdminMsgOffline);
            //_this.setState('AdminMsgOffline', text);
        });

    },
    addMessages: function (data, getMore) {
        let sender;
        if (data["who"])
            sender = "msg_a";
        else
            sender = "msg_b";
        let $messageBodyDiv = $('<div class="' + sender + '">' + data["what"] + '<span class="timestamp"> ' +
            (data["when"]).toLocaleString().substr(15, 6) + '</span></div>');
        if (getMore) {
            $messageBodyDiv.insertAfter($oldMsg);
            $messages[0].scrollTop += $messageBodyDiv.outerHeight();
        } else {
            $messageBodyDiv.insertBefore($newMsg);
            $messages[0].scrollTop = $messages[0].scrollHeight;
        }
    },
    SendMsg: function () {

        $('.msg_push_new').append($('<li>').text(this.refs.msg.value));

        let time = ("" + new Date());
        socket.emit('chat message', {
            roomID: "null",
            msg: this.refs.msg.value,
            timestamp: time
            //User:localStorage.getItem('UserLogin')
        });
        this.setState('message', '');
    },
    ChatFormSubmit: function () {
        socket.emit('add user', {
            isNewUser: true,
            // roomID: localStorage.getItem('UserLogin'),
            Email: localStorage.getItem('UserLogin')
        });


        document.getElementById("formArea").style.display = "none";
        document.getElementById("chatArea").style.display = "block";

    },


    render() {
        const {rooms, receive} = this.state;
        const {SearchRoom, SendMsg} = this;
        return (

            <div className="pageset1">

                <div className="msg_box" >
                    <div className="msg_head">Live Chat</div>
                    <span id='AdminMsgOffline'> </span>
                    <span id='AdminMsgOnline'> </span>
                    <div className="contentArea">
                        <div className="formArea" id='formArea'>
                            <div className="title">Please fill out this form</div>
                            <form className="inputFields" onSubmit={this.ChatFormSubmit}>
                                <div className="inputContainer">
                                    <input className="nameInput" type="text" maxLength="20" pattern="^[a-zA-Z ]{3,}" placeholder=" * Name"
                                           required/>
                                </div>
                                <div className="inputContainer">
                                    <input className="emailInput" type="email" placeholder=" * Email" required/>
                                </div>
                                <div className="inputContainer">
                                    <input className="phoneInput" type="text" pattern="[0-9\(\)\-\+ ]{8,15}"
                                           title="Enter a valid Phone Number" placeholder=" * Phone Number" required/>
                                </div>
                                <input type="submit" className="submitBtn" />
                            </form>
                        </div>
                        <div className="chatArea" id='chatArea' >
                            <div className="messages">
                                <div className="msg_push_old"> </div>
                                <div className="msg_push_new" > </div>
                            </div>
                            <form onSubmit={this.SendMsg}>
                              <input className="inputMessage" aria-rowspan="1" placeholder="Type here..." ref='msg'  />
                        </form>
                        </div>
                    </div>
                </div>

                {/*    <div id="teamRow">
                    <h1 className="row sectionTitle">Chat With Admin</h1>
                </div>
                <div>

                    <ul id='AdminMsgOffline'>

                    </ul>
                    <ul id='AdminMsgOnline'>

                    </ul>

                    <p id='messageDiv'></p>

                       <div className="msg_box" >
                        <div className="msg_head">Live Chat</div>
                        <div className="contentArea" >
                            <div className="formArea">
                                <div className="title">Please fill out this form</div>
                                <form className="inputFields">
                                    <div className="inputContainer">
                                        <input className="nameInput" type="text" maxLength="20" pattern="^[a-zA-Z ]{3,}" placeholder=" * Name"
                                               required/>
                                    </div>
                                    <div className="inputContainer">
                                        <input className="emailInput" type="email" placeholder=" * Email" required/>
                                    </div>
                                    <div className="inputContainer">
                                        <input className="phoneInput" type="text" pattern="[0-9\(\)\-\+ ]{8,15}"
                                               title="Enter a valid Phone Number" placeholder=" * Phone Number" required/>
                                    </div>
                                    <input type="submit" className="submitBtn" />
                                </form>
                            </div>
                            <div className="chatArea" >
                                <div className="messages">
                                    <div className="msg_push_old"> </div>
                                    <div className="msg_push_new"> </div>
                                </div>
                                <div className='typing'> </div>
                                <input className="inputMessage" aria-rowspan="1" placeholder="Type here..." onSubmit={SendMsg} />
                            </div>
                        </div>
                    </div>

                </div>

*/}
            </div>

        )
    }
});

export default Chat;
