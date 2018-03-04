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

    Deletecontact: function (e) {
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
                        RId: this.refs.cic.value,
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
                                    <form onSubmit={Deletecontact}>
                                        <input  type="hidden" value={contact._id}   ref="cic"/>
                                        <td>
                                            <button type="submit" className="btn">Delete</button>
                                        </td>
                                    </form>
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
