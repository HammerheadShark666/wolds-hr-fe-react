'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import EmployeesToolBar from './EmployeesToolBar'; 
import { clearEmployees, setPage, setSearch } from '../employeeSearchSlice'; 
import { searchEmployeeRecords } from '../employeeThunks';
import Pagination from '../../../components/EmployeePagination';
import EmployeesTable from '../../../components/EmployeesTable';

const EmployeesContainer = () => {

  const pageSize : number = 5;
  const dispatch = useDispatch<AppDispatch>();
  const { employeesFound, loading, keyword } = useSelector((state: RootState) => state.employeeList);
  const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);
  const [departmentId, setDepartmentId] = useState('');
 
  const handleSearch = (keyword: string, departmentId: string) => { 

    if(departmentId !== '') {
       setDepartmentId(departmentId);
    } 

    if(keyword !== '' || departmentId !== '0') {
      dispatch(setSearch(keyword));
      dispatch(searchEmployeeRecords({ page: 1, keyword: keyword, departmentId: departmentId , pageSize: pageSize }));
    } else {
      dispatch(clearEmployees());
    } 
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber)); 
    dispatch(searchEmployeeRecords({ page: pageNumber, keyword: keyword, departmentId: departmentId, pageSize: pageSize }));  
  };

  return (
    <div className="p-4">
      <EmployeesToolBar onSearch={handleSearch} setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} />
      {loading ? 
        <p>Loading...</p> : 
        <EmployeesTable setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} rows={employeesFound.employees} />}
        <Pagination pagedEmployees={employeesFound} onPageChange={handlePageChange} title={"Employees"} />
    </div>
  );
};

export default EmployeesContainer;