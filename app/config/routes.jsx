// Inclue the React library
var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the Route component for displaying individual routes
var Route = router.Route;

// Include the Router component to contain all our Routes
// Here where we can pass in some configuration as props
var Router = router.Router;

// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
var hashHistory = router.hashHistory;

// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

// Reference the high-level components
var Main = require("../components/Main.jsx");
var Landing = require("../components/children/Landing.jsx");
var Contact = require("../components/children/Contact.jsx");
var Find = require("../components/children/Find.jsx");
var Home = require("../components/children/Home.jsx");
var login = require("../components/children/Login.jsx");
var Rent = require("../components/children/Rent.jsx");

var Adminlogin = require("../components/Admin/adminlogin.jsx");


// Export the Routes
module.exports = (

  // The high level component is the Router component
  <Router history={hashHistory}>

  	{/* navbar */}
    <Route path="/" component={Main}>


	    <Route path="Landing" component={Landing} />
	    <Route path="Contact" component={Contact} />
	    <Route path="Find" component={Find} />
	    <Route path="Home" component={Home} />
	    <Route path="Rent" component={Rent} />
        <Route path="login" component={login} />


  		{/* default route if all else fails */}
    	<IndexRoute component={Landing} />

    </Route>

      <Route path="/Adminlogin" component={Adminlogin} />
  </Router>
);
