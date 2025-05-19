import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { importEmployees, searchImportedEmployees } from './employeeThunks';
import { Employee } from '../../types/employee'; 
 
interface EmployeeImportState {
  existingEmployees: Employee[];
  employeesImported: Employee[];
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
  employeesImported: [],
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
    clearImportedEmployees(state) {
      state.existingEmployees = [];
      state.employeesImported = [];
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
        state.employeesImported = [...action.payload.todaysImportedEmployees.employees];
        state.employeesErrorImporting = [...action.payload.employeesErrorImporting];
        state.totalPages = action.payload.todaysImportedEmployees.totalPages;
        state.totalImportedEmployees = action.payload.todaysImportedEmployees.totalEmployees;
        state.page =  action.payload.todaysImportedEmployees.page;
        state.importDate = new Date().toISOString(); 
        state.loading = false;
      })
      .addCase(importEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to import employees';
      })  
      .addCase(searchImportedEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchImportedEmployees.fulfilled, (state, action) => {
        state.employeesImported = [...action.payload.employees];
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
  },
});

export const { clearImportedEmployees, setImportSearchDate, setImportSearchPage } = employeeImportSlice.actions
export default employeeImportSlice.reducer;