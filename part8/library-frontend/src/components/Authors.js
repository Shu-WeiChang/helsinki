import React, { useState } from 'react'
import { EDIT_AUTHOR } from "../queries"
import { useMutation } from "@apollo/client"

const Authors = ({props, setError}) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.log(error)
      setError(error.graphQLErrors[0].message)
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, born: parseInt(born, 10) }})

    setName("")
    setBorn("")
  }


  // if (props === null) {
  //   return null
  // }
  // console.log(props)
  // const authors = []

  // const [getPerson, result] = useLazyQuery(FIND_PERSON) 
  // const [person, setPerson] = useState(null)

  // const showPerson = (name) => {
  //   getPerson({ variables: { nameToSearch: name } })
  // }

  // useEffect(() => {
  //   if (result.data) {
  //     setPerson(result.data.findPerson)
  //   }
  // }, [result])

  // useEffect(() => {
  //   if (result.data && result.data.editNumber === null) {
  //     setError('person not found')
  //   }
  // }, [result.data])

  // if (person) {
  //   return(
  //     <div>
  //       <h2>{person.name}</h2>
  //       <div>{person.address.street} {person.address.city}</div>
  //       <div>{person.phone}</div>
  //       <button onClick={() => setPerson(null)}>close</button>
  //     </div>
  //   )
  // }
  if (props) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {props.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
        <br/>
        <h2>Set birthyear</h2>
        <form onSubmit={handleSubmit}>
          name
          {/* <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
          <select onChange={({ target }) => setName(target.value)}>
            {props.map(a =>
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
          <br/>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
          <br/>
          <button type="submit">update author</button>
        </form>
      </div>
    )  
  }
}

export default Authors
