// Include React
import React from "react";
import axios from "axios"


import io from 'socket.io-client';

let socket = io();
let Login = React.createClass({

    changeToLoging: function () {
        document.getElementById("Sign Up").style.display = "none";
        document.getElementById("Login").style.display = "block";
    },
    changeToSignUp: function () {
        document.getElementById("Login").style.display = "none";
        document.getElementById("Sign Up").style.display = "block";
    },


    submitSignup: function (e) {
        e.preventDefault();
        let login = this;

        axios.post('/UserSignUp', {
            email: this.refs.emailId.value,
            password: this.refs.passwordkey.value,
        }).then(res => {
            if(JSON.stringify(res.data)==='true') {
                alert("You Are Ready to Go... Please Login Now!!!!!");
                document.getElementById("Login").style.display = "block";
                document.getElementById("Sign Up").style.display = "none";
            }else {
                alert("Email exist... Please Login with It!!!");
            }


            //this.props.history.push("/Login");
        })


    },

    submitLogin: function (e) {
        // alert('user logging');
        e.preventDefault();
        let form = e.target;
        let message = "";
        console.log(e.target);
        let signup = this;
        axios.post('/Userlogin', {
            email: this.refs.useremail.value,
            password: this.refs.userpassword.value,
        }).then(res => {
        //    alert(JSON.stringify(res.data[0].email));
          //  alert(JSON.stringify(this.refs.useremail.value));
            if(JSON.stringify(res.data[0].email) === JSON.stringify(this.refs.useremail.value)) {
                document.getElementById("LogIn").style.display = "none";
                document.getElementById("LogOut").style.display = "block";

                localStorage.setItem('UserLogin',res.data[0].email);

                this.props.history.push("/Home");
            }else {
                alert("Wrong Details... Please Enter Again!!!");
            }

         })


    },


    render: function () {

        const {changeToLoging,changeToSignUp,submitSignup, submitLogin} = this;

        return (<div>
                <div className="Login">

                    <h1>    <a onClick={changeToLoging}>Login </a>|

                            <a onClick={changeToSignUp}>   Sign Up</a>

                    </h1>
                </div>

                <div className="LoginForm">
                    <form className="row" onSubmit={submitLogin} id="Login">
                        <h4>Please Enter Your Login Details...</h4>

                        <div className="form-group col-xs-12">
                            <input type="email" className="form-control"  ref="useremail" placeholder="Email"  required/>
                             </div>

                        <div className="form-group col-xs-12">
                            <input type="password" className="form-control" id="userpassword" ref="userpassword" placeholder="Password"
                                   required/>
                        </div>

                        <div className="form-group col-xs-12">
                            <button type="submit" className="btn" >Submit</button>
                        </div>
                    </form>
                    <form className="row HideSignUp" onSubmit={submitSignup} id="Sign Up">
                        <h4>Please Enter Details to Sign Up...</h4>

                        <div className="form-group col-xs-12">
                            <input type="email" className="form-control" id="emailId" ref="emailId" placeholder="Email" required/>
                        </div>

                        <div className="form-group col-xs-12">
                            <input type="password" className="form-control" id="passwordkey" ref="passwordkey" placeholder="Password"
                                   required/>
                        </div>
                        <div className="form-group col-xs-12">
                            <input type="password" className="form-control" id="ConfirmPasswordkey" placeholder="Password"
                                   required/>
                        </div>
                        <div className="form-group col-xs-12">
                            <button type="submit" className="btn" >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});


export default Login;