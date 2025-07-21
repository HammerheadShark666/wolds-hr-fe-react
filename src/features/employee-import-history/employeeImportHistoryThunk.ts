import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance"; 
import { ApiEmployeePagingResponse, ApiExistingEmployeePagingResponse, EmployeeImportHistory } from "../../types/employeeImported";
import { handleError } from "../../helpers/errorHandlingHelper";
 
export const getImportedEmployeeHistory = createAsyncThunk<EmployeeImportHistory[]>
  ('get/imported/employees/history/records', async () => {
    try     
    {
      const response = await axiosInstance.get(`/employees-import`)
      return response.data;
    } 
    catch (error: any) 
    { 
     throw error;
    }
}); 

export const getImportedEmployeesHistory = createAsyncThunk<ApiEmployeePagingResponse, { id: string, page: number, pageSize: number }>
  ('get/imported/employees/history', async ({ id, page, pageSize } , { rejectWithValue }) => {
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

export const getImportedExistingEmployeesHistory = createAsyncThunk<ApiExistingEmployeePagingResponse, { id: string, page: number, pageSize: number }>
  ('get/imported/existing-employees/history', async ({ id, page, pageSize } , { rejectWithValue }) => {
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