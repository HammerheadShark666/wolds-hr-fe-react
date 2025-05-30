import { createAsyncThunk } from '@reduxjs/toolkit'; 
import axiosInstance from '../../api/axiosInstance';
import { LoginResponse } from '../../types/loginResponse'; 
import { LoginRequest } from '../../types/loginRequest';
import { handleError } from '../../helpers/errorHandlingHelper';
 
export const login = createAsyncThunk('auth/login',
  async (loginRequest: LoginRequest, { rejectWithValue, dispatch }) => {

  try 
  {

    console.log("API base URL:", window.env?.REACT_APP_API_URL);

    const response = await axiosInstance.post<LoginResponse>('/login', loginRequest); 
    return response.data;

  } catch (error: any) {    
    console.error(error); 
    return handleError(error, rejectWithValue); 
  }
});  

export const checkAuthentication = createAsyncThunk('auth/me', async () => {
  return await axiosInstance.get('/authentication/me').then(res => res.data);
});
  
export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, { getState }) => { 
    const res = await axiosInstance.post('/refresh-token', {  
    });
    return res.data;
  }
); 

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { getState }) => { 
    const res = await axiosInstance.post('/logout', {});
    return res.data;
  }
);