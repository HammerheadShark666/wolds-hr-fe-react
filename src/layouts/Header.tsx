import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import TodaysDate from "./TodaysDate";
import styles from "./css/Header.module.css";

interface IProps {
  onHamburgerClick: () => void;
};

const Header: React.FC<IProps> = ({ onHamburgerClick }) => {
  return (
    <header className={styles["header"]}>      
      <h1 className={styles["title-header"]}>WoldsHR</h1>
      <TodaysDate></TodaysDate>
      <HamburgerMenu onClick={onHamburgerClick} />
    </header>
  );
};

export default Header;