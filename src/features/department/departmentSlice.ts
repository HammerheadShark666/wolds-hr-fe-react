import { createSlice, PayloadAction } from '@reduxjs/toolkit';  
import { fetchDepartments } from './departmentThunks';
import { Department } from '../../types/department';
 
// Define the initial state using that type
interface DepartmentState {
  departments: Department[]; 
  loading: boolean;
  error: string | null;
}

// Initial state of the slice
const initialState: DepartmentState = {
  departments: [], 
  loading: false,
  error: null
};
 
// Create the department slice
const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDepartments.fulfilled, (state, action: PayloadAction<Department[]>) => {
        state.loading = false;
        state.departments = action.payload;
        state.error = null;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch departments';
      })       
  }
});
 
export default departmentSlice.reducer;