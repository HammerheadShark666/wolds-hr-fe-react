import { createSlice } from "@reduxjs/toolkit";
import { getImportedEmployeeHistory } from "./employeeImportHistoryThunk";



type EmployeeImportHistory = {
 id: number
  date: string
}   

interface EmployeeImportHistoryState { 
  employeeImportHistory: EmployeeImportHistory[];
  loading: boolean;
  error: string | null;

}

const initialState: EmployeeImportHistoryState = {
  employeeImportHistory: [],
  loading: false,
  error: null,
};
 
const employeeImportHistorySlice = createSlice({
  name: 'employeeImportHistorySlice',
  initialState,
  reducers: {},
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
  }
});

export default employeeImportHistorySlice.reducer;