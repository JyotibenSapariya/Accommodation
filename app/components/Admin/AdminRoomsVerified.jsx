// Include React
import React from "react";
import axios from "axios"

let AdminRoomsVerified = React.createClass({

    getInitialState: function () {
        return {
            rooms: []
        }
    },

    componentDidMount: function () {
        let _this = this;
        this.serverRequest = axios.get("/GetVerifiedRoom")
            .then(function (result) {
                _this.setState({rooms: result.data});
            })
    },
    DeleteRoom: function (e) {

        alert(this.setState(e.target.value));
        let _this = this;
        alert('delete');
        axios.post("/DeleteRoom",{
            RId: document.querySelector("#RId").value,
        })
    },



    render: function () {
        const {rooms} = this.state;
        const {DeleteRoom,VerifyRoom} = this;
        return (
            <div className="pageset1">
                <div id="teamRow">
                    <h1 className="row sectionTitle" >Verified Rooms</h1>
                </div>
                {rooms.map(function (room) {
                    return (
                        <div>
                            <table className="table">
                                <tr>
                                    <form onSubmit={DeleteRoom}>
                                        <input  type="hidden" value= {room._id} name="RId" id="RId" />

                                        <td>
                                            <button type="submit" >Delete</button>
                                        </td>
                                    </form>
                                   <form onSubmit={VerifyRoom}>
                                       <input  type="hidden" value= {room._id} name="RId" id="RId" />

                                   </form>
                                    <td>{room.Apartment_name}</td>
                                    <td>{room.Image_name}</td>
                                </tr>
                            </table>

                        </div>
                    );
                })}
            </div>
        )
    }
});

export default AdminRoomsVerified;
