/* eslint-disable no-return-assign */

export const searchIdFetching = () => ({
  type: "SEARCHID_FETCHING",
});

export const searchIdFetched = (searchId) => ({
  type: "SEARCHID_FETCHED",
  payload: searchId,
});

export const searchIdFetchingError = () => ({
  type: "SEARCHID_FETCHING_ERROR",
});

export const fetchId = () => async (dispatch) => {
  dispatch(searchIdFetching());

  try {
    const res = await fetch("https://aviasales-test-api.kata.academy/search");

    if (!res.ok) {
      throw new Error(
        `Could not fetch ${"https://aviasales-test-api.kata.academy/search"}, status ${
          res.status
        }`
      );
    }

    const id = await res.json();
    dispatch(searchIdFetched(id.searchId));
  } catch (err) {
    dispatch(searchIdFetchingError());
    throw err.message;
  }
};

export const ticketsFetched = (tickets) => ({
  type: "TICKETS_FETCHED",
  payload: tickets,
});

export const ticketsFetchingError = () => ({
  type: "TICKETS_FETCHING_ERROR",
});

export const fetchTickets = (searchId, prevTickets) => async (dispatch) => {
  try {
    const res = await fetch(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
    );

    if (!res.ok) {
      if (res.status === 500) {
        dispatch(fetchTickets(searchId, prevTickets));
        throw new Error("500", "Ошибка на сервере!");
      } else {
        throw new Error(`Could not fetch TICKETS, status ${res.status}`);
      }
    }

    // eslint-disable-next-line prefer-const
    let { stop, tickets } = await res.json();
    tickets = [...prevTickets, ...tickets];
    const data = { stop, tickets };

    dispatch(ticketsFetched(data));
  } catch (err) {
    dispatch(ticketsFetchingError());
    throw err.message;
  }
};

export const filterChecked = (filterName) => ({
  type: "FILTER_CHECKED",
  payload: filterName,
});

export const sortChecked = (sortName, activeSort) => {
  const sorted = { ...activeSort, [sortName]: !activeSort[sortName] };
  const sortedAll = {
    ...activeSort,
    [sortName]: !activeSort[sortName],
    all: !activeSort.all,
  };

  const checkSort = Object.values(sorted).filter((value) => value).length === 4;

  const newActiveSort = checkSort ? sortedAll : { ...sorted };

  return {
    type: "SORT_CHECKED",
    payload: newActiveSort,
  };
};

export const sortCheckedAll = (prevValueAll, activeSort) => {
  const arrActiveSort = Object.entries(activeSort);

  const sortAllActive = Object.fromEntries(
    // eslint-disable-next-line no-param-reassign, no-unused-vars
    arrActiveSort.map(([key, value]) => [key, (value = true)])
  );

  const sortAllDisactive = Object.fromEntries(
    // eslint-disable-next-line no-param-reassign, no-unused-vars
    arrActiveSort.map(([key, value]) => [key, (value = false)])
  );

  const newActiveSort = prevValueAll ? sortAllDisactive : sortAllActive;

  return {
    type: "SORT_CHECKED_ALL",
    payload: newActiveSort,
  };
};

export const sortBtnChecked = (isOpen) => ({
  type: "SORT_BTN_CHECKED",
  payload: !isOpen,
});
