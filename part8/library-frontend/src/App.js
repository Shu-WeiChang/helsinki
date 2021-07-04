import React, { useState } from 'react'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, SHOW_BOOKS, USER, BOOK_ADDED, USER_LOGIN } from './queries'
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from './components/LoginForm';
import Recommend from "./components/Recommend"

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [author, setAuthor] = useState(false)
  const [book, setBook] = useState(false)
  const [add, setAdd] = useState(false)
  const [token, setToken] = useState(null)
  const [login, setLogin] = useState(false)
  const [recommend, setRecommend] = useState(false)

  const client = useApolloClient()
  const result = useQuery(ALL_AUTHORS, {
    // pollInterval: 2000
  })
  console.log(result)

  const bookResult = useQuery(SHOW_BOOKS, {

  })

  console.log(bookResult)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: SHOW_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: SHOW_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      console.log(subscriptionData)
      updateCacheWith(addedBook)
    }
  })
  
  const userResult = useQuery(USER)

  console.log(userResult)

  if (result.loading)  {
    return <div>loading...</div>
  }

  const handleRecommend = (event) => {
    event.preventDefault()
    setBook(false)
    setAdd(false)
    setAuthor(false)
    setLogin(false)
    setRecommend(!recommend)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    setRecommend(false)
    setBook(false)
    setAdd(false)
    setAuthor(false)
    setLogin(!login)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const handleAuthor = (event) => {
    event.preventDefault()
    setRecommend(false)
    setLogin(false)
    setBook(false)
    setAdd(false)
    setAuthor(!author)
  }

  const handleBook = (event) => {
    event.preventDefault()
    setRecommend(false)
    setLogin(false)
    setAdd(false)
    setAuthor(false)
    setBook(!book)
  }
  
  const handleAdd = (event) => {
    event.preventDefault()
    setRecommend(false)
    setLogin(false)
    setBook(false)
    setAuthor(false)
    setAdd(!add)
  }



  return (
    <>
      <div>
        <button onClick={handleAuthor} type="button">authors</button>
        <button onClick={handleBook} type="button">books</button>
        {token ? 
          <>
            <button onClick={handleAdd} type="button">add book</button>
            <button onClick={handleRecommend} type="button">recommend</button>
            <button onClick={logout} type="button">logout</button>
          </>
         : <button onClick={handleLogin} type="button">login</button>}
      </div>
      <div>
        <Notify errorMessage={errorMessage} />
        {/* {add ? <NewBook /> : null} */}
        {author ? <Authors props={result.data.allAuthors} setError={notify}/> : null}
        {book ? <Books props={bookResult.data.allBooks}/> : null}
        {add ? <NewBook setError={notify} updateCacheWith={updateCacheWith} /> : null}
        {recommend ? <Recommend props={bookResult.data.allBooks} setError={notify} userResult={userResult.data.me} /> : null}
        {login ? <LoginForm setToken={setToken} setError={notify} /> : null}
      </div>
    </>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App
