import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchId } from "../../actions";
import SortTickets from "../SortTickets";
import FilterTickets from "../FilterTickets";
import FilterMenu from "../FilterMenu";
import TicketsList from "../TicketsList";
import Logo from "../Logo";

import classes from "./App.module.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchId());
  }, []);

  return (
    <div className={classes.App}>
      <Logo />
      <FilterMenu />
      <main className={classes.App__content}>
        <SortTickets />
        <div className={classes.App__wrapper}>
          <FilterTickets />
          <TicketsList />
        </div>
      </main>
    </div>
  );
}

export default App;
