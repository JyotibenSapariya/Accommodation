import React, {Component} from 'react';
//import axios from 'axios';
import {Image} from 'react-bootstrap';
import { Redirect } from 'react-router'

let Home = React.createClass({

    render() {

        let sectionStyle = {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'stretch',
            resizeMode: 'stretch',

        };
        let search_adjust = {
            position: 'absolute',
            top: '65%',
            left: '25%',
        };

        const { Search } = this;
        return ( <div>
                <Image src="./img/bgimg.jpg" style={sectionStyle} responsive>
                </Image>
               <p style={search_adjust}>hello...........</p>
            </div>

        )
    }
});

export default Home;
