import React from 'react'
import { Link } from 'react-router-dom';

function WelcomeBanner(props) {
    const { text, link, buttonLabel } = props

  return (
    <div className='d-flex justify-content-end align-items-center mt-2 mb-5'>
        <p className='banner-text'>{text}</p>
        <Link href={link} to={link}>
            <button className='btn btn-outline-primary'>
                {buttonLabel}
            </button>
        </Link>
    </div>
  )
}

export default WelcomeBanner