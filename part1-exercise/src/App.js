import React from 'react'

// const Header = (props) => {
//   return(
//     <h1>{props.course}</h1>
//   )
// };

// const Content = (props) => {
//   return(
//   <div>
//     <p>
//       {props.part} {props.exercises}
//     </p>
//   </div>
//   )
// };

// const Total = (props) => {
//   return(
//   <div>
//     <p>Number of exercises {props.total}</p>
//   </div>
//   )
// };

// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14

//   return (
//     <div>
//       <Header course={course} />
//       <Content part={part1} exercises={exercises1} />
//       <Content part={part2} exercises={exercises2} />
//       <Content part={part3} exercises={exercises3} />
//       <Total total={exercises1 + exercises2 + exercises3} />
//     </div>
//   )
// };

// export default App;

const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.excercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} excercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} excercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} excercises={props.parts[2].exercises} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of excercises{" "}
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;

