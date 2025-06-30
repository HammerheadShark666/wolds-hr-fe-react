'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { AppDispatch, RootState } from '../../../app/store';
import EmployeesImportToolBar from './EmployeesImportToolBar';
import { clearImportedEmployees, setImportSearchPage, setImportSearchDate, clearValidationError } from '../employeeImportSlice';
import { getImportedEmployee, searchImportedEmployees } from '../employeeImportThunks';
import Pagination from '../../../components/Pagination';
import EmployeesTable from '../../../components/EmployeesTable';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import styles from "../css/Employee-import.module.css"; 
import ToastErrors from '../../../components/ErrorToasts';
     
const EmployeesImportContainer = () => {

  const pageSize : number = 5;
  const dispatch = useDispatch<AppDispatch>();
  const { employeeImportId, employeesImported, totalPages, totalImportedEmployees, page, loading, error } = useSelector((state: RootState) => state.employeeImport);
  const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);
 
  const handleSearch = (importDate: string) => { 
   if(importDate !== null) {
      dispatch(setImportSearchDate(importDate));
      dispatch(searchImportedEmployees({ page: 1, importDate: importDate, pageSize: pageSize }));
    } else {
      dispatch(clearImportedEmployees());
    }
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(setImportSearchPage(pageNumber)); 
    if(employeeImportId !== null) {
      dispatch(getImportedEmployee({ page: pageNumber, id: employeeImportId, pageSize: pageSize }));
    }
  };

  return (
    <div className="p-4"> 
      <ToastErrors error={error} onClear={() => dispatch(clearValidationError())} /> 
      {loading ? 
        <p>Loading...</p> :        
          <>         
            <EmployeesImportToolBar onSearch={handleSearch} setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} />     
            <Tabs className={styles["employee-import-tabs"]} defaultValue="imported-employees">
              <TabsList>
                <TabsTrigger className={styles["employee-import-tab"]} value="imported-employees">Imported Employees</TabsTrigger>
                <TabsTrigger className={styles["employee-import-tab"]} value="existing-employees">Existing Employees</TabsTrigger>
                <TabsTrigger className={styles["employee-import-tab"]} value="failed-employees">Failed Imports</TabsTrigger>
              </TabsList>
              <TabsContent value="imported-employees">
                <EmployeesTable setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} rows={employeesImported} />
                <Pagination totalPages={totalPages} totalRecords={totalImportedEmployees} currentPage={page} onPageChange={handlePageChange} title={"Imported Employees"} />
              </TabsContent>
              <TabsContent value="existing-employees">existing-employees</TabsContent>
              <TabsContent value="failed-employees">failed-employees</TabsContent>   
            </Tabs>          
         </> 
      }
      </div>
  );
};

export default EmployeesImportContainer;