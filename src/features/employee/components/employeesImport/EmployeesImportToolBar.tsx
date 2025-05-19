import React, { useEffect, useRef } from 'react';
import styles from "../../css/Employee-list-toolbar.module.css";
// import { Search } from 'lucide-react';
// import EmployeePopupForm from '../employeeForm/EmployeePopupForm';
// import { setSelectedEmployee } from '../../employeeSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { importEmployees } from '../../employeeThunks';

type Props = {
  onSearch: (importDate: string) => void;
  setShowEmployeePopUpForm: React.Dispatch<React.SetStateAction<boolean>>;  
  showEmployeePopUpForm: boolean;  
};

const EmployeesImportToolBar = ({ onSearch, setShowEmployeePopUpForm, showEmployeePopUpForm }: Props) => {

 // const { keyword } = useSelector((state: RootState) => state.employeeList);
  const dispatch = useDispatch<AppDispatch>();


 // const [input, setInput] = useState(keyword);

  // const handleSearchClick = () => {
  //   onSearch(input);
  // };

  // const handleAddEmployeeClick = () => { 
  //   dispatch(setSelectedEmployee(null));
  //   setShowEmployeePopForm(true);
  // }
 

 
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
        {/* <div className={styles["search-bar"]}>
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
        </div> */}
        <div className={styles["toolbar-buttons"]}>      
          {/* <button type="button" onClick={handleAddEmployeeClick}>Add New Employee</button>    */}
          <button type="button" onClick={handleImportEmployeesClick}>Import Employees</button>
          <input
              type="file"
              ref={fileInputRef} 
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />   
        </div>
      </div>
      {/* {showEmployeePopForm && <EmployeePopupForm setShowEmployeePopForm={setShowEmployeePopForm} />} */}
    </div>
  );
};

export default EmployeesImportToolBar;