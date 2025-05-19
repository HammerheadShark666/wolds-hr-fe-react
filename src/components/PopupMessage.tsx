import React from 'react';
import styles from './css/PopupMessage.module.css'

interface IProps {
  message: string;
  onClose: () => void;
} 
 
const PopupMessage = ({ message, onClose }: IProps) => {

  return (
    <div className={styles["popup-overlay"]}>
      <div className={styles["popup"]}>
        <p>{message}</p>
        <button onClick={onClose} className={styles["button"]}>Close</button>
      </div>
    </div>
  );
}; 

export default PopupMessage;