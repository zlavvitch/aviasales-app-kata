const initialState = {
  activeFilter: "cheap",
};

// eslint-disable-next-line default-param-last
const filter = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER_CHECKED":
      return {
        ...state,
        activeFilter: action.payload,
      };

    default:
      return state;
  }
};

export default filter;
