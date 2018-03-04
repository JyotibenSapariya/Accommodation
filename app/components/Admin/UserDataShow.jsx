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

    Deleteuserdata: function (e) {
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
                        RId: this.refs.RId.value,
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
                                        <input  type="hidden" value= {userdata._id} ref="RId" />

                                        <td>
                                            <button type="submit" style={{color: 'white',backgroundColor: 'red', height: '35px',width: '89px',fontSize: '21px',fontFamily: '-webkit-body'}}>Block</button>
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
