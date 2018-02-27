// Include React
import React from "react";
import axios from "axios"

let UserDataShow = React.createClass({

    getInitialState: function () {
        return {
            userdatas: []
        }
    },

    componentDidMount: function () {
        let _this = this;
        this.serverRequest = axios.get("/Getuserdata")
            .then(function (result) {
                _this.setState({userdatas: result.data});
            })
    },

    Deleteuserdata: function (e) {
        let _this = this;
        alert('delete');
        axios.post("/Deleteuserdata",{
            RId: document.querySelector("#RId").value,
        })
    },



    render: function () {
        const {userdatas} = this.state;
        const {Deleteuserdata} = this;
        return (
            <div className="pageset1">
                <div id="teamRow">
                    <h1 className="row sectionTitle" >Verified userdatas</h1>
                </div>
                {userdatas.map(function (userdata) {
                    return (
                        <div>
                            <table className="table">
                                <tr>
                                    <form onSubmit={Deleteuserdata}>
                                        <input  type="hidden" value= {userdata._id} name="RId" id="RId" />

                                        <td>
                                            <button type="submit" >Delete</button>
                                        </td>
                                    </form>
                                    <td>{userdata.email}</td>
                                </tr>
                            </table>

                        </div>
                    );
                })}
            </div>
        )
    }
});

export default UserDataShow;
