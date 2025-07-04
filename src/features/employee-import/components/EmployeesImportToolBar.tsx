import React, { useEffect, useRef } from 'react';
import globals from "../../../components/css/Toolbar.module.css"
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { importEmployees } from '../../employee-import/employeeImportThunks';

type Props = {
  setShowEmployeePopUpForm: React.Dispatch<React.SetStateAction<boolean>>;  
  showEmployeePopUpForm: boolean;  
};

const EmployeesImportToolBar = ({ setShowEmployeePopUpForm, showEmployeePopUpForm }: Props) => {
 
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
    <div className={globals["toolbar"]}> 
      <div className={globals["toolbar-title"]}> 
        <span>Employees Import</span>
        </div>
      <div className={globals["toolbar-buttons"]}>     
        <button type="button" onClick={handleImportEmployeesClick}>Import Employees</button>
        <input
            type="file"
            ref={fileInputRef} 
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />   
      </div>
    </div>  
  );
};

export default EmployeesImportToolBar;