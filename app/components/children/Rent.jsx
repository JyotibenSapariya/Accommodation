// Include React
import React from "react";
import axios from "axios"

let Rent = React.createClass({
 AddRoom: function (e) {
        alert('added rooms success');
        e.preventDefault();
        let form = e.target;
        let message = "";
        console.log(e.target);
        let AddRoom = this;
        axios.post('/AddRoom', {
            Apartment_name: document.querySelector("#Apartment_name").value,
            Image_name: document.querySelector("#Image_name").value

        })

    },

    render: function () {
        const {AddRoom} = this;
        
        return (<div>
            <div className="span9">
                <div className="content">

                    <div className="module">
                        <div className="module-head">
                            <h3>Country Detail Add</h3>
                        </div>
                        <div className="module-body">

                            <form className="form-horizontal row-fluid"  action="" onSubmit={AddRoom}>

                                <div className="control-group">
                                    <label className="control-label"><b>Room Name</b></label>
                                    <div className="controls">
                                        <input type="text" name="Apartment_name" id="Apartment_name"
                                               placeholder="Please add Apartment name " className="span8"/>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label className="control-label"><b>Images</b></label>
                                    <div className="controls">
                                        <input type="file" name="Image_name" id="Image_name" className="span8"/>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <div className="controls">
                                        <button type="submit" className="btn" name="" id="">Submit Form
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                    <br/>

                </div>

            </div>

        </div>)
    }
});


export default Rent;