import React, {Component} from 'react';
import axios from 'axios';

import styles from '../../../public/css/style.css';
import swal from 'sweetalert'

import {Image} from 'react-bootstrap';

let Home = React.createClass({
    getInitialState: function () {
        return {
            rooms: [],
            receive : []
        }
    },

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


          return (<div>
                <Image src="./img/bgimg.jpg" style={sectionStyle} responsive>
                </Image>
               <p style={search_adjust}>hello...........</p>
              </div>
          )
    }
});

export default Home;
