import React from 'react';
import { Link } from 'react-router-dom';
import ImageLink from '../components/common/ImageLink';

function Home() {
    return (
        <div>
            <div className="container">
                <h1>Welcome to the 3kp App</h1>
                <h5 className='homeTitleSubtext'>Where Reasonable people hang out</h5>
                <h1><br /></h1>
            </div>
            
            <Link to='/movieClub'>
                <h3 className='col-2 m-auto border border-primary p-4'>Movie Club</h3>
            </Link>
        </div>
    );
}

export default Home