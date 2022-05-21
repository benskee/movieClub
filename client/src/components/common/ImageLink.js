import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class ImageLink extends Component {
    render() {
        const { link, label, image} = this.props
        return (
            <React.Fragment>
                <div className="col-md-4 col-sm-6">
                    <div className="container mt-4 mr-auto ml-auto">
                        <Link to={link} style={{ textDecoration: 'none', color: 'black' }}>
                            <h3 style={{ textAlign: 'center'}}>{label}</h3>
                            <img alt="" className="imageLink img-fluid pic-1" style={{ height: '150px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} src={`./static/images/${image}_image.png`}></img>
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
