import { createAsyncThunk } from '@reduxjs/toolkit'; 
import axiosInstance from '../../api/axiosInstance';
import { LoginResponse } from '../../types/response/loginResponse'; 
import { LoginRequest } from '../../types/request/loginRequest';
import { handleError } from '../../helpers/errorHandlingHelper';
import axios from 'axios';
 
export const login = createAsyncThunk('auth/login', async (loginRequest: LoginRequest, { rejectWithValue, dispatch }) => {
  try 
  { 
    const response = await axiosInstance.post<LoginResponse>('/login', loginRequest); 
    return response.data;

  } catch (error: any) {    
    console.error(error); 
    return handleError(error, rejectWithValue); 
  }
});  

export const checkAuthentication = createAsyncThunk('auth/me', async (_, thunkAPI) => { 
  try {
      return await axiosInstance.get('/authentication/me').then(res => res.data);       
    } catch (error: any) { 
      if (error.response?.status === 401 || error.response?.status === 403) {
        try {
          await thunkAPI.dispatch(refreshToken()).unwrap(); 
          const retryResponse = await axios.get('/api/v1/authentication/me', { withCredentials: true });
          return retryResponse.data;
        } catch {
          return thunkAPI.rejectWithValue('Not authenticated');
        }
      }
      return thunkAPI.rejectWithValue('Not authenticated');
    }
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