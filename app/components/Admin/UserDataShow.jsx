// Include React
import React from "react";
import axios from "axios"
import swal from 'sweetalert'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
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

    Deleteuserdata: function (RId) {
        let _this = this;
      //  alert('delete');
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post("/Deleteuserdata", {
                        RId: RId,
                    }).then(swal("Poof! Your imaginary file has been deleted!", {
                        icon: "warning",
                    }));
                    this.props.history.push("/UserDataShow");
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    },



    render: function () {
        if (!localStorage.getItem('AdminLogin')) {
            swal({
                title: "Sorry",
                text: "Please login first",
                icon: "info",
                dangerMode: true,
            });
            this.props.history.push("/adminlogin");
        }
        const {userdatas} = this.state;
        const {Deleteuserdata} = this;
        return (
            <div className="pageset1">
                <div id="teamRow">
                    <h1 className="row sectionTitle" >Manage UserData</h1>
                </div>
                {userdatas.map(function (userdata) {
                    return (
                        <div>
                            <table className="table">
                                <tr>

                                        <input  type="hidden" value= {userdata._id} ref="RId" />

                                        <td>
                                            <button type="submit" onClick={Deleteuserdata.bind(this,userdata._id )} style={{color: 'white',backgroundColor: 'red', height: '35px',width: '89px',fontSize: '21px',fontFamily: '-webkit-body'}}>Block</button>
                                        </td>

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
