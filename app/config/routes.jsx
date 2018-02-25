// Inclue the React library
import React from "react";


// Include the react-router module
let router =  require("react-router");

// Include the Route component for displaying individual routes
let Route = router.Route;

// Include the Router component to contain all our Routes
// Here where we can pass in some configuration as props
let Router = router.Router;

// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
let hashHistory = router.hashHistory;

// Include the IndexRoute (catch-all route)
let IndexRoute = router.IndexRoute;

// Reference the high-level components
import Main  from "../components/Main.jsx";
import Landing from  "../components/children/Landing.jsx";
import Contact from  "../components/children/Contact.jsx";
import Find from  "../components/children/Find.jsx";
import Home from  "../components/children/Home.jsx";
import login from  "../components/children/Login.jsx";
import Rent from  "../components/children/Rent.jsx";

import Adminlogin from  "../components/Admin/adminlogin.jsx";
import AdminHome from  "../components/Admin/AdminHome.jsx";
import AdminRooms from  "../components/Admin/AdminRooms.jsx";
import AdminRoomsVerified from  "../components/Admin/AdminRoomsVerified.jsx";
import UserDataShow from  "../components/Admin/UserDataShow.jsx";
import AdminContactShow from  "../components/Admin/AdminContactShow.jsx";


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


	  <Route path="/AdminHome" component={AdminHome} >
		  <Route path={"/AdminRooms"} component={AdminRooms} />
		  <Route path={"/AdminRoomsVerified"} component={AdminRoomsVerified} />
		  <Route path={"/UserDataShow"} component={UserDataShow} />
		  <Route path={"/AdminContactShow"} component={AdminContactShow} />

	  </Route>
  </Router>
);
