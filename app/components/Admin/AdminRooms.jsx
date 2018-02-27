// Include React
import React from "react";
import axios from "axios"
import "../../../public/css/AdminRoomcss.css"

let AdminRooms = React.createclass({

    getInitialState: function () {
        return {
            rooms: []
        }
    },

    componentDidMount: function () {
        let _this = this;
        this.serverRequest = axios.get("/getRooms")
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
        const {DeleteRoom} = this;
        return (

            <div className="container" style="height: 100%;">
                <div className="panel accommodation-tab Rooms Available">
                    <div className="panel-heading">
                        <h3>Rooms Available</h3>
                    </div>
                    <div className="panel-body">
                        <ul>
                            <li className="bid-item panel">
                                <div className="row">
                                    <div className="item-data col-md-8">
                                        <p><b>Room Number:</b>1</p>
                                        <p><b>Room_Cost_in_euros:</b> 300Euros </p>
                                        <p><b>Number_of_beds:</b> 2</p>
                                        <p><b>Bathroom:</b>3</p>
                                        <p><b>Amenities:</b> Has Corridor</p>
                                        <p><b>Contact_Details:</b> 0123456789 </p>
                                        <p><b>Phone_Number:</b> 1023545666$</p>
                                        <p><b>Email_Address:</b> abc@gmail.com</p>
                                    </div>
                                    <div className="item-picture">
                                        <img src="room1.jpg" height="80"/>
                                    </div>
                                </div>
                            </li>
                            <li className="bid-item panel">
                                <div className="row">
                                    <div className="item-data col-md-8">
                                        <p><b>Room Number:</b>2</p>
                                        <p><b>Room_Cost_in_euros:</b> 350Euros </p>
                                        <p><b>Number_of_beds:</b> 3 </p>
                                        <p><b>Bathroom:</b>3</p>
                                        <p><b>Amenities:</b> Open Corridor</p>
                                        <p><b>Contact_Details:</b> 90123456789 </p>
                                        <p><b>Phone_Number:</b> 91023545666$</p>
                                        <p><b>Email_Address:</b> aaaabc@gmail.com</p>
                                    </div>
                                    <div className="item-picture">
                                        <img src="room2.jpg" height="80"/>
                                    </div>
                                </div>
                            </li>
                            <li className="bid-item panel">
                                <div className="row">
                                    <div className="item-data col-md-8">
                                        <p><b>Room Number:</b>3</p>
                                        <p><b>Room_Cost_in_euros:</b> 450Euros </p>
                                        <p><b>Number_of_beds:</b> 4 </p>
                                        <p><b>Bathroom:</b>4</p>
                                        <p><b>Amenities:</b> Free Interent and Laundry facility</p>
                                        <p><b>Contact_Details:</b> +91 0123456789 </p>
                                        <p><b>Phone_Number:</b> 991023545666$</p>
                                        <p><b>Email_Address:</b> awaiz@gmail.com</p>
                                    </div>
                                    <div className="item-picture">
                                        <img src="room3.jpg" height="80"/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>


        )
    }
});

export default AdminRooms;
