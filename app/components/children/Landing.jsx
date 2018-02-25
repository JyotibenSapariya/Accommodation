// Include React
import React from "react";
//import axios from "axios"
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

let Landing = React.createClass({

    render() {const images = [
        {
            original: '/img/a.jpg',
            thumbnail: '/img/a.jpg',
        },
        {
            original: '/img/b.jpg',
            thumbnail: '/img/b.jpg'
        },
        {
            original: '/img/c.jpg',
            thumbnail: '/img/c.jpg'
        }
    ]

        return (<div className="pageset1">
            <ImageGallery items={images} /> </div>      );
    }
});

export default Landing;