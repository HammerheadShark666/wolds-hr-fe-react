import { createSlice, PayloadAction } from '@reduxjs/toolkit';  
import { fetchDepartments } from './departmentThunks';
import { Department } from '../../types/department';
  
interface DepartmentState {
  departments: Department[]; 
  loading: boolean;
  error: string | null;
}
 
const initialState: DepartmentState = {
  departments: [], 
  loading: false,
  error: null
};
  
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