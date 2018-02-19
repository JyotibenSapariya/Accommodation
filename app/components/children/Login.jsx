// Include React
import React from "react";
import axios from "axios"

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
            email: document.querySelector("#emailId").value,
            password: document.querySelector("#passwordkey").value,
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
            email: document.querySelector("#useremail").value,
            password: document.querySelector("#userpassword").value,
        }).then(res => {
            if(JSON.stringify(res.data)==='true') {
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
                            <input type="email" className="form-control" id="useremail" placeholder="Email"  required/>
                             </div>

                        <div className="form-group col-xs-12">
                            <input type="password" className="form-control" id="userpassword" placeholder="Password"
                                   required/>
                        </div>

                        <div className="form-group col-xs-12">
                            <button type="submit" className="btn" >Submit</button>
                        </div>
                    </form>
                    <form className="row HideSignUp" onSubmit={submitSignup} id="Sign Up">
                        <h4>Please Enter Details to Sign Up...</h4>

                        <div className="form-group col-xs-12">
                            <input type="email" className="form-control" id="emailId" placeholder="Email" required/>
                        </div>

                        <div className="form-group col-xs-12">
                            <input type="password" className="form-control" id="passwordkey" placeholder="Password"
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