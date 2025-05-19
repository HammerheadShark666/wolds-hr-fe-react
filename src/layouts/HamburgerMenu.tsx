import React from "react";
import styles from "./css/HamburgerMenu.module.css";

interface IProps {
  onClick: () => void;
};

const HamburgerMenu: React.FC<IProps> = ({ onClick }) => {
  return (
    <button className={styles["hamburger"]} onClick={onClick}>
      ☰
    </button>
  );
};

export default HamburgerMenu;