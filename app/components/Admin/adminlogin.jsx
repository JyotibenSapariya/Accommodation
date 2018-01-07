// Include React
var React = require("react");

var axios = require("axios");

var Adminlogin = React.createClass({


    submitSignup: function (e) {
        alert('hello0');
        e.preventDefault();
        var form = e.target;
        var message = "";
        console.log(e.target);
        var signup = this;
        axios.post('/signup', {
            email: document.querySelector("#email").value,
            password: document.querySelector("#passwordkey").value,
        })


    },


    render: function () {
        const {submitSignup} = this;

        return (<div>
                <div className="logmod">
                    <div className="logmod__wrapper">
                        <span className="logmod__close">Close</span>
                        <div className="logmod__container">
                            <ul className="logmod__tabs">
                                <li data-tabtar="lgm-2"><a href="#">Login</a></li>
                            </ul>
                            <div className="logmod__tab-wrapper">
                                <div className="logmod__tab lgm-2">
                                    <div className="logmod__heading">
                                        <span
                                            className="logmod__heading-subtitle">Enter your email and password <strong>to Login</strong></span>
                                    </div>
                                    <div className="logmod__form">
                                        <form accept-charset="utf-8" action="#" className="simform"
                                              onSubmit={submitSignup}>
                                            <div className="sminputs">
                                                <div className="input full">
                                                    <label className="string optional" for="user-name">Email*</label>
                                                    <input className="string optional" maxlength="255" id="email"
                                                           name="email"
                                                           placeholder="Email" type="email" size="50"/>
                                                </div>
                                            </div>
                                            <div className="sminputs">
                                                <div className="input full">
                                                    <label className="string optional" for="user-pw">Password *</label>
                                                    <input className="string optional" maxlength="255" id="passwordkey"
                                                           name="passwordkey"
                                                           placeholder="Password" type="password" size="50"/>
                                                    <span className="hide-password">Show</span>
                                                </div>
                                            </div>
                                            <div className="simform__actions">
                                                <button className="sumbit" type="sumbit">Log In</button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Adminlogin;