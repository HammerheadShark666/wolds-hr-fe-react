import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance"; 
import { ApiEmployeePagingResponse, ApiErrorEmployeePagingResponse, ApiExistingEmployeePagingResponse, ImportedEmployees, ImportEmployeeHistory } from "../../types/importEmployee";
import { handleError } from "../../helpers/errorHandlingHelper";
 
export const getImportedEmployeeHistory = createAsyncThunk<ImportEmployeeHistory[]>
  ('get/import/employees/history', async () => {
    try     
    {
      const response = await axiosInstance.get(`/import/employees/history`)
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
      const response = await axiosInstance.get(`/import/employees/history/imported?id=${id}&page=${page}&pageSize=${pageSize}`)
      return response.data;
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
});

export const getImportedEmployeesExistingHistory = createAsyncThunk<ApiExistingEmployeePagingResponse, { id: string, page: number, pageSize: number }>
  ('get/imported/existing-employees/history', async ({ id, page, pageSize } , { rejectWithValue }) => {
    try     
    {
      const response = await axiosInstance.get(`/import/employees/history/existing?id=${id}&page=${page}&pageSize=${pageSize}`)
      return response.data;
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
});

export const getImportedEmployeesErrorHistory = createAsyncThunk<ApiErrorEmployeePagingResponse, { id: string, page: number, pageSize: number }>
  ('get/imported/error-employees/history', async ({ id, page, pageSize } , { rejectWithValue }) => {
    try     
    {
      const response = await axiosInstance.get(`/import/employees/history/error?id=${id}&page=${page}&pageSize=${pageSize}`)
      return response.data;
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
});

export const getImportedEmployeeHistoryLatest = createAsyncThunk<ImportedEmployees[]>
  ('get/import/employees/history/latest', async () => {
    try     
    {
      const response = await axiosInstance.get(`/import/employees/history/latest`)
      return response.data;
    } 
    catch (error: any) 
    { 
     throw error;
    }
}); 