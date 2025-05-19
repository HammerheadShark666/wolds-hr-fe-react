'use client'

import { Controller } from "react-hook-form"; 
import { Department } from "../types/department";
import styles from "./css/Input.module.css" 

interface IProps {  
    name: string;
    label: string;
    control: any;
    error: any;
    items: Department[]
  }

const InputSelect = ({ name, items, label, control, error }: IProps) => { 
 
  return (
    <div className={styles["row-container"]}>
      <div className={styles["row"]}>
        <label htmlFor={name} className={styles["label"]}>{label}:</label>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={styles["dropdown"]}>
              <select 
                id={name}                  
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))} 
                className={styles["select"]}>
                  <option value="">Select...</option>
                  {items.map((item) => (
                  <option key={item.id} value={item.id}>
                      {item.name}
                  </option>
                  ))}
              </select>  
            </div>
            )}
          />
      </div> 
      <div className={styles["row"]}> 
        {error && <span className={styles["error"]}>{error.message}</span>}
      </div>
    </div>
  );
};

export default InputSelect;