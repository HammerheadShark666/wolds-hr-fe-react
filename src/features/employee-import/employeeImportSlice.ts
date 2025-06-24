import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getImportedEmployee, importEmployees, searchImportedEmployees } from '../employee-import/employeeImportThunks';
import { Employee } from '../../types/employee'; 
 
interface EmployeeImportState {
  existingEmployees: Employee[];
  employeesImported: Employee[]; // This is not used in the current code, but can be used if needed
  employeeImportId: number | null;
  employeesErrorImporting: string[]; 
  totalPages: number;
  totalImportedEmployees: number;
  page: number;
  importDate: string | null;
  loading: boolean;
  error: string | null;
} 

const initialState: EmployeeImportState = {
  existingEmployees: [],
  employeesImported: [], // This is not used in the current code, but can be used if needed
  employeeImportId: null,
  employeesErrorImporting: [],
  totalPages: 0,
  totalImportedEmployees: 0,
  page: 1,
  importDate: null,
  loading: false,
  error: null,
};
 
const employeeImportSlice = createSlice({
  name: 'employeeImportSlice',
  initialState,
  reducers: {  
    setImportSearchDate(state, action: PayloadAction<string>) {
      state.importDate = action.payload;
      state.page = 1;
    },
    setImportSearchPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clearValidationError: (state) => {
      state.error = null;
    },
    clearImportedEmployees(state) {
      state.existingEmployees = [];
      state.employeeImportId = null;
      state.employeesErrorImporting = [];
      state.totalPages = 0;
      state.totalImportedEmployees = 0;
      state.page = 1;
      state.importDate = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(importEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importEmployees.fulfilled, (state, action) => {
        state.existingEmployees = [...action.payload.existingEmployees];
        state.employeeImportId = action.payload.employeeImportId;
        state.employeesErrorImporting = [...action.payload.employeesErrorImporting]; 
        state.importDate = new Date().toISOString(); 
        state.loading = false;
      })
      .addCase(importEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })  
      .addCase(searchImportedEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchImportedEmployees.fulfilled, (state, action) => { 
        state.totalPages = action.payload.totalPages;
        state.totalImportedEmployees = action.payload.totalEmployees;
        state.page =  action.payload.page;
        state.importDate = new Date().toISOString(); 
        state.loading = false;
      })
      .addCase(searchImportedEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to import employees';
      })  

      .addCase(getImportedEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getImportedEmployee.fulfilled, (state, action) => {
        state.employeesImported = [...action.payload.employees];
        state.totalPages = action.payload.totalPages;
        state.totalImportedEmployees = action.payload.totalEmployees;
        state.page =  action.payload.page;
        state.importDate = new Date().toISOString(); 
        state.loading = false;
      })
      .addCase(getImportedEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to get imported employees';
      })  

      .addDefaultCase((state) => {
        // This is a catch-all for any actions that don't match
        // It can be used to reset state or handle unexpected actions
      });
  },
});

export const { clearImportedEmployees, setImportSearchDate, setImportSearchPage, clearValidationError } = employeeImportSlice.actions
export default employeeImportSlice.reducer;