import ReduxThunk from "redux-thunk";
import {
  legacy_createStore as createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";

import id from "../reducers/id";
import tickets from "../reducers/tickets";
import filter from "../reducers/filter";
import sort from "../reducers/sort";

const store = createStore(
  combineReducers({ id, tickets, filter, sort }),
  compose(
    applyMiddleware(ReduxThunk),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
