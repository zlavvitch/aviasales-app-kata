import { checkFilter } from "./checkFilter";
import { checkSort } from "./checkSort";

const firstPackFilteredTickets = (filter, sort, tickets) => {
  let newTickets = checkFilter(filter, tickets);

  if (!sort.all) {
    newTickets = checkSort(sort, tickets, newTickets);
  }

  return newTickets;
};

// eslint-disable-next-line import/prefer-default-export
export { firstPackFilteredTickets };
