import { createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '../../types/employee';
import axiosInstance from '../../api/axiosInstance'; 
import { handleError } from '../../helpers/errorHandlingHelper';
 
type ApiEmployeePagingResponse = {
  employees: Employee[]
  page: number
  totalPages: number
  totalEmployees: number
}  

export const importEmployees = createAsyncThunk('employee/import',
  async ({ file }: { file: File }, { rejectWithValue, dispatch }) => {
  
    try 
    {     
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post(`/employees-import`, formData, {
        headers: {
          'Content-Type': undefined
        }
      });  

      await dispatch(getImportedEmployee({ id: response.data.employeeImportId, page: 1, pageSize: 5 }));

      return response.data; 
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
  }
);

export const getImportedEmployee = createAsyncThunk<ApiEmployeePagingResponse, { id: number, page: number, pageSize: number }>
  ('get/imported/employees', async ({ id, page, pageSize } , { rejectWithValue }) => {
    try     
    {
      const response = await axiosInstance.get(`/employees-import/employees?id=${id}&page=${page}&pageSize=${pageSize}`)
      return response.data;
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
});
  
export const searchImportedEmployees = createAsyncThunk<ApiEmployeePagingResponse, { importDate: string; page: number, pageSize: number }>
  ('search/searchImportedRecords', async ({ importDate, page, pageSize } , { rejectWithValue }) => {
    try     
    {
      const response = await axiosInstance.get(`/employees/imported?importDate=${importDate.split('T')[0]}&page=${page}&pageSize=${pageSize}`)
      return response.data;
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
});