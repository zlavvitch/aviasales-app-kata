const initialState = {
  sortStatus: {
    all: true,
    noTransfer: true,
    oneTransfer: true,
    twoTransfer: true,
    threeTransfer: true,
  },
  isOpen: false,
};

// eslint-disable-next-line default-param-last
const sort = (state = initialState, action) => {
  switch (action.type) {
    case "SORT_CHECKED":
      return {
        ...state,
        sortStatus: action.payload,
      };
    case "SORT_CHECKED_ALL":
      return {
        ...state,
        sortStatus: action.payload,
      };
    case "SORT_BTN_CHECKED":
      return {
        ...state,
        isOpen: action.payload,
      };

    default:
      return state;
  }
};

export default sort;
