// Include React
import React from "react";
import axios from "axios";
import swal from 'sweetalert';

import Time from 'react-time';
import '../../../public/admindata/bootstrap/css/bootstrap.min.css';
import '../../../public/admindata/bootstrap/css/bootstrap.min.css';
import '../../../public/admindata/bootstrap/css/bootstrap-responsive.min.css';
import '../../../public/admindata/css/theme.css';

let Rent = React.createClass({
    /* shouldComponentUpdate() {
         if (!sessionStorage.getItem('UserLogin')) {
             this.props.history.push("/Login");
         }
     },*/
    getInitialState: function () {
        return {
            rooms: [],
            roomsMorDetails: []
        }
    },

    componentDidMount: function () {
        document.getElementById("MoreDetails").style.display = "none";

        let _this = this;
        axios.post("/FindUserRoom", {
            Email: localStorage.getItem('UserLogin'),
        })
            .then(function (result) {
                _this.setState({rooms: result.data});
            })
    },
    UpdateRooms: function (RID) {
        document.getElementById("MoreDetails").style.display = "block";

        let _this = this;
        axios.post("/FindUserRoomById", {
            RId: RID,
        })
            .then(function (result) {
                _this.setState({roomsMorDetails: result.data});
            })
    },
    UpdateRoomData: function (RID) {
        document.getElementById("MoreDetails").style.display = "none";
        const data = new FormData();
alert(this.refs);
        let _this = this;

        axios.post("/UpdateRoomData", {

             RId: RID,
        Apartment_name: this.refs.Apartment_name.value,
        Room_Availability_From: this.refs.Room_Availability_From.value,
        Till: this.refs.Till.value,
        Room_Cost_in_euros: this.refs.Room_Cost_in_euros.value,
        Number_of_beds: this.refs.Number_of_beds.value,
        Bathroom: this.refs.Bathroom.value,
        Amenities: this.refs.Amenities.value,
        Contact_Details: this.refs.Contact_Details.value,
        Phone_Number: this.refs.Phone_Number.value,
        Email_Address: localStorage.getItem('UserLogin'),
        Street: this.refs.Street.value,
        City: this.refs.City.value,
        Other_details: this.refs.Other_details.value,

    }).then((response) => {
            if (response.data !== false) {
                swal({
                    title: "Thank You",
                    text: "Data will be verifying soon",
                    icon: "success",
                    dangerMode: true,
                });
                this.props.history.push("/Rent");
            } else {
                swal({
                    title: "Sorry",
                    text: "Error In Data",
                    icon: "error",
                    dangerMode: true,
                });


            }

        });


    },


    DeleteRooms: function (RID) {
        //alert(this.setState(e.target.value));
        let _this = this;
        //alert('delete');
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.post("/DeleteRoom", {
                    RId: RID,
                }).then(swal("Poof! Your imaginary file has been deleted!", {
                    icon: "warning",
                }));
                this.props.history.push("/Rent");
            } else {
                swal("Your imaginary file is safe!");
            }
        });

    },

    AddRoom: function (e) {
        // alert('added rooms success');
        //alert(this.refs.Image_name.files.name);
        e.preventDefault();
        const data = new FormData();
        if (this.Image_Name.files.length < 2) {
            alert("Insert more than 1 Images!!!")
        }
        else {
            for (let i = 0; i < this.Image_Name.files.length; i++) {
                data.append('Image_Name', this.Image_Name.files[i]);

            }
            //  alert(this.Image_Name.files.length);
            data.append('Image_Name', this.Image_Name.files);
            data.append('Apartment_name', this.refs.Apartment_name.value);
            data.append('Room_Availability_From', this.refs.Room_Availability_From.value);
            data.append('Till', this.refs.Till.value);
            data.append('Room_Cost_in_euros', this.refs.Room_Cost_in_euros.value);
            data.append('Number_of_beds', this.refs.Number_of_beds.value);
            data.append('Bathroom', this.refs.Bathroom.value);
            data.append('Amenities', this.refs.Amenities.value);
            data.append('Contact_Details', this.refs.Contact_Details.value);
            data.append('Phone_Number', this.refs.Phone_Number.value);
            data.append('Email_Address', localStorage.getItem('UserLogin'));
            data.append('Street', this.refs.Street.value);
            data.append('City', this.refs.City.value);
            data.append('Other_details', this.refs.Other_details.value);
            data.append('Image_Name1', this.Image_Name.files[0]);
            //data.append('filename', this.Image_name.value);

            fetch('/AddRoom', {
                method: 'POST',
                body: data,
            }).then((response) => {
                response.json().then((body) => {
                    // alert(body)
                    if (body === 'true') {
                        //alert("data Submitted");
                        swal({
                            title: "Thank You",
                            text: "Data will be verifying soon. You can See the data in Rent Page",
                            icon: "success",
                            dangerMode: true,
                        });

                        this.props.history.push("/");
                        // this.context.router.history.push("/Home");
                    }
                    else {
                        swal({
                            title: "Sorry",
                            text: "Error in Data",
                            icon: "error",
                            dangerMode: true,
                        });
                    }
                });
            });
        }


    },
    CloseDiv:function () {
        // let _this = this;
        //_this.setState({roomsMorDetails:""});
        document.getElementById("MoreDetails").style.display = "none";
    },
    render: function () {
        if (!localStorage.getItem('UserLogin')) {
            swal({
                title: "You are not Logged in!!!  ",
                text: "Please Login to Rent Your Room...",
                icon: "info",
                dangerMode: true,
            });
            this.props.history.push("/Login");
        }
        const {AddRoom,DeleteRooms,UpdateRooms,CloseDiv,UpdateRoomData} = this;
        //  console.log(React.version);
        return (<div className="pageset1">
                <div>
                    <table className="table">

                        <tbody>
                        <th>Delete</th>
                        <th>Update</th>
                        <th>Status</th>
                        <th>Apartment_name</th>
                        <th>Room_Availability_From</th>
                        <th>Till</th>
                        <th>Email</th>


                        {this.state.rooms.map(function (rooms) {
                            return (
                                <tr>
                                        <td>
                                            <button type="submit" className="btn" onClick={DeleteRooms.bind(this,rooms._id)}>Delete</button>
                                        </td>

                                        <td>
                                            <button type="submit" className="btn" onClick={UpdateRooms.bind(this,rooms._id)}>Update</button>
                                        </td>

                                    <td>{rooms.Status}</td>
                                    <td>{rooms.Apartment_name}</td>
                                    <td><Time value={rooms.Room_Availability_From} format="DD/MM/YYYY"/>
                                    </td>
                                    <td><Time value={rooms.Till} format="DD/MM/YYYY"/>
                                    </td>
                                    <td>{rooms.Email_Address}</td>
                                </tr>

                            );
                        })}
                        </tbody>
                    </table>

                </div>
                <div className="MoreDetails" id="MoreDetails">

                    {this.state.roomsMorDetails.map(function (roomsMorDetails) {
                            return (
                                <div className="span9">
                                    <div className="content">

                                        <div className="module">

                                            <div id="teamRow">
                                                <h1 className="row sectionTitle">Update Room Details </h1>
                                                <h4 className="Close" onClick={CloseDiv}>X</h4>

                                            </div>

                                            <div className="module-body">


                                                <form className="form-horizontal row-fluid" onSubmit={UpdateRoomData.bind(this,roomsMorDetails._id)} method='post'
                                                      encType="multipart/form-data">

                                                    <div className="control-group">
                                                        <label className="control-label"><b>Room Name</b></label>
                                                        <div className="controls">
                                                            <input type="text" name="Apartment_name" id="Apartment_name"
                                                                   placeholder="Please add Apartment name " ref="Apartment_name"
                                                                   className="span8" defaultValue={roomsMorDetails.Apartment_name} required/>
                                                        </div>
                                                    </div>
                                                    <div className="control-group">
                                                        <label className="control-label"><b>Room Availability From</b></label>
                                                        <div className="controls">
                                                            <input type="date" name="Room_Availability_From"
                                                                   id="Room_Availability_From"
                                                                   placeholder="Enter the date from when the room is available "
                                                                   className="span8" defaultValue={roomsMorDetails.Room_Availability_From} ref="Room_Availability_From" required/></div>
                                                    </div>
                                                    <div className="control-group">
                                                        <label className="control-label"><b>Till</b></label>
                                                        <div className="controls">
                                                            <input type="date" name="Till" id="Till"
                                                                   placeholder="Enter the date till when the room is available "
                                                                   className="span8" ref="Till" defaultValue={roomsMorDetails.Till} required/></div>
                                                    </div>
                                                    <div className="control-group">
                                                        <label className="control-label"><b>Room Cost in euros</b></label>
                                                        <div className="controls">
                                                            <input type="number" name="Room_Cost_in_euros" id="Room_Cost_in_euros"
                                                                   placeholder="Please add cost details " className="span8"
                                                                   ref="Room_Cost_in_euros" defaultValue={roomsMorDetails.Room_Cost_in_euros} required/>
                                                        </div>
                                                    </div>
                                                    <div className="control-group">
                                                        <label className="control-label"><b>Number of beds</b></label>
                                                        <div className="controls">
                                                            <input type="number" name="Number_of_beds" id="Number_of_beds"
                                                                   placeholder="Add in numericals " className="span8"
                                                                   ref="Number_of_beds" defaultValue={roomsMorDetails.Number_of_beds}
                                                                   required/>
                                                        </div>
                                                    </div>
                                                    <div className="control-group">
                                                        <label className="control-label"><b>Bathroom</b></label>
                                                        <div className="controls">
                                                            <input type="number" name="Bathroom" id="Bathroom"
                                                                   placeholder="With how many persons shared " className="span8"
                                                                   ref="Bathroom" defaultValue={roomsMorDetails.Bathroom} required/>
                                                        </div>
                                                    </div>
                                                    <div className="control-group">
                                                        <label className="control-label"><b>Amenities</b></label>
                                                        <div className="controls">
                                                            <input type="text" name="Amenities" id="Amenities"
                                                                   placeholder="Add the facilities available with the room "
                                                                   className="span8" ref="Amenities" defaultValue={roomsMorDetails.Amenities} required/>
                                                        </div>
                                                    </div>
                                                    <div className="control-group">
                                                        <label className="control-label"><b>Contact Details</b></label>
                                                        <div className="controls">
                                                            <input type="text" name="Contact_Details" id="Contact_Details"
                                                                   placeholder="Please add Apartment name " className="span8"
                                                                   ref="Contact_Details" defaultValue={roomsMorDetails.Contact_Details} required/>
                                                        </div>
                                                    </div>
                                                    <div className="control-group Phone">
                                                        <label className="control-label"><b>Phone Number</b></label>
                                                        <div className="controls">
                                                            <select name="countryCode" id="" style={{width: '100px'}}>
                                                                <option data-countryCode="GB" value="44">DE (+49)</option>
                                                                <option data-countryCode="US" value="1">USA (+1)</option>
                                                                <optgroup label="Other countries">
                                                                    <option data-countryCode="DZ" value="213">Algeria (+213)
                                                                    </option>
                                                                    <option data-countryCode="AD" value="376">Andorra (+376)
                                                                    </option>
                                                                    <option data-countryCode="AO" value="244">Angola (+244)</option>
                                                                    <option data-countryCode="AI" value="1264">Anguilla (+1264)
                                                                    </option>
                                                                    <option data-countryCode="AG" value="1268">Antigua &amp; Barbuda
                                                                        (+1268)
                                                                    </option>
                                                                    <option data-countryCode="AR" value="54">Argentina (+54)
                                                                    </option>
                                                                    <option data-countryCode="AM" value="374">Armenia (+374)
                                                                    </option>
                                                                    <option data-countryCode="AW" value="297">Aruba (+297)</option>
                                                                    <option data-countryCode="AU" value="61">Australia (+61)
                                                                    </option>
                                                                    <option data-countryCode="AT" value="43">Austria (+43)</option>
                                                                    <option data-countryCode="AZ" value="994">Azerbaijan (+994)
                                                                    </option>
                                                                    <option data-countryCode="BS" value="1242">Bahamas (+1242)
                                                                    </option>
                                                                    <option data-countryCode="BH" value="973">Bahrain (+973)
                                                                    </option>
                                                                    <option data-countryCode="BD" value="880">Bangladesh (+880)
                                                                    </option>
                                                                    <option data-countryCode="BB" value="1246">Barbados (+1246)
                                                                    </option>
                                                                    <option data-countryCode="BY" value="375">Belarus (+375)
                                                                    </option>
                                                                    <option data-countryCode="BE" value="32">Belgium (+32)</option>
                                                                    <option data-countryCode="BZ" value="501">Belize (+501)</option>
                                                                    <option data-countryCode="BJ" value="229">Benin (+229)</option>
                                                                    <option data-countryCode="BM" value="1441">Bermuda (+1441)
                                                                    </option>
                                                                    <option data-countryCode="BT" value="975">Bhutan (+975)</option>
                                                                    <option data-countryCode="BO" value="591">Bolivia (+591)
                                                                    </option>
                                                                    <option data-countryCode="BA" value="387">Bosnia Herzegovina
                                                                        (+387)
                                                                    </option>
                                                                    <option data-countryCode="BW" value="267">Botswana (+267)
                                                                    </option>
                                                                    <option data-countryCode="BR" value="55">Brazil (+55)</option>
                                                                    <option data-countryCode="BN" value="673">Brunei (+673)</option>
                                                                    <option data-countryCode="BG" value="359">Bulgaria (+359)
                                                                    </option>
                                                                    <option data-countryCode="BF" value="226">Burkina Faso (+226)
                                                                    </option>
                                                                    <option data-countryCode="BI" value="257">Burundi (+257)
                                                                    </option>
                                                                    <option data-countryCode="KH" value="855">Cambodia (+855)
                                                                    </option>
                                                                    <option data-countryCode="CM" value="237">Cameroon (+237)
                                                                    </option>
                                                                    <option data-countryCode="CA" value="1">Canada (+1)</option>
                                                                    <option data-countryCode="CV" value="238">Cape Verde Islands
                                                                        (+238)
                                                                    </option>
                                                                    <option data-countryCode="KY" value="1345">Cayman Islands
                                                                        (+1345)
                                                                    </option>
                                                                    <option data-countryCode="CF" value="236">Central African
                                                                        Republic
                                                                        (+236)
                                                                    </option>
                                                                    <option data-countryCode="CL" value="56">Chile (+56)</option>
                                                                    <option data-countryCode="CN" value="86">China (+86)</option>
                                                                    <option data-countryCode="CO" value="57">Colombia (+57)</option>
                                                                    <option data-countryCode="KM" value="269">Comoros (+269)
                                                                    </option>
                                                                    <option data-countryCode="CG" value="242">Congo (+242)</option>
                                                                    <option data-countryCode="CK" value="682">Cook Islands (+682)
                                                                    </option>
                                                                    <option data-countryCode="CR" value="506">Costa Rica (+506)
                                                                    </option>
                                                                    <option data-countryCode="HR" value="385">Croatia (+385)
                                                                    </option>
                                                                    <option data-countryCode="CU" value="53">Cuba (+53)</option>
                                                                    <option data-countryCode="CY" value="90392">Cyprus North
                                                                        (+90392)
                                                                    </option>
                                                                    <option data-countryCode="CY" value="357">Cyprus South (+357)
                                                                    </option>
                                                                    <option data-countryCode="CZ" value="42">Czech Republic (+42)
                                                                    </option>
                                                                    <option data-countryCode="DK" value="45">Denmark (+45)</option>
                                                                    <option data-countryCode="DJ" value="253">Djibouti (+253)
                                                                    </option>
                                                                    <option data-countryCode="DM" value="1809">Dominica (+1809)
                                                                    </option>
                                                                    <option data-countryCode="DO" value="1809">Dominican Republic
                                                                        (+1809)
                                                                    </option>
                                                                    <option data-countryCode="EC" value="593">Ecuador (+593)
                                                                    </option>
                                                                    <option data-countryCode="EG" value="20">Egypt (+20)</option>
                                                                    <option data-countryCode="SV" value="503">El Salvador (+503)
                                                                    </option>
                                                                    <option data-countryCode="GQ" value="240">Equatorial Guinea
                                                                        (+240)
                                                                    </option>
                                                                    <option data-countryCode="ER" value="291">Eritrea (+291)
                                                                    </option>
                                                                    <option data-countryCode="EE" value="372">Estonia (+372)
                                                                    </option>
                                                                    <option data-countryCode="ET" value="251">Ethiopia (+251)
                                                                    </option>
                                                                    <option data-countryCode="FK" value="500">Falkland Islands
                                                                        (+500)
                                                                    </option>
                                                                    <option data-countryCode="FO" value="298">Faroe Islands (+298)
                                                                    </option>
                                                                    <option data-countryCode="FJ" value="679">Fiji (+679)</option>
                                                                    <option data-countryCode="FI" value="358">Finland (+358)
                                                                    </option>
                                                                    <option data-countryCode="FR" value="33">France (+33)</option>
                                                                    <option data-countryCode="GF" value="594">French Guiana (+594)
                                                                    </option>
                                                                    <option data-countryCode="PF" value="689">French Polynesia
                                                                        (+689)
                                                                    </option>
                                                                    <option data-countryCode="GA" value="241">Gabon (+241)</option>
                                                                    <option data-countryCode="GM" value="220">Gambia (+220)</option>
                                                                    <option data-countryCode="GE" value="7880">Georgia (+7880)
                                                                    </option>
                                                                    <option data-countryCode="DE" value="49">Germany (+49)</option>
                                                                    <option data-countryCode="GH" value="233">Ghana (+233)</option>
                                                                    <option data-countryCode="GI" value="350">Gibraltar (+350)
                                                                    </option>
                                                                    <option data-countryCode="GR" value="30">Greece (+30)</option>
                                                                    <option data-countryCode="GL" value="299">Greenland (+299)
                                                                    </option>
                                                                    <option data-countryCode="GD" value="1473">Grenada (+1473)
                                                                    </option>
                                                                    <option data-countryCode="GP" value="590">Guadeloupe (+590)
                                                                    </option>
                                                                    <option data-countryCode="GU" value="671">Guam (+671)</option>
                                                                    <option data-countryCode="GT" value="502">Guatemala (+502)
                                                                    </option>
                                                                    <option data-countryCode="GN" value="224">Guinea (+224)</option>
                                                                    <option data-countryCode="GW" value="245">Guinea - Bissau (+245)
                                                                    </option>
                                                                    <option data-countryCode="GY" value="592">Guyana (+592)</option>
                                                                    <option data-countryCode="HT" value="509">Haiti (+509)</option>
                                                                    <option data-countryCode="HN" value="504">Honduras (+504)
                                                                    </option>
                                                                    <option data-countryCode="HK" value="852">Hong Kong (+852)
                                                                    </option>
                                                                    <option data-countryCode="HU" value="36">Hungary (+36)</option>
                                                                    <option data-countryCode="IS" value="354">Iceland (+354)
                                                                    </option>
                                                                    <option data-countryCode="IN" value="91">India (+91)</option>
                                                                    <option data-countryCode="ID" value="62">Indonesia (+62)
                                                                    </option>
                                                                    <option data-countryCode="IR" value="98">Iran (+98)</option>
                                                                    <option data-countryCode="IQ" value="964">Iraq (+964)</option>
                                                                    <option data-countryCode="IE" value="353">Ireland (+353)
                                                                    </option>
                                                                    <option data-countryCode="IL" value="972">Israel (+972)</option>
                                                                    <option data-countryCode="IT" value="39">Italy (+39)</option>
                                                                    <option data-countryCode="JM" value="1876">Jamaica (+1876)
                                                                    </option>
                                                                    <option data-countryCode="JP" value="81">Japan (+81)</option>
                                                                    <option data-countryCode="JO" value="962">Jordan (+962)</option>
                                                                    <option data-countryCode="KZ" value="7">Kazakhstan (+7)</option>
                                                                    <option data-countryCode="KE" value="254">Kenya (+254)</option>
                                                                    <option data-countryCode="KI" value="686">Kiribati (+686)
                                                                    </option>
                                                                    <option data-countryCode="KP" value="850">Korea North (+850)
                                                                    </option>
                                                                    <option data-countryCode="KR" value="82">Korea South (+82)
                                                                    </option>
                                                                    <option data-countryCode="KW" value="965">Kuwait (+965)</option>
                                                                    <option data-countryCode="KG" value="996">Kyrgyzstan (+996)
                                                                    </option>
                                                                    <option data-countryCode="LA" value="856">Laos (+856)</option>
                                                                    <option data-countryCode="LV" value="371">Latvia (+371)</option>
                                                                    <option data-countryCode="LB" value="961">Lebanon (+961)
                                                                    </option>
                                                                    <option data-countryCode="LS" value="266">Lesotho (+266)
                                                                    </option>
                                                                    <option data-countryCode="LR" value="231">Liberia (+231)
                                                                    </option>
                                                                    <option data-countryCode="LY" value="218">Libya (+218)</option>
                                                                    <option data-countryCode="LI" value="417">Liechtenstein (+417)
                                                                    </option>
                                                                    <option data-countryCode="LT" value="370">Lithuania (+370)
                                                                    </option>
                                                                    <option data-countryCode="LU" value="352">Luxembourg (+352)
                                                                    </option>
                                                                    <option data-countryCode="MO" value="853">Macao (+853)</option>
                                                                    <option data-countryCode="MK" value="389">Macedonia (+389)
                                                                    </option>
                                                                    <option data-countryCode="MG" value="261">Madagascar (+261)
                                                                    </option>
                                                                    <option data-countryCode="MW" value="265">Malawi (+265)</option>
                                                                    <option data-countryCode="MY" value="60">Malaysia (+60)</option>
                                                                    <option data-countryCode="MV" value="960">Maldives (+960)
                                                                    </option>
                                                                    <option data-countryCode="ML" value="223">Mali (+223)</option>
                                                                    <option data-countryCode="MT" value="356">Malta (+356)</option>
                                                                    <option data-countryCode="MH" value="692">Marshall Islands
                                                                        (+692)
                                                                    </option>
                                                                    <option data-countryCode="MQ" value="596">Martinique (+596)
                                                                    </option>
                                                                    <option data-countryCode="MR" value="222">Mauritania (+222)
                                                                    </option>
                                                                    <option data-countryCode="YT" value="269">Mayotte (+269)
                                                                    </option>
                                                                    <option data-countryCode="MX" value="52">Mexico (+52)</option>
                                                                    <option data-countryCode="FM" value="691">Micronesia (+691)
                                                                    </option>
                                                                    <option data-countryCode="MD" value="373">Moldova (+373)
                                                                    </option>
                                                                    <option data-countryCode="MC" value="377">Monaco (+377)</option>
                                                                    <option data-countryCode="MN" value="976">Mongolia (+976)
                                                                    </option>
                                                                    <option data-countryCode="MS" value="1664">Montserrat (+1664)
                                                                    </option>
                                                                    <option data-countryCode="MA" value="212">Morocco (+212)
                                                                    </option>
                                                                    <option data-countryCode="MZ" value="258">Mozambique (+258)
                                                                    </option>
                                                                    <option data-countryCode="MN" value="95">Myanmar (+95)</option>
                                                                    <option data-countryCode="NA" value="264">Namibia (+264)
                                                                    </option>
                                                                    <option data-countryCode="NR" value="674">Nauru (+674)</option>
                                                                    <option data-countryCode="NP" value="977">Nepal (+977)</option>
                                                                    <option data-countryCode="NL" value="31">Netherlands (+31)
                                                                    </option>
                                                                    <option data-countryCode="NC" value="687">New Caledonia (+687)
                                                                    </option>
                                                                    <option data-countryCode="NZ" value="64">New Zealand (+64)
                                                                    </option>
                                                                    <option data-countryCode="NI" value="505">Nicaragua (+505)
                                                                    </option>
                                                                    <option data-countryCode="NE" value="227">Niger (+227)</option>
                                                                    <option data-countryCode="NG" value="234">Nigeria (+234)
                                                                    </option>
                                                                    <option data-countryCode="NU" value="683">Niue (+683)</option>
                                                                    <option data-countryCode="NF" value="672">Norfolk Islands (+672)
                                                                    </option>
                                                                    <option data-countryCode="NP" value="670">Northern Marianas
                                                                        (+670)
                                                                    </option>
                                                                    <option data-countryCode="NO" value="47">Norway (+47)</option>
                                                                    <option data-countryCode="OM" value="968">Oman (+968)</option>
                                                                    <option data-countryCode="PW" value="680">Palau (+680)</option>
                                                                    <option data-countryCode="PA" value="507">Panama (+507)</option>
                                                                    <option data-countryCode="PG" value="675">Papua New Guinea
                                                                        (+675)
                                                                    </option>
                                                                    <option data-countryCode="PY" value="595">Paraguay (+595)
                                                                    </option>
                                                                    <option data-countryCode="PE" value="51">Peru (+51)</option>
                                                                    <option data-countryCode="PH" value="63">Philippines (+63)
                                                                    </option>
                                                                    <option data-countryCode="PL" value="48">Poland (+48)</option>
                                                                    <option data-countryCode="PT" value="351">Portugal (+351)
                                                                    </option>
                                                                    <option data-countryCode="PR" value="1787">Puerto Rico (+1787)
                                                                    </option>
                                                                    <option data-countryCode="QA" value="974">Qatar (+974)</option>
                                                                    <option data-countryCode="RE" value="262">Reunion (+262)
                                                                    </option>
                                                                    <option data-countryCode="RO" value="40">Romania (+40)</option>
                                                                    <option data-countryCode="RU" value="7">Russia (+7)</option>
                                                                    <option data-countryCode="RW" value="250">Rwanda (+250)</option>
                                                                    <option data-countryCode="SM" value="378">San Marino (+378)
                                                                    </option>
                                                                    <option data-countryCode="ST" value="239">Sao Tome &amp;Principe
                                                                        (+239)
                                                                    </option>
                                                                    <option data-countryCode="SA" value="966">Saudi Arabia (+966)
                                                                    </option>
                                                                    <option data-countryCode="SN" value="221">Senegal (+221)
                                                                    </option>
                                                                    <option data-countryCode="CS" value="381">Serbia (+381)</option>
                                                                    <option data-countryCode="SC" value="248">Seychelles (+248)
                                                                    </option>
                                                                    <option data-countryCode="SL" value="232">Sierra Leone (+232)
                                                                    </option>
                                                                    <option data-countryCode="SG" value="65">Singapore (+65)
                                                                    </option>
                                                                    <option data-countryCode="SK" value="421">Slovak Republic (+421)
                                                                    </option>
                                                                    <option data-countryCode="SI" value="386">Slovenia (+386)
                                                                    </option>
                                                                    <option data-countryCode="SB" value="677">Solomon Islands (+677)
                                                                    </option>
                                                                    <option data-countryCode="SO" value="252">Somalia (+252)
                                                                    </option>
                                                                    <option data-countryCode="ZA" value="27">South Africa (+27)
                                                                    </option>
                                                                    <option data-countryCode="ES" value="34">Spain (+34)</option>
                                                                    <option data-countryCode="LK" value="94">Sri Lanka (+94)
                                                                    </option>
                                                                    <option data-countryCode="SH" value="290">St. Helena (+290)
                                                                    </option>
                                                                    <option data-countryCode="KN" value="1869">St. Kitts (+1869)
                                                                    </option>
                                                                    <option data-countryCode="SC" value="1758">St. Lucia (+1758)
                                                                    </option>
                                                                    <option data-countryCode="SD" value="249">Sudan (+249)</option>
                                                                    <option data-countryCode="SR" value="597">Suriname (+597)
                                                                    </option>
                                                                    <option data-countryCode="SZ" value="268">Swaziland (+268)
                                                                    </option>
                                                                    <option data-countryCode="SE" value="46">Sweden (+46)</option>
                                                                    <option data-countryCode="CH" value="41">Switzerland (+41)
                                                                    </option>
                                                                    <option data-countryCode="SI" value="963">Syria (+963)</option>
                                                                    <option data-countryCode="TW" value="886">Taiwan (+886)</option>
                                                                    <option data-countryCode="TJ" value="7">Tajikstan (+7)</option>
                                                                    <option data-countryCode="TH" value="66">Thailand (+66)</option>
                                                                    <option data-countryCode="TG" value="228">Togo (+228)</option>
                                                                    <option data-countryCode="TO" value="676">Tonga (+676)</option>
                                                                    <option data-countryCode="TT" value="1868">Trinidad &amp; Tobago
                                                                        (+1868)
                                                                    </option>
                                                                    <option data-countryCode="TN" value="216">Tunisia (+216)
                                                                    </option>
                                                                    <option data-countryCode="TR" value="90">Turkey (+90)</option>
                                                                    <option data-countryCode="TM" value="7">Turkmenistan (+7)
                                                                    </option>
                                                                    <option data-countryCode="TM" value="993">Turkmenistan (+993)
                                                                    </option>
                                                                    <option data-countryCode="TC" value="1649">Turks &amp; Caicos
                                                                        Islands
                                                                        (+1649)
                                                                    </option>
                                                                    <option data-countryCode="TV" value="688">Tuvalu (+688)</option>
                                                                    <option data-countryCode="UG" value="256">Uganda (+256)</option>
                                                                    <option data-countryCode="UA" value="380">Ukraine (+380)
                                                                    </option>
                                                                    <option data-countryCode="AE" value="971">United Arab Emirates
                                                                        (+971)
                                                                    </option>
                                                                    <option data-countryCode="UY" value="598">Uruguay (+598)
                                                                    </option>
                                                                    <option data-countryCode="UZ" value="7">Uzbekistan (+7)</option>
                                                                    <option data-countryCode="VU" value="678">Vanuatu (+678)
                                                                    </option>
                                                                    <option data-countryCode="VA" value="379">Vatican City (+379)
                                                                    </option>
                                                                    <option data-countryCode="VE" value="58">Venezuela (+58)
                                                                    </option>
                                                                    <option data-countryCode="VN" value="84">Vietnam (+84)</option>
                                                                    <option data-countryCode="VG" value="84">Virgin Islands -
                                                                        British
                                                                        (+1284)
                                                                    </option>
                                                                    <option data-countryCode="VI" value="84">Virgin Islands - US
                                                                        (+1340)
                                                                    </option>
                                                                    <option data-countryCode="WF" value="681">Wallis &amp; Futuna
                                                                        (+681)
                                                                    </option>
                                                                    <option data-countryCode="YE" value="969">Yemen (North)(+969)
                                                                    </option>
                                                                    <option data-countryCode="YE" value="967">Yemen (South)(+967)
                                                                    </option>
                                                                    <option data-countryCode="ZM" value="260">Zambia (+260)</option>
                                                                    <option data-countryCode="ZW" value="263">Zimbabwe (+263)
                                                                    </option>
                                                                </optgroup>
                                                            </select>
                                                            <input style={{width: '340px'}} type="tel" name="Phone_Number"
                                                                   id="Phone_Number"
                                                                   placeholder="Add the mobile number with country code "
                                                                   className="span8" ref="Phone_Number" defaultValue={roomsMorDetails.Phone_Number} required/>
                                                        </div>

                                                    </div>

                                                    <div className="control-group">
                                                        <label className="control-label"><b>Street</b></label>
                                                        <div className="controls">
                                                            <input type="text" name="Street" id="Street"
                                                                   placeholder="Please add your Street with House Number "
                                                                   className="span8"
                                                                   ref="Street" defaultValue={roomsMorDetails.Street} required/>
                                                        </div>
                                                    </div>
                                                    <div className="control-group">
                                                        <label className="control-label"><b>City</b></label>
                                                        <div className="controls">

                                                            <input type="text" name="City" id="City"
                                                                   placeholder="Please add your City " className="span8" ref="City"
                                                                   defaultValue={roomsMorDetails.City} required/>

                                                        </div>
                                                    </div>
                                                    <div className="control-group">
                                                        <label className="control-label"><b>Other details</b></label>
                                                        <div className="controls">

                                                            <input type="text" name="Other_details" id="Other_details"
                                                                   aria-placeholder="Please add Other Apartment Details"
                                                                   className="span8" defaultValue={roomsMorDetails.Other_details} ref="Other_details" required/>

                                                        </div>
                                                    </div>


                                                    <div className="control-group">
                                                        <div className="controls">
                                                            <button type="submit" className="btn" name="submit" id="submit">Submit
                                                                Form
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                </div>


                            )
                        }
                    )}
                </div>


                <div className="span9">
                    <div className="content">

                        <div className="module">

                            <div id="teamRow">
                                <h1 className="row sectionTitle">Add Room Details </h1>
                            </div>

                            <div className="module-body">


                                <form className="form-horizontal row-fluid" onSubmit={AddRoom} method='post'
                                      encType="multipart/form-data">

                                    <div className="control-group">
                                        <label className="control-label"><b>Room Name</b></label>
                                        <div className="controls">
                                            <input type="text" name="Apartment_name" id="Apartment_name"
                                                   placeholder="Please add Apartment name " ref="Apartment_name"
                                                   className="span8" required/>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label"><b>Room Availability From</b></label>
                                        <div className="controls">
                                            <input type="date" name="Room_Availability_From"
                                                   id="Room_Availability_From"
                                                   placeholder="Enter the date from when the room is available "
                                                   className="span8" ref="Room_Availability_From" required/></div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label"><b>Till</b></label>
                                        <div className="controls">
                                            <input type="date" name="Till" id="Till"
                                                   placeholder="Enter the date till when the room is available "
                                                   className="span8" ref="Till" required/></div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label"><b>Room Cost in euros</b></label>
                                        <div className="controls">
                                            <input type="number" name="Room_Cost_in_euros" id="Room_Cost_in_euros"
                                                   placeholder="Please add cost details " className="span8"
                                                   ref="Room_Cost_in_euros" required/>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label"><b>Number of beds</b></label>
                                        <div className="controls">
                                            <input type="number" name="Number_of_beds" id="Number_of_beds"
                                                   placeholder="Add in numericals " className="span8"
                                                   ref="Number_of_beds"
                                                   required/>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label"><b>Bathroom</b></label>
                                        <div className="controls">
                                            <input type="number" name="Bathroom" id="Bathroom"
                                                   placeholder="With how many persons shared " className="span8"
                                                   ref="Bathroom" required/>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label"><b>Amenities</b></label>
                                        <div className="controls">
                                            <input type="text" name="Amenities" id="Amenities"
                                                   placeholder="Add the facilities available with the room "
                                                   className="span8" ref="Amenities" required/>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label"><b>Contact Details</b></label>
                                        <div className="controls">
                                            <input type="text" name="Contact_Details" id="Contact_Details"
                                                   placeholder="Please add Apartment name " className="span8"
                                                   ref="Contact_Details" required/>
                                        </div>
                                    </div>
                                    <div className="control-group Phone">
                                        <label className="control-label"><b>Phone Number</b></label>
                                        <div className="controls">
                                            <select name="countryCode" id="" style={{width: '100px'}}>
                                                <option data-countryCode="GB" value="44">DE (+49)</option>
                                                <option data-countryCode="US" value="1">USA (+1)</option>
                                                <optgroup label="Other countries">
                                                    <option data-countryCode="DZ" value="213">Algeria (+213)
                                                    </option>
                                                    <option data-countryCode="AD" value="376">Andorra (+376)
                                                    </option>
                                                    <option data-countryCode="AO" value="244">Angola (+244)</option>
                                                    <option data-countryCode="AI" value="1264">Anguilla (+1264)
                                                    </option>
                                                    <option data-countryCode="AG" value="1268">Antigua &amp; Barbuda
                                                        (+1268)
                                                    </option>
                                                    <option data-countryCode="AR" value="54">Argentina (+54)
                                                    </option>
                                                    <option data-countryCode="AM" value="374">Armenia (+374)
                                                    </option>
                                                    <option data-countryCode="AW" value="297">Aruba (+297)</option>
                                                    <option data-countryCode="AU" value="61">Australia (+61)
                                                    </option>
                                                    <option data-countryCode="AT" value="43">Austria (+43)</option>
                                                    <option data-countryCode="AZ" value="994">Azerbaijan (+994)
                                                    </option>
                                                    <option data-countryCode="BS" value="1242">Bahamas (+1242)
                                                    </option>
                                                    <option data-countryCode="BH" value="973">Bahrain (+973)
                                                    </option>
                                                    <option data-countryCode="BD" value="880">Bangladesh (+880)
                                                    </option>
                                                    <option data-countryCode="BB" value="1246">Barbados (+1246)
                                                    </option>
                                                    <option data-countryCode="BY" value="375">Belarus (+375)
                                                    </option>
                                                    <option data-countryCode="BE" value="32">Belgium (+32)</option>
                                                    <option data-countryCode="BZ" value="501">Belize (+501)</option>
                                                    <option data-countryCode="BJ" value="229">Benin (+229)</option>
                                                    <option data-countryCode="BM" value="1441">Bermuda (+1441)
                                                    </option>
                                                    <option data-countryCode="BT" value="975">Bhutan (+975)</option>
                                                    <option data-countryCode="BO" value="591">Bolivia (+591)
                                                    </option>
                                                    <option data-countryCode="BA" value="387">Bosnia Herzegovina
                                                        (+387)
                                                    </option>
                                                    <option data-countryCode="BW" value="267">Botswana (+267)
                                                    </option>
                                                    <option data-countryCode="BR" value="55">Brazil (+55)</option>
                                                    <option data-countryCode="BN" value="673">Brunei (+673)</option>
                                                    <option data-countryCode="BG" value="359">Bulgaria (+359)
                                                    </option>
                                                    <option data-countryCode="BF" value="226">Burkina Faso (+226)
                                                    </option>
                                                    <option data-countryCode="BI" value="257">Burundi (+257)
                                                    </option>
                                                    <option data-countryCode="KH" value="855">Cambodia (+855)
                                                    </option>
                                                    <option data-countryCode="CM" value="237">Cameroon (+237)
                                                    </option>
                                                    <option data-countryCode="CA" value="1">Canada (+1)</option>
                                                    <option data-countryCode="CV" value="238">Cape Verde Islands
                                                        (+238)
                                                    </option>
                                                    <option data-countryCode="KY" value="1345">Cayman Islands
                                                        (+1345)
                                                    </option>
                                                    <option data-countryCode="CF" value="236">Central African
                                                        Republic
                                                        (+236)
                                                    </option>
                                                    <option data-countryCode="CL" value="56">Chile (+56)</option>
                                                    <option data-countryCode="CN" value="86">China (+86)</option>
                                                    <option data-countryCode="CO" value="57">Colombia (+57)</option>
                                                    <option data-countryCode="KM" value="269">Comoros (+269)
                                                    </option>
                                                    <option data-countryCode="CG" value="242">Congo (+242)</option>
                                                    <option data-countryCode="CK" value="682">Cook Islands (+682)
                                                    </option>
                                                    <option data-countryCode="CR" value="506">Costa Rica (+506)
                                                    </option>
                                                    <option data-countryCode="HR" value="385">Croatia (+385)
                                                    </option>
                                                    <option data-countryCode="CU" value="53">Cuba (+53)</option>
                                                    <option data-countryCode="CY" value="90392">Cyprus North
                                                        (+90392)
                                                    </option>
                                                    <option data-countryCode="CY" value="357">Cyprus South (+357)
                                                    </option>
                                                    <option data-countryCode="CZ" value="42">Czech Republic (+42)
                                                    </option>
                                                    <option data-countryCode="DK" value="45">Denmark (+45)</option>
                                                    <option data-countryCode="DJ" value="253">Djibouti (+253)
                                                    </option>
                                                    <option data-countryCode="DM" value="1809">Dominica (+1809)
                                                    </option>
                                                    <option data-countryCode="DO" value="1809">Dominican Republic
                                                        (+1809)
                                                    </option>
                                                    <option data-countryCode="EC" value="593">Ecuador (+593)
                                                    </option>
                                                    <option data-countryCode="EG" value="20">Egypt (+20)</option>
                                                    <option data-countryCode="SV" value="503">El Salvador (+503)
                                                    </option>
                                                    <option data-countryCode="GQ" value="240">Equatorial Guinea
                                                        (+240)
                                                    </option>
                                                    <option data-countryCode="ER" value="291">Eritrea (+291)
                                                    </option>
                                                    <option data-countryCode="EE" value="372">Estonia (+372)
                                                    </option>
                                                    <option data-countryCode="ET" value="251">Ethiopia (+251)
                                                    </option>
                                                    <option data-countryCode="FK" value="500">Falkland Islands
                                                        (+500)
                                                    </option>
                                                    <option data-countryCode="FO" value="298">Faroe Islands (+298)
                                                    </option>
                                                    <option data-countryCode="FJ" value="679">Fiji (+679)</option>
                                                    <option data-countryCode="FI" value="358">Finland (+358)
                                                    </option>
                                                    <option data-countryCode="FR" value="33">France (+33)</option>
                                                    <option data-countryCode="GF" value="594">French Guiana (+594)
                                                    </option>
                                                    <option data-countryCode="PF" value="689">French Polynesia
                                                        (+689)
                                                    </option>
                                                    <option data-countryCode="GA" value="241">Gabon (+241)</option>
                                                    <option data-countryCode="GM" value="220">Gambia (+220)</option>
                                                    <option data-countryCode="GE" value="7880">Georgia (+7880)
                                                    </option>
                                                    <option data-countryCode="DE" value="49">Germany (+49)</option>
                                                    <option data-countryCode="GH" value="233">Ghana (+233)</option>
                                                    <option data-countryCode="GI" value="350">Gibraltar (+350)
                                                    </option>
                                                    <option data-countryCode="GR" value="30">Greece (+30)</option>
                                                    <option data-countryCode="GL" value="299">Greenland (+299)
                                                    </option>
                                                    <option data-countryCode="GD" value="1473">Grenada (+1473)
                                                    </option>
                                                    <option data-countryCode="GP" value="590">Guadeloupe (+590)
                                                    </option>
                                                    <option data-countryCode="GU" value="671">Guam (+671)</option>
                                                    <option data-countryCode="GT" value="502">Guatemala (+502)
                                                    </option>
                                                    <option data-countryCode="GN" value="224">Guinea (+224)</option>
                                                    <option data-countryCode="GW" value="245">Guinea - Bissau (+245)
                                                    </option>
                                                    <option data-countryCode="GY" value="592">Guyana (+592)</option>
                                                    <option data-countryCode="HT" value="509">Haiti (+509)</option>
                                                    <option data-countryCode="HN" value="504">Honduras (+504)
                                                    </option>
                                                    <option data-countryCode="HK" value="852">Hong Kong (+852)
                                                    </option>
                                                    <option data-countryCode="HU" value="36">Hungary (+36)</option>
                                                    <option data-countryCode="IS" value="354">Iceland (+354)
                                                    </option>
                                                    <option data-countryCode="IN" value="91">India (+91)</option>
                                                    <option data-countryCode="ID" value="62">Indonesia (+62)
                                                    </option>
                                                    <option data-countryCode="IR" value="98">Iran (+98)</option>
                                                    <option data-countryCode="IQ" value="964">Iraq (+964)</option>
                                                    <option data-countryCode="IE" value="353">Ireland (+353)
                                                    </option>
                                                    <option data-countryCode="IL" value="972">Israel (+972)</option>
                                                    <option data-countryCode="IT" value="39">Italy (+39)</option>
                                                    <option data-countryCode="JM" value="1876">Jamaica (+1876)
                                                    </option>
                                                    <option data-countryCode="JP" value="81">Japan (+81)</option>
                                                    <option data-countryCode="JO" value="962">Jordan (+962)</option>
                                                    <option data-countryCode="KZ" value="7">Kazakhstan (+7)</option>
                                                    <option data-countryCode="KE" value="254">Kenya (+254)</option>
                                                    <option data-countryCode="KI" value="686">Kiribati (+686)
                                                    </option>
                                                    <option data-countryCode="KP" value="850">Korea North (+850)
                                                    </option>
                                                    <option data-countryCode="KR" value="82">Korea South (+82)
                                                    </option>
                                                    <option data-countryCode="KW" value="965">Kuwait (+965)</option>
                                                    <option data-countryCode="KG" value="996">Kyrgyzstan (+996)
                                                    </option>
                                                    <option data-countryCode="LA" value="856">Laos (+856)</option>
                                                    <option data-countryCode="LV" value="371">Latvia (+371)</option>
                                                    <option data-countryCode="LB" value="961">Lebanon (+961)
                                                    </option>
                                                    <option data-countryCode="LS" value="266">Lesotho (+266)
                                                    </option>
                                                    <option data-countryCode="LR" value="231">Liberia (+231)
                                                    </option>
                                                    <option data-countryCode="LY" value="218">Libya (+218)</option>
                                                    <option data-countryCode="LI" value="417">Liechtenstein (+417)
                                                    </option>
                                                    <option data-countryCode="LT" value="370">Lithuania (+370)
                                                    </option>
                                                    <option data-countryCode="LU" value="352">Luxembourg (+352)
                                                    </option>
                                                    <option data-countryCode="MO" value="853">Macao (+853)</option>
                                                    <option data-countryCode="MK" value="389">Macedonia (+389)
                                                    </option>
                                                    <option data-countryCode="MG" value="261">Madagascar (+261)
                                                    </option>
                                                    <option data-countryCode="MW" value="265">Malawi (+265)</option>
                                                    <option data-countryCode="MY" value="60">Malaysia (+60)</option>
                                                    <option data-countryCode="MV" value="960">Maldives (+960)
                                                    </option>
                                                    <option data-countryCode="ML" value="223">Mali (+223)</option>
                                                    <option data-countryCode="MT" value="356">Malta (+356)</option>
                                                    <option data-countryCode="MH" value="692">Marshall Islands
                                                        (+692)
                                                    </option>
                                                    <option data-countryCode="MQ" value="596">Martinique (+596)
                                                    </option>
                                                    <option data-countryCode="MR" value="222">Mauritania (+222)
                                                    </option>
                                                    <option data-countryCode="YT" value="269">Mayotte (+269)
                                                    </option>
                                                    <option data-countryCode="MX" value="52">Mexico (+52)</option>
                                                    <option data-countryCode="FM" value="691">Micronesia (+691)
                                                    </option>
                                                    <option data-countryCode="MD" value="373">Moldova (+373)
                                                    </option>
                                                    <option data-countryCode="MC" value="377">Monaco (+377)</option>
                                                    <option data-countryCode="MN" value="976">Mongolia (+976)
                                                    </option>
                                                    <option data-countryCode="MS" value="1664">Montserrat (+1664)
                                                    </option>
                                                    <option data-countryCode="MA" value="212">Morocco (+212)
                                                    </option>
                                                    <option data-countryCode="MZ" value="258">Mozambique (+258)
                                                    </option>
                                                    <option data-countryCode="MN" value="95">Myanmar (+95)</option>
                                                    <option data-countryCode="NA" value="264">Namibia (+264)
                                                    </option>
                                                    <option data-countryCode="NR" value="674">Nauru (+674)</option>
                                                    <option data-countryCode="NP" value="977">Nepal (+977)</option>
                                                    <option data-countryCode="NL" value="31">Netherlands (+31)
                                                    </option>
                                                    <option data-countryCode="NC" value="687">New Caledonia (+687)
                                                    </option>
                                                    <option data-countryCode="NZ" value="64">New Zealand (+64)
                                                    </option>
                                                    <option data-countryCode="NI" value="505">Nicaragua (+505)
                                                    </option>
                                                    <option data-countryCode="NE" value="227">Niger (+227)</option>
                                                    <option data-countryCode="NG" value="234">Nigeria (+234)
                                                    </option>
                                                    <option data-countryCode="NU" value="683">Niue (+683)</option>
                                                    <option data-countryCode="NF" value="672">Norfolk Islands (+672)
                                                    </option>
                                                    <option data-countryCode="NP" value="670">Northern Marianas
                                                        (+670)
                                                    </option>
                                                    <option data-countryCode="NO" value="47">Norway (+47)</option>
                                                    <option data-countryCode="OM" value="968">Oman (+968)</option>
                                                    <option data-countryCode="PW" value="680">Palau (+680)</option>
                                                    <option data-countryCode="PA" value="507">Panama (+507)</option>
                                                    <option data-countryCode="PG" value="675">Papua New Guinea
                                                        (+675)
                                                    </option>
                                                    <option data-countryCode="PY" value="595">Paraguay (+595)
                                                    </option>
                                                    <option data-countryCode="PE" value="51">Peru (+51)</option>
                                                    <option data-countryCode="PH" value="63">Philippines (+63)
                                                    </option>
                                                    <option data-countryCode="PL" value="48">Poland (+48)</option>
                                                    <option data-countryCode="PT" value="351">Portugal (+351)
                                                    </option>
                                                    <option data-countryCode="PR" value="1787">Puerto Rico (+1787)
                                                    </option>
                                                    <option data-countryCode="QA" value="974">Qatar (+974)</option>
                                                    <option data-countryCode="RE" value="262">Reunion (+262)
                                                    </option>
                                                    <option data-countryCode="RO" value="40">Romania (+40)</option>
                                                    <option data-countryCode="RU" value="7">Russia (+7)</option>
                                                    <option data-countryCode="RW" value="250">Rwanda (+250)</option>
                                                    <option data-countryCode="SM" value="378">San Marino (+378)
                                                    </option>
                                                    <option data-countryCode="ST" value="239">Sao Tome &amp;Principe
                                                        (+239)
                                                    </option>
                                                    <option data-countryCode="SA" value="966">Saudi Arabia (+966)
                                                    </option>
                                                    <option data-countryCode="SN" value="221">Senegal (+221)
                                                    </option>
                                                    <option data-countryCode="CS" value="381">Serbia (+381)</option>
                                                    <option data-countryCode="SC" value="248">Seychelles (+248)
                                                    </option>
                                                    <option data-countryCode="SL" value="232">Sierra Leone (+232)
                                                    </option>
                                                    <option data-countryCode="SG" value="65">Singapore (+65)
                                                    </option>
                                                    <option data-countryCode="SK" value="421">Slovak Republic (+421)
                                                    </option>
                                                    <option data-countryCode="SI" value="386">Slovenia (+386)
                                                    </option>
                                                    <option data-countryCode="SB" value="677">Solomon Islands (+677)
                                                    </option>
                                                    <option data-countryCode="SO" value="252">Somalia (+252)
                                                    </option>
                                                    <option data-countryCode="ZA" value="27">South Africa (+27)
                                                    </option>
                                                    <option data-countryCode="ES" value="34">Spain (+34)</option>
                                                    <option data-countryCode="LK" value="94">Sri Lanka (+94)
                                                    </option>
                                                    <option data-countryCode="SH" value="290">St. Helena (+290)
                                                    </option>
                                                    <option data-countryCode="KN" value="1869">St. Kitts (+1869)
                                                    </option>
                                                    <option data-countryCode="SC" value="1758">St. Lucia (+1758)
                                                    </option>
                                                    <option data-countryCode="SD" value="249">Sudan (+249)</option>
                                                    <option data-countryCode="SR" value="597">Suriname (+597)
                                                    </option>
                                                    <option data-countryCode="SZ" value="268">Swaziland (+268)
                                                    </option>
                                                    <option data-countryCode="SE" value="46">Sweden (+46)</option>
                                                    <option data-countryCode="CH" value="41">Switzerland (+41)
                                                    </option>
                                                    <option data-countryCode="SI" value="963">Syria (+963)</option>
                                                    <option data-countryCode="TW" value="886">Taiwan (+886)</option>
                                                    <option data-countryCode="TJ" value="7">Tajikstan (+7)</option>
                                                    <option data-countryCode="TH" value="66">Thailand (+66)</option>
                                                    <option data-countryCode="TG" value="228">Togo (+228)</option>
                                                    <option data-countryCode="TO" value="676">Tonga (+676)</option>
                                                    <option data-countryCode="TT" value="1868">Trinidad &amp; Tobago
                                                        (+1868)
                                                    </option>
                                                    <option data-countryCode="TN" value="216">Tunisia (+216)
                                                    </option>
                                                    <option data-countryCode="TR" value="90">Turkey (+90)</option>
                                                    <option data-countryCode="TM" value="7">Turkmenistan (+7)
                                                    </option>
                                                    <option data-countryCode="TM" value="993">Turkmenistan (+993)
                                                    </option>
                                                    <option data-countryCode="TC" value="1649">Turks &amp; Caicos
                                                        Islands
                                                        (+1649)
                                                    </option>
                                                    <option data-countryCode="TV" value="688">Tuvalu (+688)</option>
                                                    <option data-countryCode="UG" value="256">Uganda (+256)</option>
                                                    <option data-countryCode="UA" value="380">Ukraine (+380)
                                                    </option>
                                                    <option data-countryCode="AE" value="971">United Arab Emirates
                                                        (+971)
                                                    </option>
                                                    <option data-countryCode="UY" value="598">Uruguay (+598)
                                                    </option>
                                                    <option data-countryCode="UZ" value="7">Uzbekistan (+7)</option>
                                                    <option data-countryCode="VU" value="678">Vanuatu (+678)
                                                    </option>
                                                    <option data-countryCode="VA" value="379">Vatican City (+379)
                                                    </option>
                                                    <option data-countryCode="VE" value="58">Venezuela (+58)
                                                    </option>
                                                    <option data-countryCode="VN" value="84">Vietnam (+84)</option>
                                                    <option data-countryCode="VG" value="84">Virgin Islands -
                                                        British
                                                        (+1284)
                                                    </option>
                                                    <option data-countryCode="VI" value="84">Virgin Islands - US
                                                        (+1340)
                                                    </option>
                                                    <option data-countryCode="WF" value="681">Wallis &amp; Futuna
                                                        (+681)
                                                    </option>
                                                    <option data-countryCode="YE" value="969">Yemen (North)(+969)
                                                    </option>
                                                    <option data-countryCode="YE" value="967">Yemen (South)(+967)
                                                    </option>
                                                    <option data-countryCode="ZM" value="260">Zambia (+260)</option>
                                                    <option data-countryCode="ZW" value="263">Zimbabwe (+263)
                                                    </option>
                                                </optgroup>
                                            </select>
                                            <input style={{width: '340px'}} type="tel" name="Phone_Number"
                                                   id="Phone_Number"
                                                   placeholder="Add the mobile number with country code "
                                                   className="span8" ref="Phone_Number" required/>
                                        </div>

                                    </div>

                                    <div className="control-group">
                                        <label className="control-label"><b>Street</b></label>
                                        <div className="controls">
                                            <input type="text" name="Street" id="Street"
                                                   placeholder="Please add your Street with House Number "
                                                   className="span8"
                                                   ref="Street" required/>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label"><b>City</b></label>
                                        <div className="controls">

                                            <input type="text" name="City" id="City"
                                                   placeholder="Please add your City " className="span8" ref="City"
                                                   required/>

                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label"><b>Other details</b></label>
                                        <div className="controls">

                                            <input type="text" name="Other_details" id="Other_details"
                                                   aria-placeholder="Please add Other Apartment Details"
                                                   className="span8" ref="Other_details" required/>

                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label"><b>Images</b></label>
                                        <div className="controls">
                                            <input type="file" ref={(ref) => {
                                                this.Image_Name = ref;
                                            }}
                                                   className="span8" accept="image/jpg, image/jpeg" multiple
                                                   required/>
                                        </div>
                                    </div>

                                    <div className="control-group">
                                        <div className="controls">
                                            <button type="submit" className="btn" name="submit" id="submit">Submit
                                                Form
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        )

    }
});


export default Rent;