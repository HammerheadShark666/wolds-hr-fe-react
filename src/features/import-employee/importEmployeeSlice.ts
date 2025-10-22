import { createSlice } from '@reduxjs/toolkit';
import { importEmployees } from './importEmployeeThunks';
import { ImportedEmployees } from '../../types/importEmployee';

interface importedEmployeesState {
  importedEmployees: ImportedEmployees;
  loading: boolean;
  error: string | null;
  validationErrors: string[] | null;
} 

const initialState: importedEmployeesState = { 
  importedEmployees: {
    id: '',
    date: '',
    importedEmployeesCount: 0,
    importedEmployeesExistingCount: 0,
    importedEmployeesErrorsCount: 0,
  },
  loading: false,
  error: null,
  validationErrors: null,
};
 
const importEmployeeSlice = createSlice({
  name: 'importEmployeeSlice',
  initialState,
  reducers: {
    clearImportedEmployees: (state) => {
      state.importedEmployees =  initialState.importedEmployees;;
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
        state.importedEmployees.id = action.payload.id; 
        state.importedEmployees.date = action.payload.date;
        state.importedEmployees.importedEmployeesCount = action.payload.importedEmployeesCount;
        state.importedEmployees.importedEmployeesExistingCount = action.payload.importEmployeesExistingCount;   
        state.importedEmployees.importedEmployeesErrorsCount = action.payload.importEmployeesErrorsCount;
        state.loading = false;
      })
      .addCase(importEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        if (JSON.stringify(state.validationErrors) !== JSON.stringify(action.payload)) {
          state.validationErrors = (action.payload as string[]) || ['Failed to import employees'];
        } 
      })     
      .addDefaultCase((state) => { 
      });
  },
});

export const { clearImportedEmployees, clearValidationError } = importEmployeeSlice.actions 
export default importEmployeeSlice.reducer;