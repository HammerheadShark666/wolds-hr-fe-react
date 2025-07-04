import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance'; 
import { handleError } from '../../helpers/errorHandlingHelper';
import { ApiEmployeePagingResponse, ApiExistingEmployeePagingResponse } from '../../types/employeeImported';
 
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

      await dispatch(getImportedEmployee({ id: response.data.id, page: 1, pageSize: 5 }));
      await dispatch(getImportedExistingEmployee({ id: response.data.id, page: 1, pageSize: 5 }));

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

export const getImportedExistingEmployee = createAsyncThunk<ApiExistingEmployeePagingResponse, { id: number, page: number, pageSize: number }>
  ('get/imported/existing-employees', async ({ id, page, pageSize } , { rejectWithValue }) => {
    try     
    {
      const response = await axiosInstance.get(`/employees-import/existing-employees?id=${id}&page=${page}&pageSize=${pageSize}`)
      return response.data;
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
});