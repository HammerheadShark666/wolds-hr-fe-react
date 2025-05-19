import { createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from '../../api/axiosInstance';
import { LoginResponse } from '../../types/loginResponse'; 
import { LoginRequest } from '../../types/loginRequest';
import { handleError } from '../../helpers/errorHandlingHelper';
 
export const loginUser = createAsyncThunk('auth/loginUser',
  async (loginRequest: LoginRequest, { rejectWithValue, dispatch }) => {

  try 
  {
    const response = await axios.post<LoginResponse>('/login', loginRequest);

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('profile', JSON.stringify(response.data.profile));

    return response.data;

  } catch (error: any) {    
    console.error(error); 
    return handleError(error, rejectWithValue); 
  }
});