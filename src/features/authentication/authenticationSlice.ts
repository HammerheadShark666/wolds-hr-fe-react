import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authenticationThunk';  

interface AuthenticationState { 
  token: string | null;
  profile: { firstName: string; lastName: string; email: string; } | null;
  status: string;
  loading: boolean;
  error: string | null;
  validationErrors: string[] | null;
  //hydrated: boolean;
}
 
const initialState: AuthenticationState = { 
  token: null,
  profile: null,
  status: 'idle',
  loading: false,
  error: null,
  validationErrors: null,
  //hydrated: false,
};
   
const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
      logout: (state) => {
        state.token = null;
        state.profile = null;
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
      },
      clearValidationErrors: (state) => {
        state.validationErrors = null;
      },
      setCredentials: (state, action) => { 
        state.token = action.payload.token;
        state.profile = action.payload.profile; 
        //state.hydrated = true;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          if (action.payload) {
            state.token = action.payload.token;
            state.profile = action.payload.profile;
          }
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.status = 'failed'; 
          state.validationErrors = (action.payload as string[]) || ['Failed to login'];
        });
    },
  });
  
  export const { logout, setCredentials, clearValidationErrors } = authenticationSlice.actions;

  export default authenticationSlice.reducer;