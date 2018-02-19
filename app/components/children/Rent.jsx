// Include React
import React from "react";
import axios from "axios"

let Rent = React.createClass({
 AddRoom: function (e) {
        alert('added rooms success');
        e.preventDefault();
        let form = e.target;
        let message = "";
        console.log(e.target);
        let AddRoom = this;
        axios.post('/AddRoom', {
            Apartment_name: document.querySelector("#Apartment_name").value,   Room_Availability_From: document.querySelector("#Room_Availability_From").value,
            Till: document.querySelector("#Till").value,
            Room_Cost_in_euros: document.querySelector("#Room_Cost_in_euros").value,
            Number_of_beds: document.querySelector("#Number_of_beds").value,
            Bathroom: document.querySelector("#Bathroom").value,
            Amenities: document.querySelector("#Amenities").value,
            Contact_Details: document.querySelector("#Contact_Details").value,
            Phone_Number: document.querySelector("#Phone_Number").value,
            Email_Address: document.querySelector("#Email_Address").value,
            Address: document.querySelector("#Address").value,
            Other_details: document.querySelector("#Other_details").value,
            Image_name: document.querySelector("#Image_name").value

        })

    },

    render: function () {
        const {AddRoom} = this;
        
        return (<div>
            <div className="span9">
                <div className="content">

                    <div className="module">
                        <div className="module-head">
                            <h3>Country Detail Add</h3>
                        </div>
                        <div className="module-body">

                            <form className="form-horizontal row-fluid"  action="" onSubmit={AddRoom}>

                                <div className="control-group">
                                    <label className="control-label"><b>Room Name</b></label>
                                    <div className="controls">
                                        <input type="text" name="Apartment_name" id="Apartment_name"
                                               placeholder="Please add Apartment name " className="span8"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Room Availability From</b></label>
                                    <div className="controls">
                                        <input type="date" name="Room_Availability_From" id="Room_Availability_From"
                                               placeholder="Enter the date from when the room is available "
                                               className="span8"/></div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Till</b></label>
                                    <div className="controls">
                                        <input type="date" name="Till" id="Till"
                                               placeholder="Enter the date till when the room is available "
                                               className="span8"/></div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Room Cost in euros</b></label>
                                    <div className="controls">
                                        <input type="Number" name="Room_Cost_in_euros" id="Room_Cost_in_euros"
                                               placeholder="Please add cost details " className="span8"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Number of beds</b></label>
                                    <div className="controls">
                                        <input type="Number" name="Number_of_beds" id="Number_of_beds"
                                               placeholder="Add in numericals " className="span8"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Bathroom</b></label>
                                    <div className="controls">
                                        <input type="Number" name="Bathroom" id="Bathroom"
                                               placeholder="With how many persons shared " className="span8"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Amenities</b></label>
                                    <div className="controls">
                                        <input type="text" name="Amenities" id="Amenities"
                                               placeholder="Add the facilities available with the room "
                                               className="span8"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Contact Details</b></label>
                                    <div className="controls">
                                        <input type="text" name="Contact_Details" id="Contact_Details"
                                               placeholder="Please add Apartment name " className="span8"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Phone Number</b></label>
                                    <div className="controls">
                                        <input type="Phone Number" name="Phone_Number" id="Phone_Number"
                                               placeholder="Add the mobile number with country code "
                                               className="span8"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Email Address</b></label>
                                    <div className="controls">
                                        <input type="email" name="Email_Address" id="Email_Address"
                                               placeholder="Please add your email id " className="span8"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Address</b></label>
                                    <div className="controls">
                                        <textarea type="text" name="Address" id="Address"
                                                  placeholder="Please add your address " className="span8"></textarea>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Other details</b></label>
                                    <div className="controls">
                                        <textarea type="text" name="Other_details" id="Other_details"
                                                  placeholder="Please add Apartment name " className="span8" ></textarea>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label className="control-label"><b>Images</b></label>
                                    <div className="controls">
                                        <input type="file" name="Image_name" id="Image_name" className="span8"/>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <div className="controls">
                                        <button type="submit" className="btn" name="" id="">Submit Form
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                    <br/>

                </div>

            </div>

        </div>)
    }
});


export default Rent;