var React = require("react");

var Home = React.createClass({

	render: function(){
		return (
			<div id="teamRow">
				<h1 className="row sectionTitle" >Home</h1>
				
				<div className="row" id="profileRow">
					<div className="col-sm-4 col-lg-6 profileBox" id="leftBox">
						<img src="img/tDavis1.jpg" className="profilePic" id="turner"/>
						<h4 className="teammate">Turner</h4>
						<p className="subheading">Web Developer</p>
						<p className="teammateBlurb">As TuVeDa’s back end engineer, Turner creates efficient systems and stable functionality with advanced technologies like Ruby on Rails, SQL and Javascript frameworks.</p>
					</div>
					
					<div className="col-sm-4 col-lg-6 profileBox" id="middleBox">
						<img src="img/veev.jpg" className="profilePic" id="veev"/>
						<h4 className="teammate">Veev</h4>
						<p className="subheading">Web Developer</p>
						<p className="teammateBlurb">As TuVeDa’s web designer and front end developer, Veev creates elegant and engaging UI/UX with cutting edge tools like React, Bootstrap and CSS frameworks.</p>
					</div>
					
					<div className="col-sm-4 col-lg-12 profileBox" id="rightBox">
						<img src="img/david.jpg" className="profilePic" id="david"/>
						<h4 className="teammate">David</h4>
						<p className="subheading">SEO Specialist</p>
						<p className="teammateBlurb">As TuVeDa’s SEO and marketing specialist, David maximizes your web application’s traffic with customized strategies tailored to your audience and business goals.</p>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Home;
