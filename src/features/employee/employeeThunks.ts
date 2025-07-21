import { createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '../../types/employee';
import axiosInstance from '../../api/axiosInstance'; 
import { updateEmployeeInEmployees, addEmployeeToEmployees, updateEmployeePhotoInEmployees, removeEmployeeFromEmployees } from './employeeSearchSlice'
import { handleError } from '../../helpers/errorHandlingHelper';
 
type ApiEmployeePagingResponse = {
  employees: Employee[]
  page: number
  totalPages: number
  totalEmployees: number
} 

export const searchEmployeeRecords = createAsyncThunk<ApiEmployeePagingResponse, { keyword: string; departmentId: string, page: number, pageSize: number }>
('search/searchRecords', async ({ keyword, departmentId, page, pageSize } , { rejectWithValue }) => {
    try     
    {
      let url = `/employees/search?keyword=${keyword}&departmentId=${departmentId}&page=${page}&pageSize=${pageSize}`;

      if(departmentId === '0')
        url = `/employees/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}`;

      const response = await axiosInstance.get(url)
      return response.data;
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
});
   
export const addEmployee = createAsyncThunk('employee/addEmployee',
  async (employee: Employee, { rejectWithValue, dispatch }) => {
  
    try     
    { 
      const response = await axiosInstance.post( '/employees/add', employee);
      dispatch(addEmployeeToEmployees(response.data));
      return response.data; 
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
  }
);

export const updateEmployee = createAsyncThunk('employee/updateEmployee',
  async (employee: Employee, { rejectWithValue, dispatch }) => {
  
    try 
    {      
      const response = await axiosInstance.put( '/employees/update', employee);
      dispatch(updateEmployeeInEmployees(response.data));
      return response.data; 
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
  }
);

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee',
  async (employeeId: number, { rejectWithValue, dispatch }) => {

    try {          
      const response = await axiosInstance.delete('/employees/' + employeeId);  
      dispatch(removeEmployeeFromEmployees(employeeId));    
      return response.data; 
    } 
    catch (error: any) 
    {  
      return handleError(error, rejectWithValue);  
    }
  }
);  

export const updateEmployeePhoto = createAsyncThunk('employee/updateEmployeePhoto',
  async ({ id, file }: { id: number; file: File }, { rejectWithValue, dispatch }) => {
  
    try 
    {      
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post(`/employees/upload-photo/${id}`, formData); 

      dispatch(updateEmployeePhotoInEmployees(response.data));
      return response.data; 
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
  }
);