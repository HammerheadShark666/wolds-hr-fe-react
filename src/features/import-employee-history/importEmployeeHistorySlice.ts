import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getImportedEmployeeHistory,  getImportedEmployeesHistory, getImportedEmployeesErrorHistory, getImportedEmployeesExistingHistory, getImportedEmployeeHistoryLatest } from "./importEmployeeHistoryThunk";
import { ImportedEmployees, ImportEmployeeHistory, PagedEmployees, PagedImportErrorEmployees } from "../../types/importEmployee";
 
interface ImportEmployeeHistoryState { 
  importEmployeeHistory: ImportEmployeeHistory[];
  importEmployeeHistoryId: string | null;
  importedEmployeesHistory: PagedEmployees;
  importedEmployeesExistingHistory: PagedEmployees;  
  importedEmployeesErrorHistory: PagedImportErrorEmployees;  
  importedEmployeesLatest: ImportedEmployees[]; 
  loading: boolean;
  error: string | null;
}

const initialState: ImportEmployeeHistoryState = {
  importedEmployeesLatest: [],
  importEmployeeHistory: [],
  importedEmployeesHistory: {
    employees: [],
    page: 1,
    totalPages: 0,
    totalEmployees: 0,
  }, 
  importedEmployeesExistingHistory: {
    employees: [],
    page: 1,
    totalPages: 0,
    totalEmployees: 0,
  }, 
  importedEmployeesErrorHistory: {
    employees: [],
    page: 1,
    totalPages: 0,
    totalEmployees: 0,
  },  
  importEmployeeHistoryId: null,
  loading: false,
  error: null,
};
 
const importEmployeeHistorySlice = createSlice({
  name: 'importEmployeeHistorySlice',
  initialState,
  reducers: {  
    setImportedEmployeesHistoryPage(state, action: PayloadAction<number>) {
      state.importedEmployeesHistory.page = action.payload;
    }, 
    setImportedEmployeesExistingHistoryPage(state, action: PayloadAction<number>) {
      state.importedEmployeesExistingHistory.page = action.payload;
    },
    setImportEmployeeId(state, action: PayloadAction<string>) {
      state.importEmployeeHistoryId = action.payload;
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
      state.importedEmployeesExistingHistory = {
        employees: [],
        page: 1,
        totalPages: 0,
        totalEmployees: 0,
      };
      state.importedEmployeesErrorHistory = {
        employees: [],
        page: 1,
        totalPages: 0,
        totalEmployees: 0,
      }; 
      state.importEmployeeHistoryId = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getImportedEmployeeHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getImportedEmployeeHistory.fulfilled, (state, action) => {
      state.importEmployeeHistory = [...action.payload];
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
    .addCase(getImportedEmployeesExistingHistory.fulfilled, (state, action) => {
      state.importedEmployeesExistingHistory.employees = [...action.payload.employees];
      state.importedEmployeesExistingHistory.totalPages = action.payload.totalPages;
      state.importedEmployeesExistingHistory.totalEmployees = action.payload.totalEmployees;
      state.importedEmployeesExistingHistory.page =  action.payload.page; 
      state.loading = false;
    })
    .addCase(getImportedEmployeesExistingHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Failed to get imported existing employees';
    })   
    .addCase(getImportedEmployeesErrorHistory.fulfilled, (state, action) => {
      state.importedEmployeesErrorHistory.employees = [...action.payload.employees];
      state.importedEmployeesErrorHistory.totalPages = action.payload.totalPages;
      state.importedEmployeesErrorHistory.totalEmployees = action.payload.totalEmployees;
      state.importedEmployeesErrorHistory.page =  action.payload.page; 
      state.loading = false;
    })
    .addCase(getImportedEmployeesErrorHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Failed to get imported error employees';
    })   
    .addCase(getImportedEmployeeHistoryLatest.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getImportedEmployeeHistoryLatest.fulfilled, (state, action) => {
      state.importedEmployeesLatest = [...action.payload];
      state.loading = false;
    })
    .addCase(getImportedEmployeeHistoryLatest.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Failed to get latest imported employees';
    })        
  }
});

export const { setImportEmployeeId, setImportedEmployeesHistoryPage, setImportedEmployeesExistingHistoryPage, clearImportedEmployeesHistory, clearValidationError } = importEmployeeHistorySlice.actions
export default importEmployeeHistorySlice.reducer;