import React, { useState } from 'react'
import { categories } from '../../services/addMovieService'
import { toast } from 'react-toastify'
import Joi from 'joi-browser'
import Form from '../common/Form';

function AddMovie(props) {
    const { movie, user } = props

    const [ data, setData ] = useState({ 
        category: ''
    })
    const [ errors, setErrors ] = useState({})

    const schema = {
        category: Joi.string().required().label('Category'),
    }

    const doSubmit = async () => {
        try {
            console.log(data.category)
        } catch (err) {
            if(err.response && err.response.status === 400) {
            const newErrors = { ...errors };
            newErrors.username = err.response.data;
            setErrors(newErrors)
            }
        }
    }

    const formProps = {
            data,
            setData,
            errors,
            setErrors,
            schema
    }

    return (
        <div>
            <h2>{movie.original_title}</h2>
            <hr />
            <img src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2${movie.poster_path}`} alt={movie.original_title} />
            <p><b>Description: </b>{movie.overview}</p>
            <p><b>Release Year: </b>{movie.release_date.substr(0,4)}</p>
            <p><b>Vote Average: </b>{movie.vote_average}</p>
            <form onSubmit={(e) => Form.handleSubmit(formProps, doSubmit, e)} className="row">
                <div className="col-3">{Form.renderButton('Save Movie', formProps)}</div>
                <div className="col-9 category-select">{Form.renderSelect('category', 'Select Category', formProps, categories)}</div>
            </form>
        </div>
    )
}

export default AddMovie