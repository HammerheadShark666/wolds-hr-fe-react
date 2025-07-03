import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance"; 


type EmployeeImportHistory = {
  id: number
  date: string
}   

export const getImportedEmployeeHistory = createAsyncThunk<EmployeeImportHistory[]>
  ('get/imported/employees/history', async () => {
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