// Include React
import React from "react";
//import axios from "axios"

// Helper for making AJAX requests to our API
// let helpers = require("./utils/routes");

// Creating the Results component
let Main = React.createClass({
    // getInitialState: function(){
    // 	return {

    // 	};
    // },_
    // Here we render the function
    /* componentDidMount: function () {
         if (!sessionStorage.getItem('UserLogin')) {
             this.props.history.push("/Login");
         }
     },*/
    componentDidMount: function () {
        if (localStorage.getItem('UserLogin')) {
            document.getElementById("LogIn").style.display = "none";
            document.getElementById("LogOut").style.display = "block";

        }else if(!localStorage.getItem('UserLogin')) {
            document.getElementById("LogIn").style.display = "block";
            document.getElementById("LogOut").style.display = "none";

        }
    },
    LogOut: function () {
        document.getElementById("LogIn").style.display = "block";
        document.getElementById("LogOut").style.display = "none";

        localStorage.removeItem("UserLogin");
        this.props.history.push('/');
    },
    render: function () {


            return (<div>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    {/*Brand and toggle get grouped for better mobile display */}
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                        <a id="title" className="navbar-brand" href="#/Landing">Accomodation</a>

                    </div>
                    {/*Collect the nav links, forms, and other content for toggling */}
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">

                            <li><a href="#/Home">Home</a></li>
                            <li><a href="#/Find">Find Room</a></li>
                            <li><a href="#/Rent">Rent Your Room</a></li>
                            <li><a href="#/Contact">Contact Us</a></li>

                                <li id="LogIn"><a href="#/Login">Login </a></li>

                                <li id="LogOut"><a onClick={this.LogOut}>LogOut </a></li>

                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid" id="childContainer">
            <div className="FindRoomMainDiv">


                {/* This code will dump the correct Child Component */}
                {this.props.children}
            </div>

            </div>
        </div>);
    }
});


export default Main;
