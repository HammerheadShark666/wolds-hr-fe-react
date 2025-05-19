import employeeReducer from '../features/employee/employeeSlice';
import employeeListReducer from '../features/employee/employeeListSlice';
import employeeImportReducer from '../features/employee/employeeImportSlice';
import departmentReducer from '../features/department/departmentSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    employeeList: employeeListReducer,
    employeeImport: employeeImportReducer,
    department: departmentReducer,
    authentication: authenticationReducer
  },
  devTools: window.env?.NODE_ENV !== 'production',  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;