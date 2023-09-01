import './App.css'
function ListOfMovies ({ movies }) {
  return (
    <ul className="movies">
      {movies.map(movie => (
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.urlImage} alt={movie.title} />
        </li>
      ))}
    </ul>
  )
}
function NoMovieRender () {
  return <p>No se han encontrado resultados</p>
}

export const Movies = ({ movies }) => {
  const isMovie = movies?.length > 0
  return (
    isMovie
      ? <ListOfMovies movies={movies} />
      : <NoMovieRender />
  )
}
