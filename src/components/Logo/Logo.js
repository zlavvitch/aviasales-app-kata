import logo from "./logo.svg";
import styles from "./Logo.scss";

function Logo() {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="logo" />
    </div>
  );
}

export default Logo;
