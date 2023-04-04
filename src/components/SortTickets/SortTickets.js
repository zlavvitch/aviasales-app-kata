import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from "classnames";

import { sortChecked, sortCheckedAll, sortBtnChecked } from "../../actions";

import classes from "./SortTickets.module.scss";

function SortTickets() {
  const [sort] = useState({
    all: "Все",
    noTransfer: "Без пересадок",
    oneTransfer: "1 пересадка",
    twoTransfer: "2 пересадки",
    threeTransfer: "3 пересадки",
  });

  const { sortStatus } = useSelector((state) => state.sort);
  const isOpenSort = useSelector((state) => state.sort.isOpen);
  const sortKeys = Object.keys(sort);
  const dispatch = useDispatch();

  const filterTransfer = classes.FilterTransfer;
  const filterTransferDisactive = classes["FilterTransfer--disactive"];

  const filterClass = classNames(filterTransfer, {
    [filterTransferDisactive]: isOpenSort === false,
  });

  const handleOnChange = (e) => {
    const sortName = e.target.id;

    if (sortName === "all") {
      dispatch(sortCheckedAll(sortStatus[sortName], sortStatus));
    } else {
      dispatch(sortChecked(sortName, sortStatus));
    }
  };

  const handleOnClick = () => {
    dispatch(sortBtnChecked(isOpenSort));
  };

  const rendreSort = (ids) =>
    sortKeys.map((key, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={index} className={classes.FilterTransfer__item}>
        <label className={classes.FilterTransfer__label} htmlFor={ids[index]}>
          <input
            className={classes.FilterTransfer__input}
            type="checkbox"
            id={key}
            name={key}
            value={sort[key]}
            checked={sortStatus[key]}
            onChange={handleOnChange}
          />
          <span className={classes.FilterTransfer__text}>{sort[key]}</span>
        </label>
      </li>
    ));

  const elements = rendreSort(sort);

  return (
    <div className={filterClass}>
      <div className={classes.FilterTransfer__header}>
        <h2 className={classes.FilterTransfer__title}>Количество пересадок</h2>
      </div>
      <ul className={classes.FilterTransfer__list}>{elements}</ul>
      <button
        type="button"
        className={classes.FilterTransfer__btn}
        onClick={() => handleOnClick()}
      >
        <span className={classes.FilterMenu__text}>Показать билеты</span>
      </button>
    </div>
  );
}

export default SortTickets;
