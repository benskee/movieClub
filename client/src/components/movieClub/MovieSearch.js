import React from 'react';
import axios from 'axios';
import Joi from 'joi-browser';
import Form from './../common/Form';
import { searchMovies } from '../../services/movieSearchService';

export default class MovieSearch extends Form {
        state = {
        data: {search: ""},
        errors: {},
        movies: {}
    }

    schema = {
        search: Joi.string()
    }

    doSubmit = async () => {
        let movieData = await searchMovies(this.state.data.search);

        this.setState({
                movies: movieData
            })
        
        console.log(this.state.movies)
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit} className="col-6 m-auto">
                    {this.renderInput('search', 'Search for a movie...')}
                    {this.renderButton('Search')}
                </form>
            </>
        )
    }
}