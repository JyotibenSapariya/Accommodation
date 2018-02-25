import React from "react";
import axios from "axios"

let Contact = React.createClass({

    getInitialState: function () {
        return {
            showConfirmation: false,
            confirmationText: "",
            confirmationHeader: ""
        };
    },

    submitContact: function (e) {
        e.preventDefault();
        let form = e.target;
        let message = "";
        console.log(e.target);
        let contact = this;
        axios.post('/contact', {
            name: this.refs.name.value,
            subject: this.refs.subject.value,
            email:this.refs.email.value,
            description: this.refs.description.value,
        })
            .then(function (response) {
                console.log(response);

                contact.setState({
                    confirmationText: "Your message has been successfully submitted.  We will get back to you soon!",
                    confirmationHeader: "Thank You!",
                    showConfirmation: true
                });
            })
            .catch(function (error) {
                console.log(error);

                contact.setState({
                    confirmationText: "Please refresh and try again!",
                    confirmationHeader: "Ooops!",
                    showConfirmation: true
                });
            })
    },

    render: function () {
        if (this.state.showConfirmation) {
            return (
                <Confirmation
                    showConfirmationText={this.state.confirmationText}
                    showConfirmationHeader={this.state.confirmationHeader}
                />
            );
        } else {
            return (
                <ContactForm submitContact={this.submitContact}/>
            );
        }
    }
});

let ContactForm = React.createClass({

    render: function () {
        return (
            <div>
                <h1 className="row sectionTitle">Contact Us</h1>

                <form className="row" id="formRow" onSubmit={this.props.submitContact}>
                    <div className="form-group col-xs-12 col-sm-6">
                        <input type="text" className="form-control" ref="name" placeholder="First & Last Name"/>
                    </div>
                    <div className="form-group col-sm-6">
                        <input type="text" className="form-control" ref="subject" placeholder="Subject"/>
                    </div>
                    <div className="form-group col-xs-12">
                        <input type="email" className="form-control" ref="email" placeholder="Email"/>
                    </div>
                    <div className="form-group col-xs-12">
                        <textarea className="form-control" rows="3" placeholder="Tell Us About Your Queries"
                                  ref="description"> </textarea>
                    </div>

                    <div className="form-group col-xs-12">
                        <button type="submit" className="btn btn-default" id="contact-submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
});

let Confirmation = React.createClass({

    render: function () {
        return (
            <div>
                <h1 className="row sectionTitle">{this.props.showConfirmationHeader}</h1>
                <div className="row">{this.props.showConfirmationText}</div>
            </div>
        )
    }
});


export default Contact;
