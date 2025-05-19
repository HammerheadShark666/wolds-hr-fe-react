import React from "react";
import styles from "./css/TodaysDate.module.css";

const TodaysDate: React.FC = () => {
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles["todays-date"]}>
      {formattedDate}
    </div>
  );
};

export default TodaysDate;
