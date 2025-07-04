import React, { useEffect, useState } from 'react';
import styles from "../css/Employee-list-toolbar.module.css";
import globals from "../../../components/css/Toolbar.module.css"
import { Search } from 'lucide-react';
import EmployeePopupForm from './EmployeePopupForm';
import { setSelectedEmployee } from '../employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';  

type Props = {
  onSearch: (keyword: string, departmentId: string) => void;
  setShowEmployeePopUpForm: React.Dispatch<React.SetStateAction<boolean>>;  
  showEmployeePopUpForm: boolean;  
};

const EmployeesToolBar = ({ onSearch, setShowEmployeePopUpForm, showEmployeePopUpForm }: Props) => {

  const { keyword } = useSelector((state: RootState) => state.employeeList);
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState(keyword);
  const [searchDepartment, setSearchDepartment] = useState('0');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchDepartment(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchText, searchDepartment);
  };

  const handleAddEmployeeClick = () => { 
    dispatch(setSelectedEmployee(null));
    setShowEmployeePopUpForm(true);
  } 

  useEffect(() => {
    document.getElementById('search')?.focus(); 
  });

  const departments = useSelector((state: RootState) =>
    state.department.departments
  );

  return (
    <div className={styles["employee-list-header"]}>
      <div className={globals["toolbar"]}>
        <div className={globals["toolbar-title"]}> 
         <span>Employees</span>
        </div>
        <div className={styles["search-bar"]}> 
          <select id="department" value={searchDepartment} onChange={handleChange} className={globals["select"]}>
            <option value="0">Select</option>
            {departments.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select> 
          <input
            id="search"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
            className="border px-2 py-1 mr-2"
            placeholder="Search..."
          />
          <button onClick={handleSearchClick}><Search /></button>
          <button type="button" onClick={handleAddEmployeeClick}>Add New Employee</button> 
        </div>
      </div>
      {showEmployeePopUpForm && <EmployeePopupForm setShowEmployeePopUpForm={setShowEmployeePopUpForm} />}
    </div>
  );
};

export default EmployeesToolBar;