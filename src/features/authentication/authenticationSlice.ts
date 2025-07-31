import { createSlice } from '@reduxjs/toolkit';
import { checkAuthentication, login } from './authenticationThunk';  

interface AuthenticationState {  
  profile: { firstName: string; lastName: string; username: string; } | null;
  status: string;
  loading: boolean;
  error: string | null;
  validationErrors: string[] | null; 
}
 
const initialState: AuthenticationState = {  
  profile: null,
  status: 'idle',
  loading: false,
  error: null,
  validationErrors: null 
};
   
const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: { 
      clearValidationErrors: (state) => {
        state.validationErrors = null;
      },
      setCredentials: (state, action) => {  
        state.profile = action.payload.profile;  
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.status = 'succeeded';
          if (action.payload) { 
            state.profile = action.payload.profile; 
          }
        })
        .addCase(login.rejected, (state, action) => {
          state.status = 'failed'; 
          state.validationErrors = (action.payload as string[]) || ['Failed to login'];
        }) 
        .addCase(checkAuthentication.fulfilled, (state, action) => {
          state.profile = action.payload.profile;
        }); 
      },
  });
  
  export const { setCredentials, clearValidationErrors } = authenticationSlice.actions;

  export default authenticationSlice.reducer;