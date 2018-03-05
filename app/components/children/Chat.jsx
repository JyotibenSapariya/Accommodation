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
            message:""


        }
    },
    componentDidMount: function () {
        if(localStorage.getItem("roomID")){
            document.getElementById("formArea").style.display = "none";
            document.getElementById("chatArea").style.display = "block";
            document.getElementById("CloseChatButton").style.display = "block";


        }else{
            document.getElementById("chatArea").style.display = "none";
            document.getElementById("formArea").style.display = "block";
            document.getElementById("CloseChatButton").style.display = "none";


        }

        let _this = this;
        socket.on('roomID', function (roomID) {
            alert(roomID + '  Create room Id')
            id = roomID;
            localStorage.setItem("roomID", roomID);
        });
        socket.on('chat message', function (data) {
           // alert("User receive msg form admin");

            let sender;
            if (data.isAdmin)
                sender = "msg_a";
            else
                sender = "msg_b";
alert(sender);
            $('.msg_push_new').append('<div class="msg_a"><b>Admin: </b>' + data.msg + '<span class="timestamp">' +
                ((data.timestamp).toLocaleString().substr(15, 6)) + '</span></div>');
            //$messages[0].scrollTop = $messages[0].scrollHeight;
        });
        socket.on('chat history', function (data) {
            alert('Chat History data' + data);
            let len = data.history.length;
            for (let i = len - 1; i >= 0; i--)
                this.addMessages().bind(this, data.history[i], false);
        });
        socket.on('log message', function (text) {
            let time = ("" + new Date());
            $('.msg_push_new').append('<div class="msg_a"><b>Admin: </b>' + text + '<span class="timestamp">' +
                (time.toLocaleString().substr(15, 6)) + '</span></div>');
            //$messages[0].scrollTop = $messages[0].scrollHeight;

           });
        socket.on('admin log message', function (text) {
            let time = ("" + new Date());

            let _this = this;
            //alert('admin text msg offline ' + text);
            $('.msg_push_new').append('<div class="msg_a"><b>Admin: </b>' + text + '<span class="timestamp">' +
                (time.toLocaleString().substr(15, 6)) + '</span></div>');
            //$messages[0].scrollTop = $messages[0].scrollHeight;

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
        $('.msg_push_new').append('<li>'+data["what"]+' </li>');
        if (getMore) {
            $messageBodyDiv.insertAfter($oldMsg);
            $messages[0].scrollTop += $messageBodyDiv.outerHeight();
        } else {
            $messageBodyDiv.insertBefore($newMsg);
            //$messages[0].scrollTop = $messages[0].scrollHeight;
        }
    },
    SendMsg: function () {
       /* $('.msg_push_new').append($('<li style="text-align: right">').text(this.refs.msg.value));
*/
        let time = ("" + new Date());
        socket.emit('chat message', {
            roomID: "null",
            msg: this.refs.msg.value,
            timestamp: time
            //User:localStorage.getItem('UserLogin')
        });
        $('.msg_push_new').append('<div class="msg_b"><b>You: </b>' + this.refs.msg.value + '<span class="timestamp">' +
            (time.toLocaleString().substr(15, 6)) + '</span></div>');
        //$messages[0].scrollTop = $messages[0].scrollHeight;
        $("#InputMessageValue").val("");

    },
    ChatFormSubmit: function () {
//alert(this.refs.UserName.value);
        socket.emit('add user', {
            isNewUser: true,
            UserName:this.refs.UserName.value,
            PhoneNumber:this.refs.PhoneNumber.value,
            // roomID: localStorage.getItem('UserLogin'),
            Email: localStorage.getItem('UserLogin')
        });


        document.getElementById("formArea").style.display = "none";
        document.getElementById("chatArea").style.display = "block";
        document.getElementById("CloseChatButton").style.display = "block";

    },
    CloseChat: function () {
        localStorage.removeItem("roomID");
        document.getElementById("formArea").style.display = "block";
        document.getElementById("chatArea").style.display = "none";
        document.getElementById("CloseChatButton").style.display = "none";

    },


    render() {
        if (!localStorage.getItem('UserLogin')) {
            swal({
                title: "You are not Logged in!!!  ",
                text: "Please Login to Chat with Us...",
                icon: "info",
                dangerMode: true,
            });
             this.props.history.push("/Login");
        }
        const {rooms, receive} = this.state;
        const {SearchRoom, SendMsg} = this;
        return (

                <div className="msg_box" >
                    <div className="msg_head">Live Chat <a id="CloseChatButton" onClick={this.CloseChat}> Close Chat</a></div>
                    <div className="contentArea">
                        <div className="formArea" id='formArea'>
                            <div className="title">Please fill out this form</div>
                            <form className="inputFields" onSubmit={this.ChatFormSubmit}>
                                <div className="inputContainer">
                                    <input className="nameInput" type="text" maxLength="20" pattern="^[a-zA-Z ]{3,}" placeholder=" * Name"
                                          ref="UserName" required/>
                                </div>
                                <div className="inputContainer">
                                    <input className="phoneInput" type="text" pattern="[0-9\(\)\-\+ ]{8,15}"
                                           title="Enter a valid Phone Number" placeholder=" * Phone Number" ref="PhoneNumber" required/>
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
                              <input className="inputMessage" aria-rowspan="1" placeholder="Type here..." ref='msg' id="InputMessageValue"  />
                        </form>
                        </div>
                    </div>
                </div>




        )
    }
});

export default Chat;
