// Include React
import React from "react";
import axios from "axios"

import io from 'socket.io-client';
import swal from "sweetalert";

let socket = io();
let Adminlogin = React.createClass({


    submitLogin: function (e) {
      //  alert('hello0');
        e.preventDefault();
        axios.post('/adminlogin', {
            email: this.refs.email.value,
            password: this.refs.passwordkey.value,
        }).then(res =>{
            if(JSON.stringify(res.data)==="true"){
                swal({
                    title: "Success",
                    text: "You are successfully log in",
                    icon: "info",
                    dangerMode: true,
                });
                localStorage.setItem('AdminLogin', this.refs.email.value);

                this.props.history.push("/AdminHome");
            }else if(JSON.stringify(res.data)==="false") {
                swal({
                    title: "Sorry",
                    text: "Wrong Details... Please Enter Again!!!",
                    icon: "error",
                    dangerMode: true,
                });
            }
        })
    },


    render: function () {
        const {submitLogin} = this;

        return (<div>
            <div className="AdminLogin">
                <form className="row" onSubmit={submitLogin} id="Login">
                    <h4>Please Enter Your Login Details...</h4>

                    <div className="form-group col-xs-12">
                        <input type="email" className="form-control" ref="email" placeholder="Email"  required/>
                    </div>

                    <div className="form-group col-xs-12">
                        <input type="password" className="form-control" ref="passwordkey" placeholder="Password"
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



export default Adminlogin;