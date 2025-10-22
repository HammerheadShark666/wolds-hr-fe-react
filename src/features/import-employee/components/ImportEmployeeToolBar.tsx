import React, { useEffect } from 'react';
import globals from "../../../components/css/Toolbar.module.css"

type Props = {
  setShowEmployeePopUpForm: React.Dispatch<React.SetStateAction<boolean>>;  
  showEmployeePopUpForm: boolean;  
};

const ImportEmployeeToolBar = ({ setShowEmployeePopUpForm, showEmployeePopUpForm }: Props) => {
  
  useEffect(() => {
    document.getElementById('search')?.focus();
  });

  return ( 
    <div className={globals["toolbar"]}> 
      <div className={globals["toolbar-title"]}> 
        <span>Employees Import</span>
        </div> 
    </div>  
  );
};

export default ImportEmployeeToolBar;