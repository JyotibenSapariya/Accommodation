// Include React
var React = require("react");
// axios for post to server
var axios = require("axios");

var Contact = React.createClass({

    getInitialState: function () {
        return {
            showConfirmation: false,
            confirmationText: "",
            confirmationHeader: ""
        };
    },

    submitContact: function (e) {
        e.preventDefault();
        var form = e.target;
        var message = "";
        console.log(e.target);
        var contact = this;
        axios.post('/contact', {
            name: document.querySelector("#name").value,
            subject: document.querySelector("#subject").value,
            email: document.querySelector("#email").value,
            description: document.querySelector("#description").value,
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

var ContactForm = React.createClass({

    render: function () {
        return (
            <div>
                <h1 className="row sectionTitle">Contact Us</h1>

                <form className="row" id="formRow" onSubmit={this.props.submitContact}>
                    <div className="form-group col-xs-12 col-sm-6">
                        <input type="text" className="form-control" id="name" placeholder="First & Last Name"/>
                    </div>
                    <div className="form-group col-sm-6">
                        <input type="text" className="form-control" id="subject" placeholder="Subject"/>
                    </div>
                    <div className="form-group col-xs-12">
                        <input type="email" className="form-control" id="email" placeholder="Email"/>
                    </div>
                    <div className="form-group col-xs-12">
                        <textarea className="form-control" rows="3" placeholder="Tell Us About Your Queries"
                                  id="description"></textarea>
                    </div>

                    <div className="form-group col-xs-12">
                        <button type="submit" className="btn btn-default" id="contact-submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
});

var Confirmation = React.createClass({

    render: function () {
        return (
            <div>
                <h1 className="row sectionTitle">{this.props.showConfirmationHeader}</h1>
                <div className="row">{this.props.showConfirmationText}</div>
            </div>
        )
    }
});


module.exports = Contact
