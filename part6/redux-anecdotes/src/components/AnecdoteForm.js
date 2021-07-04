import { useSelector, useDispatch, connect } from 'react-redux'
import { createAnec } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnec = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anec.value
    event.target.anec.value = ""
    props.createAnec(anecdote)
    props.setNotification(`Successfully added anecdote`, 5)
  }

  return (
    <main>
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div><input name="anec" /></div>
        <button type="submit">create</button>
      </form>
    </main>
  )
}

export default connect(
  null,
  { createAnec, setNotification }
)(AnecdoteForm)
