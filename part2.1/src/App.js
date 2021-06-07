import React from 'react'

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <div>
      {parts.map(({ name, exercises, id }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
};

const Total = ({ parts }) => {
  const total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );
  return <p>Total number of exercises {total}</p>
};

export default Course;

