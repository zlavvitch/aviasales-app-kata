const initialState = {
  searchId: "",
  searchIdLoadingStatus: "idle",
};

// eslint-disable-next-line default-param-last
const id = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCHID_FETCHING":
      return {
        ...state,
        searchIdLoadingStatus: "loading",
      };
    case "SEARCHID_FETCHED":
      return {
        ...state,
        searchId: action.payload,
        searchIdLoadingStatus: "idle",
      };
    case "SEARCHID_FETCHING_ERROR":
      return {
        ...state,
        searchIdLoadingStatus: "error",
      };

    default:
      return state;
  }
};

export default id;
