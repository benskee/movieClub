import React from 'react';
import axios from 'axios';
import Joi from 'joi-browser';
import Form from './../common/Form';

export default class MovieSearch extends Form {
        state = {
        data: {search: ""},
        errors: {},
        movies: {}
    }

    schema = {
        search: Joi.string()
    }

    doSubmit = () => {
        const movie = this.state.data.search
        const api_key = process.env.REACT_APP_MOVIE_API_KEY;
        let movieData = [];

        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${movie}&include_adult=true`, {transformRequest: (data, headers) => {
            delete headers.common['x-auth-token'];
            return data;
        }})
        .then(res => {
            console.log(res.data.results)
            movieData.push(res.data.results[0])
            this.setState({
                movies: movieData
            })
        })
        
        console.log(this.state.movies)
    }

    render() {
        return (
            <>
                <br/> Movie search
                <form onSubmit={this.handleSubmit} className="col-6 m-auto">
                    {this.renderInput('search', 'Search for a movie...')}
                    {this.renderButton('Search')}
                </form>
            </>
        )
    }
}