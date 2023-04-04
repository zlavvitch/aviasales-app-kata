import { useDispatch, useSelector } from "react-redux";

import { sortBtnChecked } from "../../actions";

import classes from "./FilterMenu.module.scss";

function FilterMenu() {
  const isOpenSort = useSelector((state) => state.sort.isOpen);
  const dispatch = useDispatch();

  const handleClickSort = () => {
    dispatch(sortBtnChecked(isOpenSort));
  };

  return (
    <div className={classes.FilterMenu}>
      <button
        type="button"
        className={classes.FilterMenu__btn}
        onClick={handleClickSort}
      >
        Пересадки &#8744;
      </button>
    </div>
  );
}

export default FilterMenu;
