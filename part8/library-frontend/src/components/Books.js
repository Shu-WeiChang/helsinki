import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOK } from '../queries'

// var _ = require('lodash');

const Books = ({props}) => {
  const [filter, setFilter] = useState("")
  const [result, setResult] = useState(null)
  const [fetchBooks, { data, error }] = useLazyQuery(ALL_BOOK)

  console.log(useQuery(ALL_BOOK, {variables: { genre: "agile" }}))

  // useEffect(() => {
  //   fetchBooks({variables: { genre: "agile" }})
  //   console.log(data)
  // }, [])



  // genre buttons
  const genreArrays = props.map(g => g.genres)
  const genreList = [].concat.apply([], genreArrays)
  console.log(genreList)
  const genres = [ ...new Set(genreList) ];
  console.log(genres)


  const handleFilter = async (event) => {
    event.preventDefault()
    setFilter(event.target.value)
    console.log(event.target.value)
    // const fetch = await useQuery(ALL_BOOK, {variables: { genre: filter }})
    // const fetch = await fn(filter)
    await fetchBooks({variables: { genre: event.target.value }})
    console.log(data)
    console.log(error)
  }

  // useEffect(() => {
  //   if (filter) {
  //     async function books() {
  //       const book = await fetchBooks({ variables:{ genre: `${filter}` }})
  //       console.log(book)
  //       setResult(book.data.allBooks)
  //     }
  //     books()
  //   }
  // }, [filter])

  return (
    <div>
      <h2>books</h2>

      <p>in genre patterns <em>{filter}</em></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {/* {props.filter(p => p.genres.includes(filter)).map(a => */}
          {result ? result.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
      {genres.map(g =>
        <button key={g} type="button" value={g} onClick={handleFilter}>{g}</button>
      )}
    </div>
  )
}

export default Books
