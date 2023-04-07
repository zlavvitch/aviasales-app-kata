const initialState = {
  tickets: [],
  searchStatus: false,
  tiketsLoadingStatus: "",
};

// eslint-disable-next-line default-param-last
const tickets = (state = initialState, action) => {
  switch (action.type) {
    case "TICKETS_FETCHED":
      return {
        ...state,
        tiketsLoadingStatus: "idle",
      };
    case "TICKETS_FETCHING":
      return {
        ...state,
        tickets: action.payload.tickets,
        searchStatus: action.payload.stop,
      };
    case "TICKETS_FETCHING_LOADING":
      return {
        ...state,
        tiketsLoadingStatus: "loading",
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
