// Include React
import React from "react";
import axios from "axios"

let AdminRooms = React.createClass({


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
            <div className="AdminLogin">
               Admin Rooms
                cfghfcnz
            </div>
                hhjh
            </div>
        )
    }
});

export default AdminRooms;
