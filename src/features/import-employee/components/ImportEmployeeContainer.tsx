'use client';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { clearImportedEmployees, clearValidationError } from '../importEmployeeSlice';
import { setImportEmployeeId } from '../../import-employee-history/importEmployeeHistorySlice';
import ToastErrors from '../../../components/ErrorToasts'; 
import { useLocation, useNavigate } from 'react-router-dom';
import ImportEmployeeToolBar from './ImportEmployeeToolBar';
import { NAVIGATION } from '../../../helpers/constants';
import styles from "../css/Import-employee.module.css";
import globals from "../../../components/css/Toolbar.module.css"
import { importEmployees } from '../importEmployeeThunks';
import { formatDateTime } from '../../../helpers/dateHelper';

const ImportEmployeeContainer = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null); 
  const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);
  const { importedEmployees, loading, error, validationErrors } = useSelector((state: RootState) => state.importEmployee); 
  const importEmployeeHistoryDate = formatDateTime(importedEmployees?.date);

  useEffect(() => { 
    dispatch(clearImportedEmployees());
  }, [dispatch, location.pathname]);
  

  const handleClick = () => {
    if (!importedEmployees?.id) return;

    dispatch(clearImportedEmployees());
    dispatch(setImportEmployeeId(importedEmployees.id));
    navigate(NAVIGATION.IMPORT_EMPLOYEES_HISTORY, { state: { id: importedEmployees.id } });
  };
 
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

  return (
    <div className="">
      <ToastErrors errors={validationErrors} error={error} onClear={() => dispatch(clearValidationError())} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ImportEmployeeToolBar setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} />
          
          {!importedEmployees?.id && (
            <div className={styles["import-employees-instructions"]}>
              <span>To import employees, click the Import Employees button below and select a CSV file. The file should use commas (,) to separate values.</span>
              <span>The first line should be the header</span>
              <span><b>Id,Surname,FirstName,DateOfBirth,HireDate,Department,Email,PhoneNumber</b></span>
              <span>Ensure the CSV includes the required columns: Surname and first name.</span> 
              <span>After uploading, the system will process the file and display a summary of imported, existing, and failed records.</span>              
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
           )}
          
          {importedEmployees?.id && ( 
            <div className={styles["import-employees-summary"]}>
              <span className={styles.date}>
                Imported employees at {importEmployeeHistoryDate}
              </span>
              <div className={styles.stats}>
                <p>
                  <strong>Imported:</strong> {importedEmployees.importedEmployeesCount}
                </p>
                <p>
                  <strong>Existing:</strong> {importedEmployees.importedEmployeesExistingCount}
                </p>
                <p>
                  <strong>Failed:</strong> {importedEmployees.importedEmployeesErrorsCount}
                </p>
              </div>
              <button className={styles.button} onClick={handleClick}>
                Import Details
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImportEmployeeContainer;