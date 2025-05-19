'use client';

import { Controller } from "react-hook-form";
import styles from "./css/Input.module.css"
 
interface IProps {  
  name: string;
  label: string;
  control: any;
  error: any;
} 

const InputDate = ({ name, control, label, error }: IProps) => {
 
  return (
    <div className={styles["row-container"]}>
      <div className={styles["row"]}>
        <label htmlFor={name} className={styles["label"]}>{label}:</label>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={styles["date"]}>
              <input
                {...field}
                type="date"
                id={name}              
                value={field.value ?? ""}
                placeholder={`${label}...`}
                onChange={(e) => field.onChange(e.target.value || null)}
              />
            </div>
          )}
        /> 
      </div>
      <div className={styles["row"]}> 
        {error && <span className={styles["error"]}>{error.message}</span>}
      </div>
    </div> 
  )   
}

export default InputDate;