import React from 'react'

function Movie(props) {
    const { movie } = props
  return (
    <div>
        <p>{movie.title}</p>
    </div>
  )
}

export default Movie