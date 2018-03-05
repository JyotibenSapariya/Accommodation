// Include React
import React from "react";
import axios from "axios"
import "../../../public/css/AdminRoomcss.css"
import Time from 'react-time'
import swal from 'sweetalert'

let AdminRooms = React.createClass({

    getInitialState: function () {
        return {
            rooms: [],
            roomsMorDetails:[]
        }
    },

    componentDidMount: function () {
        let _this = this;
         axios.get("/getRooms")
            .then(function (result) {
                _this.setState({rooms: result.data});
            });
        document.getElementById("MoreDetails").style.display = "none";
    },
    RoomMoreDetails: function (i) {
        let _this = this;
        //alert(RID);
        //  alert(i);
        //alert(this.refs.RId.value);
        axios.post("/getRoomsMoreDetails", {
            RId:i,

        }).then(function (result) {
            //alert(result.data)
            _this.setState({roomsMorDetails: result.data});
            document.getElementById("MoreDetails").style.display = "block";
            //alert(JSON.stringify(result.data));
        });

    },
    CloseDiv:function () {
        // let _this = this;
        //_this.setState({roomsMorDetails:""});
        document.getElementById("MoreDetails").style.display = "none";
    },
    DeleteRoom: function (RId) {
        //alert(this.setState(e.target.value));
        let _this = this;
        //alert('delete');
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }) .then((willDelete) => {
            if (willDelete) {
                axios.post("/DeleteRoom", {
                    RId: RId,
                }).then(swal("Poof! Your imaginary file has been deleted!", {
                    icon: "warning",
                }));
                this.props.history.push("/AdminRooms");
            } else {
                swal("Your imaginary file is safe!");
            }
        });

    },

    VerifyRoom: function (RId) {
        let _this = this;
       // alert('verify insert');
        swal({
            title: "Are you sure?",
            text: "Are Sure You want to Verify",
            icon: "success",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post("/Verifyroom", {
                        RId: RId,
                    }).then(swal("Rooms has been Verified!", {
                        icon: "success",
                    }));
                    this.props.history.push("/AdminRooms");
                } else {
                    swal("Rooms is not Verified");
                }
            });

    },


    render: function () {
        if (!localStorage.getItem('AdminLogin')) {
            swal({
                title: "Sorry",
                text: "Please login first",
                icon: "info",
                dangerMode: true,
            });
            this.props.history.push("/adminlogin");
        }
        const {rooms, roomsMorDetails} = this.state;
        const {DeleteRoom,VerifyRoom, RoomMoreDetails, CloseDiv} = this;
        return (
            <div>
                <div className="FindRoomMainDiv">
                    <h1 className="row sectionTitle"> Unverified Rooms</h1>
                    <div className="row" id="projectRow">
                        {rooms.map(function (rooms) {
                                return (
                                    <div className="col-sm-12 col-md-6 projectBox" id="leftProject" key={rooms._id}>

                                        <h4 className="projectTitle">{rooms.Apartment_name}</h4>
                                        <p className="row projectBlurb">
                                            Available On : <Time value={rooms.Room_Availability_From} format="DD/MM/YYYY"/>
                                            - Till :
                                            <Time value={rooms.Till} format="DD/MM/YYYY"/>
                                        </p>


                                        <div className="row projectInfo">
                                            <div className="col-sm-8 col-lg-7">
                                                <a  >

                                                    <form onClick={RoomMoreDetails}>
                                                        <input type="hidden" value={rooms._id} ref="RId"/>
                                                        <img src={rooms.Image_name} className="screenShot" id="colorPicker" onClick={RoomMoreDetails.bind(this, rooms._id)} />
                                                    </form>
                                                </a>

                                            </div>
                                            <div className="col-sm-4 col-lg-5">
                                                <h5 className="projectSubTitle">{rooms.Room_Cost_in_euros} € </h5>
                                                <ul className="technologies" style={{textAlign: 'left'}}>

                                                    <li>Number of beds : {rooms.Number_of_beds}</li>
                                                    <li>Bathroom :{rooms.Bathroom}</li>
                                                    <li>Phone_Number : {rooms.Phone_Number}</li>
                                                    <li>Street : {rooms.Street}</li>
                                                    <li>City : {rooms.City}</li>
                                                    <li><div style={{marginTop: '10px'}}>
                                                        <div style={{float: 'left'}}>
                                                        <input  type="hidden" value= {rooms._id}  ref="RId" />
                                                        <td>
                                                            <button type="submit" onClick={DeleteRoom.bind(this,rooms._id )} className="btn" >Delete</button>
                                                        </td>
                                                        </div>
                                                       <div>
                                                            <input  type="hidden" value= {rooms._id}  ref="RId" />
                                                            <td>
                                                                <button type="submit" onClick={VerifyRoom.bind(this,rooms._id )} className="btn" >Verify Rooms</button>
                                                            </td>
                                                       </div></div></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                        </div>
                </div>
                <div className="MoreDetails" id="MoreDetails">

                        {roomsMorDetails.map(function (roomsMorDetails) {
                                return (

                                    <div  id="leftProject"  key={roomsMorDetails._id}>
                                        <h4 className="Close" onClick={CloseDiv}>X</h4>
                                        <h1 className="projectTitle">{roomsMorDetails.Apartment_name}</h1>
                                        <p className="row projectBlurb" style={{textAlign: 'center'}}>
                                            Available On : <Time value={roomsMorDetails.Room_Availability_From} format="DD/MM/YYYY"/>
                                            - Till :
                                            <Time value={roomsMorDetails.Till} format="DD/MM/YYYY"/>
                                        </p>


                                        <div className="row projectInfo" style={{marginLeft: '50px', marginRight: '242px', fontSize: '15px'}}>
                                            <div className="col-sm-8 col-lg-7">
                                                <a target="_blank" >
                                                    <img src={roomsMorDetails.Image_name} className="screenShot" id="colorPicker"/>
                                                </a>
                                            </div>
                                            <div className="col-sm-4 col-lg-5">
                                                <h5 className="projectSubTitle" style={{fontSize:'45px',marginBottom: '25px'}}>{roomsMorDetails.Room_Cost_in_euros} € </h5>
                                                <ul className="technologies" style={{marginRight: '-200px'}}>
                                                    <input type="hidden" value={roomsMorDetails._id} ref="RId"/>
                                                    <li style={{fontSize: '20px',color: 'black'}}>Room Details</li>
                                                    <li>Number of beds : {roomsMorDetails.Number_of_beds}</li>
                                                    <li>Bathroom :{roomsMorDetails.Bathroom}</li>
                                                    <li>Amenities : {roomsMorDetails.Amenities}</li>
                                                    <li>Other Details :<p style={{textAlign : 'justify'}}> {roomsMorDetails.Other_details}</p></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div style={{fontSize: '20px',marginTop : '30px'}}>
                                            <ul className="technologies" style={{}}>
                                                <li style={{fontSize: '20px',color: 'black'}}>Contact Details</li>
                                                <li>Contact Info. : {roomsMorDetails.Contact_Details}</li>
                                                <li>Phone Number :{roomsMorDetails.Phone_Number}</li>
                                                <li>Email : {roomsMorDetails.Email_Address}</li>
                                                <li>Street : {roomsMorDetails.Street}</li>
                                                <li>City : {roomsMorDetails.City}</li>
                                            </ul>
                                        </div>
                                    </div>

                                )
                            }
                        )}
                    </div>

                </div>


        )
    }
});

export default AdminRooms;


