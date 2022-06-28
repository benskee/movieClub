import React, { useState } from 'react';
import Joi from 'joi-browser';
import Popup from 'reactjs-popup';
import Form from './../common/FormFunc';
import searchMovies from '../../services/movieSearchService';
import AddMovie from './AddMovie';

function MovieSearch() {
    const [ data, setData ] = useState({search: ''})
    const [ errors, setErrors ] = useState({})
    const [ movies, setMovies ] = useState([])

    const schema = {
        search: Joi.string()
    }

    const doSubmit = async () => {
        let movieData = await searchMovies(data.search);
        setMovies(movieData)
    }

    const formProps = {
        data,
        setData,
        errors,
        setErrors,
        schema
    }
  return (
    <>
        <form onSubmit={(e) => Form.handleSubmit(formProps, doSubmit, e)} className="col-6 m-auto">
            {Form.renderInput('search', 'Search for movie...', formProps )}
            {Form.renderButton()}
            <br/><br/><br/>
        </form>
        {movies.length > 0 && <ul className='border border-dark rounded movie-search-list pl-0'>
            {movies?.length && movies.map((movie, idx) => 
                <li className={idx % 2 == 0 ? 'bg-secondary text-white' : null} key={movie.id}>
                    <Popup trigger={<p className='movie-result'>{ movie.title }</p>} modal>
                        <AddMovie movie={movie} />
                    </Popup>
                </li>)
            }
        </ul>}
    </>
  )
}

export default MovieSearch