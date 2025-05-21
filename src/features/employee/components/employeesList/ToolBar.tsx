import React, { useEffect, useState } from 'react';
import styles from "../../css/Employee-list-toolbar.module.css";
import { Search } from 'lucide-react';
import EmployeePopupForm from '../employeeForm/EmployeePopupForm';
import { setSelectedEmployee } from '../../employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store'; 

type Props = {
  onSearch: (keyword: string) => void;
  setShowEmployeePopUpForm: React.Dispatch<React.SetStateAction<boolean>>;  
  showEmployeePopUpForm: boolean;  
};

const ToolBar = ({ onSearch, setShowEmployeePopUpForm, showEmployeePopUpForm }: Props) => {

  const { keyword } = useSelector((state: RootState) => state.employeeList);
  const dispatch = useDispatch<AppDispatch>();
  const [input, setInput] = useState(keyword);

  const handleSearchClick = () => {
    onSearch(input);
  };

  const handleAddEmployeeClick = () => { 
    dispatch(setSelectedEmployee(null));
    setShowEmployeePopUpForm(true);
  } 

  useEffect(() => {
    document.getElementById('search')?.focus();
  });

  return (
    <div className={styles["employee-list-header"]}>
      <div className={styles["toolbar"]}>
        <div className={styles["search-bar"]}>
          <input
            id="search"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
            className="border px-2 py-1 mr-2"
            placeholder="Search..."
          />
          <button onClick={handleSearchClick}><Search /></button>
        </div>
        <div className={styles["toolbar-buttons"]}>      
          <button type="button" onClick={handleAddEmployeeClick}>Add New Employee</button>    
        </div>
      </div>
      {showEmployeePopUpForm && <EmployeePopupForm setShowEmployeePopUpForm={setShowEmployeePopUpForm} />}
    </div>
  );
};

export default ToolBar;