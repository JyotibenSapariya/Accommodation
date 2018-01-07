// Include React
var React = require("react");

var axios = require("axios");

var Login = React.createClass({


    submitSignup: function (e) {
        alert('hello0');
        e.preventDefault();
        var form = e.target;
        var message = "";
        console.log(e.target);
        var signup = this;
        axios.post('/signup', {
            email: document.querySelector("#emailId").value,
            password : document.querySelector("#passwordkey").value,
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
                                <li data-tabtar="lgm-1"><a href="#">Sign Up</a></li>
                            </ul>
                            <div className="logmod__tab-wrapper">
                                <div className="logmod__tab lgm-1">
                                    <div className="logmod__heading">
                                        <span className="logmod__heading-subtitle">Enter your personal details <strong>to create an acount</strong></span>
                                    </div>
                                    <div className="logmod__form">
                                        <form  className="simform" onSubmit={submitSignup}>

                                            <div className="sminputs">
                                                <div className="input full">
                                                    <label className="string optional" for="user-name">Email*</label>
                                                    <input className="string optional" maxlength="255" id="emailId"
                                                           name="emailId" placeholder="Email" type="email" size="50"/>
                                                </div>

                                                <div className="input string optional">
                                                    <label className="string optional" for="user-pw">Password *</label>
                                                    <input className="string optional" maxlength="255" id="passwordKey"
                                                           name="passwordKey" placeholder="Password"
                                                           type="text" size="50"/>
                                                </div>
                                                <div className="input string optional">
                                                    <label className="string optional"
                                                           for="user-pw-repeat">Repeat password *</label>
                                                    <input className="string optional" maxlength="255"
                                                           id="user-pw-repeat"
                                                           placeholder="Repeat password" type="text" size="50"/>
                                                </div>
                                            </div>
                                            <div className="simform__actions">
                                                <button className="sumbit" name="signup" type="sumbit">SignUp</button>
                                                <span className="simform__actions-sidetext">By creating an account you agree to our <a
                                                    className="special" href="#" target="_blank" role="link">Terms & Privacy</a></span>
                                            </div>

                                        </form>
                                    </div>

                                </div>
                                <div className="logmod__tab lgm-2">
                                    <div className="logmod__heading">
                                        <span
                                            className="logmod__heading-subtitle">Enter your email and password <strong>to sign in</strong></span>
                                    </div>
                                    <div className="logmod__form">
                                        <form accept-charset="utf-8" action="#" className="simform">
                                            <div className="sminputs">
                                                <div className="input full">
                                                    <label className="string optional" for="user-name">Email*</label>
                                                    <input className="string optional" maxlength="255" id="email" name="email"
                                                           placeholder="Email" type="email" size="50"/>
                                                </div>
                                            </div>
                                            <div className="sminputs">
                                                <div className="input full">
                                                    <label className="string optional" for="user-pw">Password *</label>
                                                    <input className="string optional" maxlength="255" id="user-pw"
                                                           placeholder="Password" type="password" size="50"/>
                                                    <span className="hide-password">Show</span>
                                                </div>
                                            </div>
                                            <div className="simform__actions">
                                                <button className="sumbit" type="sumbit">Log In</button>
                                                <span className="simform__actions-sidetext"><a className="special"
                                                                                               role="link" href="#">Forgot your password?<br/>Click here</a></span>
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

module.exports = Login;