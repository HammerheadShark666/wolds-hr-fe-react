import { createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '../../types/employee';
import axios from '../../api/axiosInstance'; 
import { updateEmployeeInEmployees, addEmployeeToEmployees, updateEmployeePhotoInEmployees, removeEmployeeFromEmployees } from '../employee/employeeListSlice'
import { handleError } from '../../helpers/errorHandlingHelper';
 
type ApiEmployeePagingResponse = {
  employees: Employee[]
  page: number
  totalPages: number
  totalEmployees: number
}
 
export const searchEmployeeRecords = createAsyncThunk<ApiEmployeePagingResponse, { keyword: string; page: number, pageSize: number }>
  ('search/searchRecords', async ({ keyword, page, pageSize } , { rejectWithValue }) => {
    try     
    {
      const response = await axios.get(`/employees/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}`)
      return response.data;
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
})
   
export const addEmployee = createAsyncThunk('employee/addEmployee',
  async (employee: Employee, { rejectWithValue, dispatch }) => {
  
    try     
    { 
      const response = await axios.post( '/employees/add', employee);
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
      const response = await axios.put( '/employees/update', employee);
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
      const response = await axios.delete('/employees/' + employeeId);  
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

      const response = await axios.post(`/employees/upload-photo/${id}`, formData); 

      dispatch(updateEmployeePhotoInEmployees(response.data));
      return response.data; 
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
  }
);

export const importEmployees = createAsyncThunk('employee/import',
  async ({ file }: { file: File }, { rejectWithValue, dispatch }) => {
  
    try 
    {     
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`/employees/import`, formData, {
        headers: {
          'Content-Type': undefined
        }
      }); 

      //dispatch(employeeImported(response.data));

      console.log(response.data)

      return response.data; 
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
  }
);
  
export const searchImportedEmployees = createAsyncThunk<ApiEmployeePagingResponse, { importDate: string; page: number, pageSize: number }>
  ('search/searchImportedRecords', async ({ importDate, page, pageSize } , { rejectWithValue }) => {
    try     
    {
      const response = await axios.get(`/employees/imported?importDate=${importDate.split('T')[0]}&page=${page}&pageSize=${pageSize}`)
      return response.data;
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
})

