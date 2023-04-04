const initialState = {
  tickets: [],
  searchStatus: false,
  tiketsLoadingStatus: "idle",
};

// eslint-disable-next-line default-param-last
const tickets = (state = initialState, action) => {
  switch (action.type) {
    case "TICKETS_FETCHED":
      return {
        ...state,
        tickets: action.payload.tickets,
        searchStatus: action.payload.stop,
      };
    case "TICKETS_FETCHING_ERROR":
      return {
        ...state,
        tiketsLoadingStatus: "error",
      };
    default:
      return state;
  }
};

export default tickets;
