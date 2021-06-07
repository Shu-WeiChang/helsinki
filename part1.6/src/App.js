import React, { useState } from 'react';

const Title = ({ text, element }) => {
  const Element = element;
  return <Element>{text}</Element>
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
};

const Stats = ({ text, value }) => {
  return (
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <table>
      <tbody>
        <Stats text="good" value={good} />
        <Stats text="neutral" value={neutral} />
        <Stats text="bad" value={bad} />
        <Stats text="all" value={all} />
        <Stats text="average" value={average} />
        <Stats text="positive" value={positive} />
      </tbody>
    </table>
  )
};

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad;
  const average = all / 3;
  const positive = good / average;

  return (
    <div>
      <Title element="h1" text="give feedback" />
      <Button text="good" onClick={() => setGood(good + 1)}/>
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" onClick={() => setBad(bad + 1)}/>
      <Title element="h2" text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} />
      

    </div>
  )
}

export default App;
