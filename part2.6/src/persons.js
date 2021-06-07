import React from "react";
// import service from "./axios"

const Person = ({ props, handleOff }) => {
  return (
    <li>
      {props.name} {props.number}
      <button onClick={() => handleOff(props.id)}>Delete</button>
    </li>
  )
};

export default Person;
