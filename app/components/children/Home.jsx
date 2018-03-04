import React, { Component } from 'react';
import axios from 'axios';
import styles from '../../../public/css/style.css';
import swal from 'sweetalert'

let Home;
Home = React.createClass({

    getInitialState: function () {
        return {
            rooms: [],
            receive : []
        }
    },
    componentDidMount: function () {

       /* socket.emit('add user', {
            isNewUser: true,
            roomID: localStorage.getItem('UserLogin'),
            Email:JSON.stringify(res.data[0].email)
        });
        let _this = this;
        socket.on('roomID', function (roomID) {
            alert(roomID + '  Create room Id')
            id = roomID;
            localStorage.setItem("roomID", roomID);
        });
        socket.on("USER_RECEIVE_MESSAGE", data => {
            //_this.setState({receive: [...this.state.receive, data]});
            $('#messages').append($('<li>').text(data.msg + ' : ' + data.User));


            //_this.setState({receive: data})
        });
        socket.on('chat history', function (data) {
            alert('Chat History data' + data);
            let len = data.history.length;
            for (let i = len - 1; i >= 0; i--)
                this.addMessages().bind(this,data.history[i], false);
        });
        socket.on('admin log message', function (text) {
            $msgbox.hide();
        });*/


    },
   /* addMessages :function (data, getMore) {
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

        $('#messages').append($('<li>').text(this.refs.msg.value));

        let time = ("" + new Date());
        socket.emit('chat message' , {
            roomID: "null",
          msg:this.refs.msg.value,
            timestamp: time
          //User:localStorage.getItem('UserLogin')
      });
        this.setState('message','');
    },
*/

    SearchRoom: function () {
        let _this = this;
        this.serverRequest = axios.post("/GetSearchRoom", {Search: this.refs.Search.value,})
            .then(function (result) {
                    if (result.data.length === 0) {
                        swal({
                            title: "Sorry",
                            text: "Please try with different keywords",
                            icon: "info",
                            dangerMode: true,
                        });
                    }
                    else {
                        _this.setState({rooms: result.data});
                    }
                }
            )
    },

    render() {
        const {rooms,receive} = this.state;
        const {SearchRoom, SendMsg} = this;
        return (

            <div className="pageset1">
                <div id="teamRow">
                    <h1 className="row sectionTitle">Search Rooms</h1>
                </div>
                <div>
                 {/*   <div className="msg_box" >
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
                    </div>*/}

                </div>
                <div>
                    <input type="text" ref="Search"  className={styles.search_adjust}
                           placeholder="Please Search Here....."/>
                    <button type="submit" onClick={SearchRoom}>SEARCH</button>
                </div>


                {rooms.map(function (room) {
                    return (
                        <div>
                            <table className="table">
                                <tr>
                                    <td>{room.Apartment_name}</td>
                                    <td>{room.Image_name}</td>
                                    <td>{room.City}</td>
                                </tr>
                            </table>
                        </div>
                    );
                })}
            </div>

        )
    }
});

export default Home;
