// Include React
import React from "react";
import axios from "axios"
import swal from 'sweetalert'

let AdminContactShow = React.createClass({

    getInitialState: function () {
        return {
            contacts: []
        }
    },

    componentDidMount: function () {
        let _this = this;
        this.serverRequest = axios.get("/Showcontactdata")
            .then(function (result) {
                _this.setState({contacts: result.data});
            })
    },

    Deletecontact: function (RId) {
        let _this = this;
        // alert(this.refs.cic.value);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post("/Deletecontact", {
                        RId: RId,
                    }).then(swal("Poof! Your imaginary file has been deleted!", {
                        icon: "warning",
                    }));
                    this.props.history.push("/AdminContactShow");
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
        const {contacts} = this.state;
        const {Deletecontact} = this;
        return (
            <div className="pageset1">
                <div id="teamRow">
                    <h1 className="row sectionTitle" >Show Customer Queries.</h1>
                </div>
                <div>
                    <table className="table">

                        <tr>
                            <th>Delete</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Queries</th>
                        </tr>
                        <tbody>
                {contacts.map(function (contact) {
                    return (
                        <tr>

                                        <input  type="hidden" value={contact._id}   ref="cic"/>
                                        <td>
                                            <button type="submit" onClick={Deletecontact.bind(this,contact._id )} className="btn">Delete</button>
                                        </td>

                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.subject}</td>
                            <td>{contact.description}</td>
                                </tr>

                    );
                })}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
});

export default AdminContactShow;
