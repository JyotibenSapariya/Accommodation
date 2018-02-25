import React, { Component } from 'react';
import axios from 'axios';
import styles from '../../../public/css/style.css';

class Home extends Component {

	render(){
		return (<div>
			<div id="teamRow">
				<h1 className="row sectionTitle" >Home</h1>
			</div>
				<div  >
					<input type="text"   className={styles.search_adjust} placeholder="Please Search Here....."/>
                    <button type="submit">SEARCH</button>
				</div>

		</div>
		)
	}
}

export default Home;
