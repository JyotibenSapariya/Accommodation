// Include React
import React from "react";
import io from 'socket.io-client';
import axios from "axios";
import styles from '../../../public/css/style.css';

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
            send: [],

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
        // document.getElementById("container").style.display = "none";


        socket.emit('AddAdmin', {
            admin: localStorage.getItem('AdminLogin'),
            isAdmin: true
        });

        socket.on('New Client', function (data) {
            let _this = this;
            alert(data.roomID + 'New Client data');
            alert(data.email + 'New Client data');
            // $inputMessage = $('#' + data.roomID);
            this.state = {RID: data.roomID};
            $('#UserEmail').append('<h1 style="background-color: blanchedalmond;" >User: ' + data.UserName + ' (Email:' + data.email + ')</h1>');
            alert("STATE" + this.state.RID);
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
                  //$messages[0].scrollTop = $messages[0].scrollHeight;
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
            let $usernameDiv;
            $inputMessage = $('#' + data.roomID);
            let $parent = $inputMessage.parent();
            let $messages = $parent.children(".messages");
            /*  if (data.isAdmin)
                  $usernameDiv = $('<span class="username"/>').text("Admin");
              else
                  $usernameDiv = $('<span class="username"/>').text("Client");
              let $messageBodyDiv = $('<span class="messageBody">').text(data.msg);
              let $timestampDiv = $('<span class="timestamp">').text((data.timestamp).toLocaleString().substr(15, 6));
              let $messageDiv = $('<li class="message"/>').append($usernameDiv, $messageBodyDiv, $timestampDiv);
              $(".messages").append($messageDiv);
              //$messages[0].scrollTop = $messages[0].scrollHeight;
            */
            $('.messages').append('<div class="msg_a"><b>' + localStorage.getItem('UserLogin') + ' </b>' + data.msg + '<span class="timestamp">' +
                ((data.timestamp).toLocaleString().substr(15, 6)) + '</span></div>');
            //$messages[0].scrollTop = $messages[0].scrollHeight;

            //$newChat.play();
        });

        socket.on('admin added', function (username) {
            alert(username);
            // $userList.append('<li id=' + username + '>' + username + '</li>');
            //  $('#UserList').append($('<li>').text(username));
            //adminListListener(username);
        })
    },
    SendMsg: function (e) {
        e.preventDefault();
        let _this = this;
        let time = ("" + new Date());
        //    alert(this.refs.msg.value);
        socket.emit('chat message', {
            roomID: localStorage.getItem('roomID'),
            msg: this.refs.msg.value,
            timestamp: time
        });
        /* let $usernameDiv = $('<span class="username"/>').text("You");
         let $messageBodyDiv = $('<span class="messageBody">').text(this.refs.msg.value);
         let $timestampDiv = $('<span class="timestamp">').text(time.toLocaleString().substr(15, 6));
         let $messageDiv = $('<li class="message"/>').append($usernameDiv, $messageBodyDiv, $timestampDiv);
         $('.messages').append($messageDiv);
         //$messages[0].scrollTop = $messages[0].scrollHeight;
 */
        $('.messages').append('<div class="msg_b"><b>You: </b>' + this.refs.msg.value + '<span class="timestamp">' +
            (time.toLocaleString().substr(15, 6)) + '</span></div>');
        //$messages[0].scrollTop = $messages[0].scrollHeight;


    },


    render: function () {

        const {receive, send, Useremail} = this.state;
        return (
            <div>


                <div className="usersOnline">
                    <h1>Online Users</h1>
                    <p>{this.state.RID}</p>
                    <ul className="adminList" id="admins">
                    </ul>
                </div>
                <ul className="pages">
                    <li className="chat page">
                        <div className="container" id="container">


                            <div className='chatArea'>
                                <div className='chatHeader' id='UserEmail'></div>

                                <div className='messages'>
                                </div>
                                <form onSubmit={this.SendMsg}>
                                    <input className='inputMessage' ref="msg" placeholder='Type here...'/>
                                </form>
                            </div>
                        </div>

                    </li>

                </ul>

            </div>)
    }
});

export default chat;
