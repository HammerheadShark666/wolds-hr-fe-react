import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getImportedEmployeeHistory,  getImportedEmployeesHistory, getImportedExistingEmployeesHistory } from "./employeeImportHistoryThunk";
import { EmployeeImportHistory, PagedEmployees } from "../../types/employeeImported";
 
interface EmployeeImportHistoryState { 
  employeeImportHistory: EmployeeImportHistory[];
  employeeImportHistoryId: string | null;
  employeeImportHistoryDate: string | null;  
  importedEmployeesHistory: PagedEmployees;
  importedExistingEmployeesHistory: PagedEmployees;  
  importedEmployeesErrorHistory: string[];   
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeImportHistoryState = {
  employeeImportHistory: [],
  importedEmployeesHistory: {
    employees: [],
    page: 1,
    totalPages: 0,
    totalEmployees: 0,
  }, 
  importedExistingEmployeesHistory: {
    employees: [],
    page: 1,
    totalPages: 0,
    totalEmployees: 0,
  }, 
  importedEmployeesErrorHistory: [], 
  employeeImportHistoryId: null,
  employeeImportHistoryDate: null, 
  loading: false,
  error: null,
};
 
const employeeImportHistorySlice = createSlice({
  name: 'employeeImportHistorySlice',
  initialState,
  reducers: {
    setEmployeeImportHistoryDate(state, action: PayloadAction<string | null>) {
      state.employeeImportHistoryDate = action.payload;
    },
    setImportedEmployeesHistoryPage(state, action: PayloadAction<number>) {
      state.importedEmployeesHistory.page = action.payload;
    },
    setImportedExistingEmployeesHistoryPage(state, action: PayloadAction<number>) {
      state.importedExistingEmployeesHistory.page = action.payload;
    },
    setEmployeeImportId(state, action: PayloadAction<string>) {
      state.employeeImportHistoryId = action.payload;
    },
    clearValidationError: (state) => {
      state.error = null;
    },
    clearImportedEmployeesHistory(state) {
      state.importedEmployeesHistory = {
        employees: [],
        page: 1,
        totalPages: 0,
        totalEmployees: 0,
      }; 
      state.importedExistingEmployeesHistory = {
        employees: [],
        page: 1,
        totalPages: 0,
        totalEmployees: 0,
      }; 
      state.employeeImportHistoryId = null;
      state.employeeImportHistoryDate = null; 
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getImportedEmployeeHistory.pending, (state) => {
      console.log('getImportedEmployeeHistory.pending reducer hit');
      state.loading = true;
      state.error = null;
    })
    .addCase(getImportedEmployeeHistory.fulfilled, (state, action) => {
      state.employeeImportHistory = [...action.payload];
      state.loading = false;
    })
    .addCase(getImportedEmployeeHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Failed to get imported employees';
    })
    .addCase(getImportedEmployeesHistory.fulfilled, (state, action) => {
      state.importedEmployeesHistory.employees = [...action.payload.employees];
      state.importedEmployeesHistory.totalPages = action.payload.totalPages;
      state.importedEmployeesHistory.totalEmployees = action.payload.totalEmployees;
      state.importedEmployeesHistory.page =  action.payload.page; 
      state.loading = false;
    })
    .addCase(getImportedEmployeesHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Failed to get imported employees';
    })  
    .addCase(getImportedEmployeesHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getImportedExistingEmployeesHistory.fulfilled, (state, action) => {
      state.importedExistingEmployeesHistory.employees = [...action.payload.existingEmployees];
      state.importedExistingEmployeesHistory.totalPages = action.payload.totalPages;
      state.importedExistingEmployeesHistory.totalEmployees = action.payload.totalEmployees;
      state.importedExistingEmployeesHistory.page =  action.payload.page; 
      state.loading = false;
    })
    .addCase(getImportedExistingEmployeesHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Failed to get imported existing employees';
    })   
  }
});

export const { setEmployeeImportId, setEmployeeImportHistoryDate, setImportedEmployeesHistoryPage, setImportedExistingEmployeesHistoryPage, clearImportedEmployeesHistory, clearValidationError } = employeeImportHistorySlice.actions
export default employeeImportHistorySlice.reducer;