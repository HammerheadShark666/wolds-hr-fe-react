import { createSlice } from '@reduxjs/toolkit';  
import { updateEmployeePhoto } from './employeeThunks';
  
interface EmployeePhotoState {  
  loading: boolean;
  error: string | null;
  validationErrors: string[] | null;
}
 
const initialState: EmployeePhotoState = {  
  loading: false,
  error: null,
  validationErrors: null
};
  
const employeePhotoSlice = createSlice({
  name: 'employeePhoto',
  initialState,
  reducers: {  
    clearValidationErrors: (state) => {
      state.validationErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder      
      .addCase(updateEmployeePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployeePhoto.fulfilled, (state, action) => {  
        state.loading = false;
      })
      .addCase(updateEmployeePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to save employee photo';
      });
  }
});

export const { clearValidationErrors } = employeePhotoSlice.actions;
export default employeePhotoSlice.reducer;