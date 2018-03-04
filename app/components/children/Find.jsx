// Include React
import React from "react";
import axios from "axios"
import Time from 'react-time'

//require("moment/package.json");

let Find = React.createClass({
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
                //alert(JSON.stringify(result.data));
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
    Search: function (e) {
        let _this = this;
        alert('hello0');
        e.preventDefault();
        axios.post('/SearchInput', {
            SearchInput: this.refs.SearchInput.value,
        }).then(res =>{
            if (res.data !== false) {
                alert("success");
                _this.setState({rooms: res.data});
            } else {
                alert("search not Success");
            }

        })
    },

    render: function () {
        const {rooms,roomsMorDetails} = this.state;
        const {RoomMoreDetails,CloseDiv} = this;
        let search_adjust = {
            width: '50%',
            height: '40px',
            fontSize: '20px',
            color: '#000099',
            boxShadow: '0 0 5px black',
        };
        let send = {
            height: '32px',
            width: '10%',
            color: 'black',
            backgroundColor: 'skyblue',
            fontSize: 'medium',
            fontWeight: 'bold',
        };
        return (<div>
            <div className="FindRoomMainDiv">
                <h1 className="row sectionTitle">Rooms</h1>
                <div style={{marginLeft : '25%', marginTop : '3%'}}>
                <input type="text" ref="SearchInput" style={search_adjust}   name="SearchInput" placeholder="Please Search Here....."/>
                    <button type="submit" style={send} onClick={this.Search}>SEARCH</button></div>
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
                                            <h5 className="projectSubTitle">{rooms.Room_Cost_in_euros} </h5>
                                            <ul className="technologies">

                                                <li>Number of beds : {rooms.Number_of_beds}</li>
                                                <li>Bathroom :{rooms.Bathroom}</li>
                                                <li>Phone_Number : {rooms.Phone_Number}</li>
                                                <li>Street : {rooms.Street}</li>
                                                <li>City : {rooms.City}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )}
                    {/* Turner's Color Picker */}
                    {/*	<div className="col-sm-12 col-md-6 projectBox" id="rightProject">
						<h4 className="projectTitle">Professional Portfolio</h4>
						<p className="row projectBlurb">Built for a young full stack developer, this professional portfolio gives a memorable impression with a vibrant design and intuitive layout. </p>
						
						<div className="row projectInfo">
							<div className="col-sm-8 col-lg-7">
								<a target="_blank" href="https://contygm.github.io/"><img src="#" className="screenShot" id="veevSite"/></a>
							</div>
							<div className="col-sm-4 col-lg-5">
								<h5 className="projectSubTitle">Technologies Used</h5>
								<ul className="technologies">
									<li>Materialize</li>
									<li>JavaScript</li>
									<li>HTML/CSS</li>
									<li>jQuery</li>
								</ul>
							</div>
						</div>
					</div>*/}
                </div>
            </div>
                <div className="MoreDetails" id="MoreDetails">
                    <div className="popupDetails">
                        {roomsMorDetails.map(function (roomsMorDetails) {
                                return (

                                    <div className="col-sm-12 col-md-6 projectBox" id="leftProject"  key={roomsMorDetails._id}>
                                        <h4 className="Close" onClick={CloseDiv}>X</h4>
                                        <h1 className="projectTitle">{roomsMorDetails.Apartment_name}</h1>
                                        <p className="row projectBlurb">
                                            Available On : <Time value={roomsMorDetails.Room_Availability_From} format="DD/MM/YYYY"/>
                                            - Till :
                                            <Time value={roomsMorDetails.Till} format="DD/MM/YYYY"/>
                                        </p>


                                        <div className="row projectInfo">
                                            <div className="col-sm-8 col-lg-7">
                                                <a target="_blank" >
                                                    <img src={roomsMorDetails.Image_name} className="screenShot" id="colorPicker"/>
                                                </a>
                                            </div>
                                            <div className="col-sm-4 col-lg-5">
                                                <h5 className="projectSubTitle">{roomsMorDetails.Room_Cost_in_euros} </h5>
                                                <ul className="technologies">
                                                    <input type="hidden" value={roomsMorDetails._id} ref="RId"/>
                                                    <li>Number of beds : {roomsMorDetails.Number_of_beds}</li>
                                                    <li>Bathroom :{roomsMorDetails.Bathroom}</li>
                                                    <li>Phone_Number : {roomsMorDetails.Phone_Number}</li>
                                                    <li>Street : {roomsMorDetails.Street}</li>
                                                    <li>City : {roomsMorDetails.City}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>

                </div>
            </div>
        )
    }
});


export default Find;