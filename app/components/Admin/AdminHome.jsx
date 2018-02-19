﻿// Include React
import React from "react";
import axios from "axios"

let AdminHome = React.createClass({


    submitLogin: function (e) {
      //  alert('hello0');
        e.preventDefault();
        axios.post('/adminlogin', {
            email: document.querySelector("#email").value,
            password: document.querySelector("#passwordkey").value,
        }).then(res =>{
            if(JSON.stringify(res.data)==="true"){
                alert("Login Success");
                this.props.history.push("/AdminHome");
            }else if(JSON.stringify(res.data)==="false") {
                alert("Login Failed")
            }
        })
    },


    render: function () {
        const {submitLogin} = this;

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

                            <a id="title" className="navbar-brand" href="#/Landing">accomodation</a>
                        </div>

                        {/*Collect the nav links, forms, and other content for toggling */}
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">

                                <li><a href="#">Home</a></li>
                                <li><a href="#/AdminHome/AdminRooms">Verify Room</a></li>
                                <li><a href="#/AdminRooms">Rent Your Room</a></li>
                                <li><a href="#">Contact Data</a></li>
                                <li><a href="#/Login">Users Details </a></li>

                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container-fluid" id="childContainer">

                    {/* This code will dump the correct Child Component */}
                    {this.props.children}

                </div>
            </div>
        )
    }
});


export default AdminHome;