// Include React
import React from "react";
import axios from "axios";
//import FileUpload from "NativeModules";
//let FileUpload = require('NativeModules').FileUpload;



let Rent = React.createClass({
    AddRoom: function (e) {
        // alert('added rooms success');
        //alert(this.refs.Image_name.files.name);
        e.preventDefault();
        const data = new FormData();
        data.append('Image_Name', this.Image_Name.files[0]);
        data.append('Apartment_name', this.refs.Apartment_name.value);
        data.append('Room_Availability_From', this.refs.Room_Availability_From.value);
        data.append('Till', this.refs.Till.value);
        data.append('Room_Cost_in_euros', this.refs.Room_Cost_in_euros.value);
        data.append('Number_of_beds', this.refs.Number_of_beds.value);
        data.append('Bathroom', this.refs.Bathroom.value);
        data.append('Amenities', this.refs.Amenities.value);
        data.append('Contact_Details', this.refs.Contact_Details.value);
        data.append('Phone_Number', this.refs.Phone_Number.value);
        data.append('Email_Address', this.refs.Email_Address.value);
        data.append('Street', this.refs.Street.value);
        data.append('City', this.refs.City.value);
        data.append('Other_details', this.refs.Other_details.value);
        //data.append('filename', this.Image_name.value);

        fetch('/AddRoom', {
            method: 'POST',
            body: data,
        }).then((response) => {
                response.json().then((body) => {
                   // alert(body)
                    if (body === 'true') {
                        alert("data Submitted");
                        this.props.history.push("/Home");
                        // this.context.router.history.push("/Home");
                    } else {
                        alert("Error in data");
                    }
                });
        });

    },
    /*  onFormSubmit(e){
          e.preventDefault() ;// Stop form submit
          alert(this.state);
          alert(this.state.file);
          this.fileUpload(this.state.file).then((response)=>{
              console.log(response.data);
          })
      },
      onChange(e) {
          this.setState({file:e.target.files[0]})
      },
      fileUpload(file){
          const url = 'http://http://localhost:3000/File';
          const formData = new FormData();
          formData.append('file',file)
          const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          }
          return  post(url, formData,config)
      },
  */

    render: function () {
        const {AddRoom} = this;
      //  console.log(React.version);
        return (<div className="pageset1">
            <div className="span9">
                <div className="content">

                    <div className="module">
                        <div className="module-head">
                            <h3>Country Detail Add</h3>
                        </div>
                        <div className="module-body">

                            <form className="form-horizontal row-fluid"  onSubmit={AddRoom}    method='post' encType="multipart/form-data">

                                <div className="control-group">
                                    <label className="control-label"><b>Room Name</b></label>
                                    <div className="controls">
                                        <input type="text" name="Apartment_name" id="Apartment_name"
                                               placeholder="Please add Apartment name " ref="Apartment_name"
                                               className="span8" required />
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Room Availability From</b></label>
                                    <div className="controls">
                                        <input type="date" name="Room_Availability_From" id="Room_Availability_From"
                                               placeholder="Enter the date from when the room is available "
                                               className="span8" ref="Room_Availability_From" required /></div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Till</b></label>
                                    <div className="controls">
                                        <input type="date" name="Till" id="Till"
                                               placeholder="Enter the date till when the room is available "
                                               className="span8" ref="Till" required /></div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Room Cost in euros</b></label>
                                    <div className="controls">
                                        <input type="number" name="Room_Cost_in_euros" id="Room_Cost_in_euros"
                                               placeholder="Please add cost details " className="span8"
                                               ref="Room_Cost_in_euros" required />
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Number of beds</b></label>
                                    <div className="controls">
                                        <input type="number" name="Number_of_beds" id="Number_of_beds"
                                               placeholder="Add in numericals " className="span8" ref="Number_of_beds" required />
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Bathroom</b></label>
                                    <div className="controls">
                                        <input type="number" name="Bathroom" id="Bathroom"
                                               placeholder="With how many persons shared " className="span8"
                                               ref="Bathroom" required />
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Amenities</b></label>
                                    <div className="controls">
                                        <input type="text" name="Amenities" id="Amenities"
                                               placeholder="Add the facilities available with the room "
                                               className="span8" ref="Amenities" required />
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Contact Details</b></label>
                                    <div className="controls">
                                        <input type="text" name="Contact_Details" id="Contact_Details"
                                               placeholder="Please add Apartment name " className="span8"
                                               ref="Contact_Details" required />
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Phone Number</b></label>
                                    <div className="controls">
                                        <input type="text" name="Phone_Number" id="Phone_Number"
                                               placeholder="Add the mobile number with country code "
                                               className="span8" ref="Phone_Number" required />
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Email Address</b></label>
                                    <div className="controls">
                                        <input type="email" name="Email_Address" id="Email_Address"
                                               placeholder="Please add your email id " className="span8"
                                               ref="Email_Address" required />
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Street</b></label>
                                    <div className="controls">
                                        <input type="text" name="Street" id="Street"
                                               placeholder="Please add your Street with House Number " className="span8"
                                               ref="Street" required />
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>City</b></label>
                                    <div className="controls">
                                        <input type="text" name="City" id="City"
                                               placeholder="Please add your City " className="span8" ref="City" required />
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label"><b>Other details</b></label>
                                    <div className="controls">
                                        <input type="text" name="Other_details" id="Other_details"
                                                  aria-placeholder="Please add Apartment name"
                                                  className="span8" ref="Other_details"  required />
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label className="control-label"><b>Images</b></label>
                                    <div className="controls">
                                        <input type="file" ref={(ref) => { this.Image_Name = ref; }}
                                               className="span8" accept="image/jpg, image/jpeg" multiple  required  />
                                    </div>
                                </div>

                                <div className="control-group">
                                    <div className="controls">
                                        <button type="submit" className="btn" name="submit" id="submit">Submit Form
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