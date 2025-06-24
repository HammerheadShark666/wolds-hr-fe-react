import React, { useEffect, useRef } from 'react';
import styles from "../css/Employee-import-list-toolbar.module.css"; 
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { importEmployees } from '../../employee-import/employeeImportThunks';

type Props = {
  onSearch: (importDate: string) => void;
  setShowEmployeePopUpForm: React.Dispatch<React.SetStateAction<boolean>>;  
  showEmployeePopUpForm: boolean;  
};

const EmployeesImportToolBar = ({ onSearch, setShowEmployeePopUpForm, showEmployeePopUpForm }: Props) => {
 
  const dispatch = useDispatch<AppDispatch>(); 
  const fileInputRef = useRef<HTMLInputElement>(null); 

  const handleImportEmployeesClick = () => {
    fileInputRef.current?.click();
  }
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = event.target.files?.[0];
    if (file) {        
      dispatch(importEmployees({file}));
    }
    event.target.value = '';
  };
   
  useEffect(() => {
    document.getElementById('search')?.focus();
  });

  return (
    <div className={styles["employee-list-header"]}>
      <div className={styles["toolbar"]}> 
        <div className={styles["toolbar-buttons"]}>     
          <button type="button" onClick={handleImportEmployeesClick}>Import Employees</button>
          <input
              type="file"
              ref={fileInputRef} 
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />   
        </div>
      </div> 
    </div>
  );
};

export default EmployeesImportToolBar;