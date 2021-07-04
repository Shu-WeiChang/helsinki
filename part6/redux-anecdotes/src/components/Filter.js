import React from 'react'
// import { connect } from "react-redux"
import { useDispatch } from "react-redux"
import { filter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filterValue = event.target.value;
    dispatch(filter(filterValue)); 
  };

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input id="filter" type="text" onChange={handleChange} />
    </div>
  );
};

// export default connect(
//   null,
//   { filter }
// )(Filter)

export default Filter
