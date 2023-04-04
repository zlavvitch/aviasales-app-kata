import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from "classnames";

import { filterChecked } from "../../actions";

import classes from "./FilterTickets.module.scss";

function FilterTickets() {
  const { activeFilter } = useSelector((state) => state.filter);

  const [filters] = useState({
    cheap: "Самый дешевый",
    fast: "Самый быстрый",
    optimal: "Оптимальный",
  });

  const filtersNames = Object.values(filters);
  const filterIds = Object.keys(filters);

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { id } = e.target;

    dispatch(filterChecked(id));
  };

  const rendreFilters = (names, ids, active) =>
    names.map((value, index) => {
      const inputClass = classNames(classes.FilterTickets__label, {
        [classes.active]: ids[index] === active,
      });

      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index} className={classes.FilterTickets__item}>
          <input
            type="radio"
            name="filters"
            id={ids[index]}
            value={value}
            defaultChecked={ids[index] === "cheap"}
            onChange={handleOnChange}
            className={classes.FilterTickets__input}
          />
          <label htmlFor={ids[index]} className={inputClass}>
            {value}
          </label>
        </li>
      );
    });

  const elements = rendreFilters(filtersNames, filterIds, activeFilter);

  return <ul className={classes.FilterTickets}>{elements}</ul>;
}

export default FilterTickets;
