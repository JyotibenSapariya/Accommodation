import React, { Component } from 'react';
import axios from 'axios';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.submitSignup = this.submitSignup.bind(this);
	}
	submitSignup() {
        alert("inside");

        axios.get('/getRooms')
            .then(res => {
                this.setState({ data: JSON.stringify(res.data) });
              //  alert("hi");
                alert(JSON.stringify(res.data));

            })
			.catch(err => {
            console.error(err);
        });

    }

	render(){
		return (
			<div id="teamRow">
				<h1 className="row sectionTitle" >Home</h1>

			<button onClick={this.submitSignup}>Hello</button>

				<p > {this.state.data }</p>

			</div>
		)
	}
}

export default Home;
