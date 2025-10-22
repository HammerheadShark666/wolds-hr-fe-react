import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance'; 
import { handleError } from '../../helpers/errorHandlingHelper';
 
export const importEmployees = createAsyncThunk('employee/import',
  async ({ file }: { file: File }, { rejectWithValue, dispatch }) => {
  
    try 
    {     
      const formData = new FormData();
      formData.append('importFile', file); 

      const response = await axiosInstance.post(`/import/employees`, formData);

      return response.data; 
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
  }
);