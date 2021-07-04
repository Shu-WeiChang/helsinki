import { voteAnec } from "../reducers/anecdoteReducer"
import { connect } from 'react-redux'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = (props) => {
  const anecdotesToShow = () => {
    if (props.filter === "") return props.anec;

    return props.anec
      .filter((anecdote) => 
        anecdote.content.toLowerCase().includes(props.filter.toLowerCase())  
      )
      .sort((a, b) => (a.votes > b.votes ? -1 : 1))
  };
  
  const vote = (votedAnecdote) => {
    props.voteAnec(votedAnecdote);
    props.setNotification(`You voted ${votedAnecdote.content}`, 5);
  }

  return (
    <>
      {anecdotesToShow()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

const mapStateToProps = ({ anec, filter }) => {
  return {
    anec,
    filter
  };
};

const ConnectedAnecLists = connect(
  mapStateToProps,
  { voteAnec, setNotification }
)(AnecdoteList);

export default ConnectedAnecLists
