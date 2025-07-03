'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { AppDispatch, RootState } from '../../../app/store';
import EmployeesImportToolBar from './EmployeesImportToolBar';
import { clearImportedEmployees, setImportedEmployeesPage, setImportedExistingEmployeesPage, setImportSearchDate, clearValidationError } from '../employeeImportSlice';
import { getImportedEmployee, getImportedExistingEmployee } from '../employeeImportThunks'; //, searchImportedEmployees
import Pagination from '../../../components/Pagination';
import EmployeesTable from '../../../components/EmployeesTable';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import styles from "../css/Employee-import.module.css"; 
import ToastErrors from '../../../components/ErrorToasts';
     
const EmployeesImportContainer = () => {

  const pageSize : number = 5;
  const dispatch = useDispatch<AppDispatch>();
  const { employeeImportId, importedEmployees, importedExistingEmployees,  loading, error } = useSelector((state: RootState) => state.employeeImport);

  const [activeTab, setActiveTab] = useState("imported-employees");

//employeesImported, existingEmployees, totalPages, totalImportedEmployees, page,

  const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);
 
  const handleSearch = (importDate: string) => { 
  //  if(importDate !== null) {
  //     dispatch(setImportSearchDate(importDate));
  //     if(employeeImportId !== null) {
  //       dispatch(getImportedEmployee({ page: 1, id: employeeImportId, pageSize: pageSize }));
  //       dispatch(getImportedExistingEmployee({ id: employeeImportId, page: 1, pageSize: pageSize }));
  //     } 
  //   } else {
  //     dispatch(clearImportedEmployees());
  //   }
  };

  const handlePageChangeImportedEmployees = async (pageNumber: number) => {
    dispatch(setImportedEmployeesPage(pageNumber)); 
    if(employeeImportId !== null) {
      await dispatch(getImportedEmployee({ page: pageNumber, id: employeeImportId, pageSize: pageSize })); 
    }
  };

  const handlePageChangeImportedExistingEmployees = async (pageNumber: number) => {
    dispatch(setImportedExistingEmployeesPage(pageNumber)); 
    if(employeeImportId !== null) { 
      await dispatch(getImportedExistingEmployee({ id: employeeImportId, page: pageNumber, pageSize: pageSize }));
    }
  };

  return (
    <div className="p-4"> 
      <ToastErrors error={error} onClear={() => dispatch(clearValidationError())} /> 
      {loading ? 
        <p>Loading...</p> :        
          <>         
            <EmployeesImportToolBar onSearch={handleSearch} setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} />     
            <Tabs className={styles["employee-import-tabs"]} value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger className={styles["employee-import-tab"]} value="imported-employees">Imported Employees</TabsTrigger>
                <TabsTrigger className={styles["employee-import-tab"]} value="existing-employees">Existing Employees</TabsTrigger>
                <TabsTrigger className={styles["employee-import-tab"]} value="failed-employees">Failed Imports</TabsTrigger>
              </TabsList>
              <TabsContent value="imported-employees">
                <EmployeesTable setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} rows={importedEmployees.employees} />
                <Pagination totalPages={importedEmployees.totalPages} totalRecords={importedEmployees.totalEmployees} currentPage={importedEmployees.page} onPageChange={handlePageChangeImportedEmployees} title={"Imported Employees"} />
              </TabsContent>
              <TabsContent value="existing-employees">
                <EmployeesTable setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} rows={importedExistingEmployees.employees} />
                <Pagination totalPages={importedExistingEmployees.totalPages} totalRecords={importedExistingEmployees.totalEmployees} currentPage={importedExistingEmployees.page} onPageChange={handlePageChangeImportedExistingEmployees} title={"Imported Existing Employees"} />
              </TabsContent>
              <TabsContent value="failed-employees">failed-employees</TabsContent>   
            </Tabs>          
         </> 
      }
      </div>
  );
};

export default EmployeesImportContainer;