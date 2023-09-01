import { useCallback, useState } from 'react'
import { useMovies } from '../hooks/useMovies'
import { useSearch } from '../hooks/useSearch'
import { Movies } from './Movies'
import './App.css'
import debounce from 'just-debounce-it'

export const App = () => {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const typeDebounce = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 1000)
    , [])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    setSearch(newQuery)
    typeDebounce(newQuery)
  }
  return (
    <main>
      <header>
        <h1>Buscador de Película</h1>
        <section>
          <form action="" onSubmit={handleSubmit}>
            <input onChange={handleChange} value={search} name='query' type="text" placeholder="Avenger, Star War, Batman..." />
            <input type="checkbox" onChange={handleSort} checked={sort} name="" id="" />
            <button type="submit">Buscar</button>
          </form>
          {error && <p style={{ color: 'red' }} >{error}</p>}
        </section>
      </header>
      <section>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </section>
    </main>
  )
}
