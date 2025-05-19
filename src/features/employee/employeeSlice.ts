import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 
import { Employee } from '../../types/employee';
import { addEmployee, updateEmployee } from './employeeThunks'; 

interface EmployeeState { 
  selectedEmployee: Employee | null;
  employeePhotoFilename: string | null;
  loading: boolean;
  error: string | null;
  validationErrors: string[] | null;
}
 
const initialState: EmployeeState = { 
  selectedEmployee: null,
  employeePhotoFilename: null,
  loading: false,
  error: null,
  validationErrors: null
};
  
const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: { 
    setSelectedEmployee: (state, action: PayloadAction<Employee | null>) => { 
      state.selectedEmployee = action.payload;
    },
    clearValidationErrors: (state) => {
      state.validationErrors = null;
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
      state.employeePhotoFilename = null;
    }
  },
  extraReducers: (builder) => {
    builder     
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false; 
        state.selectedEmployee = null;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.validationErrors = (action.payload as string[]) || ['Failed to add employee'];
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;  
        state.selectedEmployee = null;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.validationErrors = (action.payload as string[]) || ['Failed to update employee'];
      })     
  }
});

export const { setSelectedEmployee, clearValidationErrors, clearSelectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;