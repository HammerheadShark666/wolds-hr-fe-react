import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getImportedExistingEmployee, getImportedEmployee, importEmployees } from '../employee-import/employeeImportThunks';
import { PagedEmployees } from '../../types/employeeImported';
  
interface EmployeeImportState { 
  importedEmployees: PagedEmployees;
  importedExistingEmployees: PagedEmployees; 
  employeeImportId: number | null; 
  employeesErrorImporting: string[];   
  loading: boolean;
  error: string | null;
} 

const initialState: EmployeeImportState = {
 
  importedEmployees: {
    employees: [],
    page: 1,
    totalPages: 0,
    totalEmployees: 0,
  }, 
  importedExistingEmployees: {
    employees: [],
    page: 1,
    totalPages: 0,
    totalEmployees: 0,
  },  
  employeeImportId: null, 
  employeesErrorImporting: [],  
  loading: false,
  error: null,
};
 
const employeeImportSlice = createSlice({
  name: 'employeeImportSlice',
  initialState,
  reducers: {   
    setImportedEmployeesPage(state, action: PayloadAction<number>) {
      state.importedEmployees.page = action.payload;
    },
    setImportedExistingEmployeesPage(state, action: PayloadAction<number>) {
      state.importedExistingEmployees.page = action.payload;
    }, 
    clearValidationError: (state) => {
      state.error = null;
    }    
  },
  extraReducers: (builder) => {
    builder
      .addCase(importEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importEmployees.fulfilled, (state, action) => { 
        state.employeeImportId = action.payload.id; 
        state.loading = false;
      })
      .addCase(importEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })  
      .addCase(getImportedEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getImportedEmployee.fulfilled, (state, action) => {
        state.importedEmployees.employees = [...action.payload.employees];
        state.importedEmployees.totalPages = action.payload.totalPages;
        state.importedEmployees.totalEmployees = action.payload.totalEmployees;
        state.importedEmployees.page =  action.payload.page;
        state.loading = false;
      })
      .addCase(getImportedEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to get imported employees';
      })  
      .addCase(getImportedExistingEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getImportedExistingEmployee.fulfilled, (state, action) => {
        state.importedExistingEmployees.employees = [...action.payload.existingEmployees];
        state.importedExistingEmployees.totalPages = action.payload.totalPages;
        state.importedExistingEmployees.totalEmployees = action.payload.totalEmployees;
        state.importedExistingEmployees.page =  action.payload.page;
        state.loading = false;
      })
      .addCase(getImportedExistingEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to get imported existing employees';
      })   
      .addDefaultCase((state) => {
        // This is a catch-all for any actions that don't match
        // It can be used to reset state or handle unexpected actions
      });
  },
});

export const { setImportedEmployeesPage, setImportedExistingEmployeesPage, clearValidationError } = employeeImportSlice.actions
export default employeeImportSlice.reducer;