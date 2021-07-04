const initialState = "";

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER":
      return action.data
    default:
      return state;
  }
}

export const filter = (filter) => {
  return {
    type: "FILTER",
    data: filter,
  };
};

export default filterReducer;
