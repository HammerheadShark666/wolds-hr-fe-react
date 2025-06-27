import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import { ToastContainer } from 'react-toastify'; 
import Layout from "./layouts/Layout";
import Employees from './features/employee/pages/Employees';
import Employment from "./features/employment/pages/Employment";
import Home from "./features/home/pages/Home"; 
import Jobs from './features/job/pages/Jobs';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';
import 'react-toastify/dist/ReactToastify.css';
import EmployeesImport from './features/employee-import/pages/EmployeesImport';
import EmployeesImportHistory from './features/employee-import-history/pages/EmployeesImportHistory';
import Login from './features/authentication/login';
import ProtectedRoute from './features/authentication/protectedRoute'; 
import ToastClearOnRouteChange from './components/ToastClearOnRouteChange';
 
function App() { 
  return ( 
      <GlobalErrorBoundary>        
        <BrowserRouter>
          <ToastClearOnRouteChange />
          <Routes>          
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/employees-import" element={<EmployeesImport />} />
                <Route path="/employees-import-history" element={<EmployeesImportHistory />} />
                <Route path="/employment" element={<Employment />} />
                <Route path="/jobs" element={<Jobs />} />
              </Route>
            </Route>  
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <ToastContainer></ToastContainer> 
        </BrowserRouter>
      </GlobalErrorBoundary> 
  );
}

export default App; 