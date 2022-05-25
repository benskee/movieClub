import axios from 'axios'


const api_key = process.env.REACT_APP_MOVIE_API_KEY;

export const searchMovies = async movie => {
    try {
        const movies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${movie}&include_adult=true`, {transformRequest: (data, headers) => {
        delete headers.common['x-auth-token'];
        }})
        return movies.data.results
    } catch (err) {
        console.error(err.message);
    }
}