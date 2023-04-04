/* eslint-disable no-param-reassign */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v1 as uuidv1 } from "uuid";
import { createSelector } from "reselect";

import { fetchTickets } from "../../actions";
import Ticket from "../Ticket";
import Spinner from "../Spinner";

import classes from "./TicketsList.module.scss";

function TicketsList() {
  const [numberOfTickets, setNamberOfTickets] = useState(5);
  const { searchId } = useSelector((state) => state.id);
  const { tickets } = useSelector((state) => state.tickets);
  const { searchStatus } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchId && !searchStatus) {
      dispatch(fetchTickets(searchId, tickets));
    }
  }, [searchId, tickets, searchStatus]);

  const filteredTicketsSelector = createSelector(
    (state) => state.filter.activeFilter,
    (state) => state.sort.sortStatus,
    (state) => state.tickets.tickets,

    // eslint-disable-next-line consistent-return
    (filter, sortStatus, ticketsData) => {
      const totalDuration = (data) =>
        data.segments.reduce(
          // eslint-disable-next-line no-return-assign
          (acc, prev) => (acc += prev.duration),
          0
        );

      let newTickets = {};

      // eslint-disable-next-line consistent-return
      const checkFilter = (checkedFilter) => {
        switch (checkedFilter) {
          case "cheap":
            newTickets = [
              ...ticketsData.sort((prev, next) => prev.price - next.price),
            ];
            break;

          case "fast":
            newTickets = [
              ...ticketsData.sort(
                (prev, next) => totalDuration(prev) - totalDuration(next)
              ),
            ];
            break;

          case "optimal":
            newTickets = [
              ...ticketsData.sort((prev, next) => {
                const optimalPrev = prev.price + totalDuration(prev);
                const optimalNext = next.price + totalDuration(next);

                return optimalPrev - optimalNext;
              }),
            ];
            break;

          default:
            return newTickets;
        }
      };

      const checkSort = () => {
        const activeSorts = Object.entries(sortStatus)
          .slice(1)
          .reduce((acc, sort, index) => {
            // eslint-disable-next-line no-unused-vars
            const [_, val] = sort;

            if (val) {
              acc.push([index]);
            }

            return acc;
          }, [])
          .flat();

        newTickets = [
          ...tickets.filter((ticket) => {
            const [seg1, seg2] = ticket.segments;
            const countStopsSeg1 = seg1.stops.length;
            const countStopsSeg2 = seg2.stops.length;

            return activeSorts.includes(countStopsSeg1, countStopsSeg2);
          }),
        ];
      };

      checkFilter(filter);

      if (!sortStatus.all) {
        checkSort();
      }

      return newTickets;
    }
  );

  const addTickets = () => {
    setNamberOfTickets(numberOfTickets + 5);
  };

  const rendreTickets = (data, num) => {
    const rendreData = data.slice(0, num).map((ticket) => {
      const { price, carrier, segments } = ticket;

      return (
        <Ticket
          key={uuidv1()}
          price={price}
          carrier={carrier}
          segments={segments}
        />
      );
    });

    const rendreNoTickets =
      !data.length && searchStatus ? (
        <h2>Рейсов, подходящих под заданные фильтры, не найдено</h2>
      ) : null;

    const rendreBtn = data.length ? (
      <button
        type="button"
        className={classes.TicketsList__btn}
        onClick={addTickets}
      >
        Показать еще 5 билетов!
      </button>
    ) : null;

    return (
      <>
        {rendreNoTickets}
        {rendreData}
        {rendreBtn}
      </>
    );
  };

  const filtredTickects = useSelector(filteredTicketsSelector);
  const loader = !searchStatus ? <Spinner /> : null;
  const elements = rendreTickets(filtredTickects, numberOfTickets);

  return (
    <ul className={classes.TicketsList}>
      {loader}
      {elements}
    </ul>
  );
}

export default TicketsList;
