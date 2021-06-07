import React, { useState, useEffect } from 'react'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Title = ({ element, text }) => {
  const Element = element;
  return <Element>{text}</Element>
}

const AnecdoteBody = ({ anecdote, voteScore }) => {
  return (
    <div>
      {anecdote}<br></br>
      <span>votes:{voteScore}</span>
    </div>
  )
}

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const initial = Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(initial)
  const [mostVoted, setmostVoted] = useState(0)

  const updateVote = () => {
    const updatedVote = [...vote]
    updatedVote[selected]++;
    setVote(updatedVote);    
  };

  useEffect(() => {
    const max = vote.indexOf(Math.max(...vote));
    if (vote[max] <= vote[mostVoted]) {
      return;
    }
    setmostVoted(max)
  }, [vote, mostVoted])

  return (
    <div>
      <Title element="h1" text="Anecdote of the day" />
      <AnecdoteBody anecdote={anecdotes[selected]} voteScore={vote[selected]} />
      <Button text="vote" onClick={updateVote} />
      <Button text="next" onClick={() => setSelected(getRandomInt(0, 5))} />
      <Title element="h1" text="Anecdote with most votes" />
      <AnecdoteBody anecdote={anecdotes[mostVoted]} voteScore={vote[mostVoted]} />
    </div>
  )
}

export default App
