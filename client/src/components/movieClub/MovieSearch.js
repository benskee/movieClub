import React, { useState } from 'react';
import Joi from 'joi-browser';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Form from './../common/FormFunc';
import searchMovies from '../../services/movieSearchService';
import Movie from './Movie';
import AddMovie from './AddMovie';
import { Link } from 'react-router-dom';

function MovieSearch() {
    const [ data, setData ] = useState({search: ''})
    const [ errors, setErrors ] = useState({})
    const [ movies, setMovies ] = useState({})

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
            <ul>
                {movies?.length && movies.map(movie => 
                    <li key={movie.id}>
                        <Popup trigger={<button>{ movie.title }</button>} modal>
                            <AddMovie movie={movie} />
                        </Popup>
                    </li>)
                }
            </ul>
        </form>
    </>
  )
}

export default MovieSearch