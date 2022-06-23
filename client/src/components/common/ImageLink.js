import React  from 'react'
import { Link } from 'react-router-dom';

function ImageLink(props) {
    const { link, label, image } = props
    return (
        <>
            <div className="col-md-4 col-sm-6">
                <div className="container mt-4 d-flex justify-content-center">
                    <Link to={link} className='text-dark'>
                        <h3 className="text-center">{label}</h3>
                        <img alt={`link for ${image}`} className="imageLink img-fluid pic-1" src={`./static/images/${image}_image.png`}></img>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ImageLink