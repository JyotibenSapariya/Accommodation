// Include React
import React from "react";
//import axios from "axios"

import io from 'socket.io-client';
import axios from "axios";

let socket = io();
let $chatPage = $('.chat.page'); // The chat page
let $userList = $('.adminList'); // List of online admins
let $inputMessage; // Input message input box
//let $messages; // Messages area
let username;	//Store admin username
let authenticated = false; //Boolean to check if admin is authenticated
let connected = false;
let chat = React.createClass({
    getInitialState: function () {
        return {
            receive: [],
            send: []
        }
    },
   /* getChatArea: function (id) {
        alert('room Id'+ id);
        return ("<div class='chatArea'>" +
            "<div class='chatHeader'></div><p> "+id+"</p>" +
            "<ul class='messages'> " +
            "</ul>" +
            "<form  onsubmit=" + this.SendMsg + ">" +
            " <input class='inputMessage' id='" + id + "'' placeholder='Type here...'/><" +
            "/form>" +
            "</div>");
    },*/
    notifyAdmin: function (title, body) {
        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {
            let notification = new Notification(title, {
                icon: '',
                body: body,
            });
            notification.onclick = function () {
                //$window.focus();
                this.cancel();
            }
        }
    },


    componentDidMount: function () {
       // alert('aa')
        let _this = this;
        socket.emit('AddAdmin', {
            admin: localStorage.getItem('AdminLogin'),
            isAdmin: true
        });
        /* socket.on("RECEIVE_MESSAGE", data => {
             // alert(data);

             $('#messages').append($('<li>').text(data.msg + ' : ' + data.User));

           //  _this.setState({receive: [...this.state.receive, data]});

             //_this.setState({receive: data})
         });*/
        socket.on('New Client', function (data) {
            alert(data.roomID + 'New Client data');
            alert(data.Email + 'New Client data');
            $('#UserEmail').append('<li id=' + data.Email + '>' + data.Email + '</li>');
            //
          //  alert(data.details + 'New Client data');
          /*  $('#container').append("<div class='chatArea'>" +
                "<div class='chatHeader'></div><p> "+data.roomID+"</p>" +
                "<ul class='messages'> " +
                "</ul>" +
                "<form  onsubmit=" + this.SendMsg + ">" +
                " <input class='inputMessage'   id='" + data.roomID + "'' placeholder='Type here...'/>" +
                "</form>" +
                "</div>");*/
          /*  $inputMessage = $('#' + data.roomID);
            let $parent = $inputMessage.parent();
            let $messages = $parent.children(".messages");
            let $chatHeader = $parent.children(".chatHeader");
            let len = data.history.length;
            $chatHeader.append(data.details[0].Email);
            let sender;
            for (let i = len - 1; i >= 0; i--) {
                if (data["history"][i]["who"])
                    sender = "You";
                else
                    sender = "Client";
                let $usernameDiv = $('<span class="username"/>').text(sender);
                let $messageBodyDiv = $('<span class="messageBody">').text(data["history"][i]["what"]);
                let $timestampDiv = $('<span class="timestamp">').text((data["history"][i]["when"]).toLocaleString().substr(15, 6));
                let $messageDiv = $('<li class="message"/>').append($usernameDiv, $messageBodyDiv, $timestampDiv);
                $messages.append($messageDiv);
                $messages[0].scrollTop = $messages[0].scrollHeight;
            }
            if (!data.justJoined) {
                //$newUser.play();
                this.notifyAdmin().bind(this, "New Client", "Hey there!" + data.details[0].Email + " needs help!");
                $parent.css('border', '2px solid red')
                $inputMessage = $('#' + data.roomID);
                $inputMessage.on("focus", function () {
                    //$newUser.pause();
                    $parent.css('border', '1px solid black')
                    $inputMessage.off('focus');
                });
            }*/

        });
        socket.on('chat message', function (data) {
           let  $usernameDiv;
            $inputMessage = $('#' + data.roomID);
            let $parent = $inputMessage.parent();
            let $messages = $parent.children(".messages");
            if (data.isAdmin)
                 $usernameDiv = $('<span class="username"/>').text("Admin");
            else
                 $usernameDiv = $('<span class="username"/>').text("Client");
            let $messageBodyDiv = $('<span class="messageBody">').text(data.msg);
            let $timestampDiv = $('<span class="timestamp">').text((data.timestamp).toLocaleString().substr(15, 6));
            let $messageDiv = $('<li class="message"/>').append($usernameDiv, $messageBodyDiv, $timestampDiv);
            $messages.append($messageDiv);
            $messages[0].scrollTop = $messages[0].scrollHeight;
            //$newChat.play();
        });

        socket.on('admin added', function (username) {
            alert(username);
           // $userList.append('<li id=' + username + '>' + username + '</li>');
          //  $('#UserList').append($('<li>').text(username));
            //adminListListener(username);
        })
    },
    SendMsg: function () {
        let _this = this;
        $('.messages').append($('<li>').text(this.refs.msg.value));
        let time = ("" + new Date());
        alert(this.refs.msg.value);
        socket.emit('chat message', {
            roomID: localStorage.getItem('AdminLogin'),
            msg: this.refs.msg.value,
            timestamp: time
        });

        // _this.setState({send: [...this.state.send, this.refs.msg.value]});


    },
    render: function () {
        const {receive, send} = this.state;
        return (
            <div>


                <div>

                    <ul id='UserEmail'>

                    </ul>
                    <ul className="pages">
                        <li className="chat page">
                            <div className="container" >
                                <div id="container">
                                </div>
                            </div>
                            <div className="usersOnline">
                                <h1>Admins Online</h1>
                                <ul className="adminList" id="admins">
                                </ul>
                            </div>
                        </li>

                    </ul>
                </div>
                <ul id='UserList'>

                </ul>

            </div>)
    }
});

export default chat;
