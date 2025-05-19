'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import ToolBar from './ToolBar'; 
import { clearEmployees, setPage, setSearch } from '../../employeeListSlice'; 
import { searchEmployeeRecords } from '../../employeeThunks';
import ErrorToast from '../../../../components/ErrorToasts';  
import Pagination from '../../../../components/Pagination';
import EmployeesTable from '../../../../components/EmployeesTable';

const EmployeesContainer = () => {

  const pageSize : number = 5;
  const dispatch = useDispatch<AppDispatch>();
  const { employees, totalPages, totalEmployees, page, loading, keyword, error } = useSelector((state: RootState) => state.employeeList);
  const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);
 
  const handleSearch = (keyword: string) => { 
   if(keyword !== '') {
      dispatch(setSearch(keyword));
      dispatch(searchEmployeeRecords({ page: 1, keyword: keyword, pageSize: pageSize }));
    } else {
      dispatch(clearEmployees());
    }
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
    dispatch(searchEmployeeRecords({ page: pageNumber, keyword: keyword, pageSize: pageSize }));
  };

  return (
    <div className="p-4">
      <ErrorToast error={error} /> 
      <ToolBar onSearch={handleSearch} setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} />
      {loading ? 
        <p>Loading...</p> : 
        <EmployeesTable setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} rows={employees} />}
      <Pagination totalPages={totalPages} totalRecords={totalEmployees} currentPage={page} onPageChange={handlePageChange} title={"Employees"} />
    </div>
  );
};

export default EmployeesContainer;