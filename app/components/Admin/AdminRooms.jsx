// Include React
import React from "react";
import axios from "axios"
import "../../../public/css/AdminRoomcss.css"

let AdminRooms = React.createclass({

    getInitialState: function () {
        return {
            rooms: []
        }
    },

    componentDidMount: function () {
        let _this = this;
        this.serverRequest = axios.get("/getRooms")
            .then(function (result) {
                _this.setState({rooms: result.data});
            })
    },
    DeleteRoom: function (e) {

        alert(this.setState(e.target.value));
        let _this = this;
        alert('delete');
        axios.post("/DeleteRoom",{
            RId: this.refs.RId.value,
        })
    },
    VerifyRoom: function (e) {
        let _this = this;
        alert('verify insert');
        axios.post("/Verifyroom",{
            RId: document.querySelector("#RId").value,
        }).then(response => {
            this.props.history.push("/AdminRooms");
        })
    },
    render: function () {
        const {rooms} = this.state;
        const {DeleteRoom,VerifyRoom} = this;
        return (
            <div>
            </div>
        )
    }
});

export default AdminRooms;
