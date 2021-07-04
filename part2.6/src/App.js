import React, { useState, useEffect } from 'react'
import Person from "./persons";
import service from "./axios"

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const handleOff = (id) => {
  if (window.confirm("delete?")) {
    service
      .off(id)
      .then(
        console.log("deleted")
      )
  }
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState("")
  const [ message, setMessage ] = useState("")
  const [ query, setQuery ] = useState("")
  // const [ filteredPersons, setFiltererPersons] = useState(null)

  useEffect(() => {
    // console.log("effect")
    service
      .getAll()
      .then(initial => {
        setPersons(initial);
        if (query !== "") {
          const searchResult = persons.filter(person =>
            person.name.toLowerCase().includes(query.toLowerCase())
          );
          setPersons(searchResult)
        }
      })
      .catch(error => {
        console.log("fail")
      })
  }, [persons, query]);

  // useEffect(() => {
  //   if (query !== "") {
  //     const searchResult = persons.filter(person => 
  //       person.name.toLowerCase().includes(query.toLowerCase())) 
  //     setPersons(searchResult)
  //   }
  // }, [query])

  const addNote = (event) => { 
    event.preventDefault();
    if (persons.some((person) => person.name === newName) && newNumber !== "") {
      alert(`${newName} has been added.`);
      

      const filter = persons.find(person => person.name === newName)
      const change = {
        ...filter,
        number: newNumber,
      }
      if (window.confirm("replace?")) {
        service
          .update(filter.id, change)
          .then(response => {
            console.log("updated", response)
            setMessage(`changed ${change.name}`)
            setTimeout(() => {
              setMessage("");
            }, 5000);
          })
          .catch(error => {
            setMessage("info has been moved")
            setTimeout(() => {
              setMessage("");
            }, 5000);
            console.log("fail")
          })
      }

      setNewName("");
      setNewNumber("");
    } else {
      const Object = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      service
        .create(Object)
        .then(response => {
          console.log(response)
          setMessage(`added ${Object.name}`)
          setTimeout(() => {
            setMessage("");
          }, 5000)
        })
        .catch(error => {
          console.log("fail")
        })
      // setPersons(persons.concat(Object))
      setNewName("")
      setNewNumber("")
      
    }
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleFilter = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
          filter shown with<input 
                              value={query}
                              onChange={handleFilter}
                            />
          <form onSubmit={addNote}>
            name: <input 
                    placeholder="Martin Fowler"
                    value={newName}
                    onChange={handleChange}
                  />
            number: <input
                      value={newNumber}
                      onChange={handleNumberChange}
                    />                    
                  <button type="submit">add</button>
          </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person key={person.id} props={person} handleOff={handleOff} /> )}
      </ul>      
    </div>
  )
}

export default App
