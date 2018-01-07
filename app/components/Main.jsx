// Include React
var React = require("react");

// Helper for making AJAX requests to our API
// var helpers = require("./utils/routes");

// Creating the Results component
var Main = React.createClass({
	// getInitialState: function(){
	// 	return {

	// 	};
	// },_
	// Here we render the function

	render: function() {
        return <div>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    {/*Brand and toggle get grouped for better mobile display */}
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                        <a id="title" className="navbar-brand" href="#/Landing">accomodation</a>
                    </div>

                    {/*Collect the nav links, forms, and other content for toggling */}
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">

                            <li><a href="#/Home">Home</a></li>
                            <li><a href="#/Find">Find Room</a></li>
                            <li><a href="#/Rent">Rent Your Room</a></li>
                            <li><a href="#/Contact">Contact Us</a></li>
                            <li><a href="#/Login">Login </a></li>

                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid" id="childContainer">

                {/* This code will dump the correct Child Component */}
                {this.props.children}

            </div>
        </div>;
	}
});

module.exports = Main
