const Reducer = (state, action) => {
  switch (action.type) {
    case "addUser":
      return {
        ...state,
        user: action.payload,
      };
    case "removeUser":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

//test

export default Reducer;
