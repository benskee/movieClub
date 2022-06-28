import React from 'react'

function AddMovie(props) {
  const { movie } = props


  return (
    <div>
        <h2>{movie.original_title}</h2>
        <hr />
        <img src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2${movie.poster_path}`} alt={movie.original_title} />
        <p><b>Description: </b>{movie.overview}</p>
        <p><b>Release Year: </b>{movie.release_date.substr(0,4)}</p>
        <p><b>Vote Average: </b>{movie.vote_average}</p>
        <button className='btn btn-secondary'>Save Movie</button>
    </div>
  )
}

export default AddMovie