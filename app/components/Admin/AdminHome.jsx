﻿// Include React
import React from "react";
import axios from "axios"

let AdminHome = React.createClass({




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

                            <a id="title" className="navbar-brand" href="#/Landing">accomodation</a>
                        </div>

                        {/*Collect the nav links, forms, and other content for toggling */}
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">

                                <li><a href="#/AdminHome">Home</a></li>
                                <li><a href="#/AdminRooms">UnVerified Room</a></li>
                                <li><a href="#/AdminRoomsVerified">Verified Room </a></li>
                                <li><a href="#/AdminContactShow">Contact Data</a></li>
                                <li><a href="#/UserDataShow">Users Details </a></li>

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