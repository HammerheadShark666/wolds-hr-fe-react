import employeeReducer from '../features/employee/employeeSlice';
import employeeListReducer from '../features/employee/employeeSearchSlice';
import importEmployeeReducer from '../features/import-employee/importEmployeeSlice';
import importEmployeeHistoryReducer from '../features/import-employee-history/importEmployeeHistorySlice';
import departmentReducer from '../features/department/departmentSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setStore } from './storeAccessor';

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    employeeList: employeeListReducer,
    importEmployee: importEmployeeReducer,
    importEmployeeHistory: importEmployeeHistoryReducer,
    department: departmentReducer,
    authentication: authenticationReducer
  },
  devTools: window.env?.NODE_ENV !== 'production',  
});

setStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;