import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteEmployee, searchEmployeeRecords } from './employeeThunks';
import { Employee } from '../../types/employee'; 
import { PagedEmployees } from '../../types/employeeImported';

interface IUpdatePhotoResponse {
  id: number,
  filename: string
}

interface TableState {
  employeesFound: PagedEmployees; 
  keyword: string;
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  employeesFound: {
    employees: [],
    page: 1,
    totalPages: 0,
    totalEmployees: 0,
  },  
  keyword: '',
  loading: false,
  error: null,
};
 
const employeeSearchSlice = createSlice({
  name: 'employeeSearch',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
      state.employeesFound.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.employeesFound.page = action.payload;
    },
    clearEmployees(state) {
      state.employeesFound = {
        employees: [],
        page: 1,
        totalPages: 0,
        totalEmployees: 0,
      }; 
    },
    updateEmployeeInEmployees: (state, action: PayloadAction<Employee>) => {
      state.employeesFound.employees = state.employeesFound.employees.map(emp =>
        emp.id === action.payload.id ? action.payload : emp
      );
    },
    updateEmployeePhotoInEmployees: (state, action: PayloadAction<IUpdatePhotoResponse>) => {
      state.employeesFound.employees = state.employeesFound.employees.map(emp => 
        emp.id === action.payload.id ? { ...emp, photo: action.payload.filename } : emp
      );
    },
    addEmployeeToEmployees: (state, action: PayloadAction<Employee>) => {
      state.employeesFound.employees.push(action.payload);
    },
    removeEmployeeFromEmployees: (state, action: PayloadAction<number>) => {
      state.employeesFound.employees = state.employeesFound.employees.filter(emp => emp.id !== action.payload);
    },
    updateEmployeesState: (state) => {
      if(state.employeesFound.employees.length === 1)
      {
        state.employeesFound.totalPages = 1;
        state.employeesFound.totalEmployees = 1;
        state.employeesFound.page = 1;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchEmployeeRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchEmployeeRecords.fulfilled, (state, action) => {
        state.employeesFound.employees = action.payload.employees;
        state.employeesFound.totalPages = action.payload.totalPages;
        state.employeesFound.totalEmployees = action.payload.totalEmployees;
        state.employeesFound.page = action.payload.page
        state.loading = false;
      }) 
      .addCase(searchEmployeeRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to load employees';
      }) 
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false; 
        state.employeesFound.totalEmployees = state.employeesFound.totalEmployees - 1;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to delete employee';     
      });
  },
});

export const { setSearch, setPage, clearEmployees, updateEmployeeInEmployees, addEmployeeToEmployees, 
                      updateEmployeePhotoInEmployees, updateEmployeesState, removeEmployeeFromEmployees } = employeeSearchSlice.actions;
export default employeeSearchSlice.reducer;