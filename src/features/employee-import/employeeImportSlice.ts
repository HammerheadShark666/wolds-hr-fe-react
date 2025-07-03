import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getImportedEmployee, getImportedExistingEmployee, importEmployees } from '../employee-import/employeeImportThunks';
import { Employee } from '../../types/employee'; 
//import { Import } from 'lucide-react';

//searchImportedEmployees

type ImportedEmployees = {
  employees: Employee[]
  page: number
  totalPages: number
  totalEmployees: number
}   


 
interface EmployeeImportState { 
  importedEmployees: ImportedEmployees;
  importedExistingEmployees: ImportedEmployees;

 // existingEmployees: Employee[];
 // employeesImported: Employee[];
  employeeImportId: number | null;
  employeesErrorImporting: string[]; 

  employeeImportHistory: { id: number, date: string }[]; // Array of objects with id and date
  //totalPages: number;
  ///totalImportedEmployees: number;
  //page: number;
  importDate: string | null;
  loading: boolean;
  error: string | null;
} 

const initialState: EmployeeImportState = {


// employeeSearch: {
//     employees: [],
//     page: 1,
//     totalPages: 0,
//     totalEmployees: 0,
//   },

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

 // importedEmloyees: [],
  //existingEmployees: [],
  //employeesImported: [],

  employeeImportHistory: [],

  employeeImportId: null,
  employeesErrorImporting: [],
  //totalPages: 0,
  //totalImportedEmployees: 0,
  //page: 1,
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
      state.importedEmployees.page = 1;
      state.importedExistingEmployees.page = 1;
    },
    setImportedEmployeesPage(state, action: PayloadAction<number>) {
      state.importedEmployees.page = action.payload;
    },
    setImportedExistingEmployeesPage(state, action: PayloadAction<number>) {
      state.importedExistingEmployees.page = action.payload;
    },
    clearValidationError: (state) => {
      state.error = null;
    },
    clearImportedEmployees(state) {

   state.importedEmployees = {
    employees: [],
    page: 1,
    totalPages: 0,
    totalEmployees: 0,
  };

  state.importedExistingEmployees = {
    employees: [],
    page: 1,
    totalPages: 0,
    totalEmployees: 0,
  };

     // state.existingEmployees = [];
      state.employeeImportId = null;
      state.employeesErrorImporting = [];
     // state.totalPages = 0;
     // state.totalImportedEmployees = 0;
    //  state.page = 1;
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
        //state.existingEmployees = [...action.payload.existingEmployees];
        state.employeeImportId = action.payload.id;
       // state.employeesErrorImporting = [...action.payload.employeesErrorImporting]; 
        state.importDate = action.payload.date;  //new Date().toISOString(); 
        state.loading = false;
      })
      .addCase(importEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })  
      // .addCase(searchImportedEmployees.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(searchImportedEmployees.fulfilled, (state, action) => { 


      //   state.totalPages = action.payload.totalPages;
      //   state.totalImportedEmployees = action.payload.totalEmployees;
      //   state.page =  action.payload.page;
      //   state.importDate = new Date().toISOString(); 
      //   state.loading = false;
      // })
      // .addCase(searchImportedEmployees.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = 'Failed to import employees';
      // })  

      .addCase(getImportedEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getImportedEmployee.fulfilled, (state, action) => {
        state.importedEmployees.employees = [...action.payload.employees];
        state.importedEmployees.totalPages = action.payload.totalPages;
        state.importedEmployees.totalEmployees = action.payload.totalEmployees;
        state.importedEmployees.page =  action.payload.page;
        state.importDate = new Date().toISOString(); 
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
        state.importDate = new Date().toISOString(); 
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

export const { clearImportedEmployees, setImportSearchDate, setImportedEmployeesPage, setImportedExistingEmployeesPage, clearValidationError } = employeeImportSlice.actions
export default employeeImportSlice.reducer;