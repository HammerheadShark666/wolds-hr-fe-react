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
import Login from './features/authentication/login';
import ProtectedRoute from './features/authentication/protectedRoute'; 
import ToastClearOnRouteChange from './components/ToastClearOnRouteChange';
import ImportEmployeesHistory from './features/import-employee-history/pages/ImportEmployeesHistory';
import ImportEmployees from './features/import-employee/pages/ImportEmployees';
import { NAVIGATION } from './helpers/constants';
 
function App() { 
  return ( 
      <GlobalErrorBoundary>        
        <BrowserRouter>
          <ToastClearOnRouteChange />
          <Routes>          
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path={NAVIGATION.HOME} element={<Home />} />
                <Route path={NAVIGATION.EMPLOYEES} element={<Employees />} />
                <Route path={NAVIGATION.IMPORT_EMPLOYEES} element={<ImportEmployees />} />
                <Route path={NAVIGATION.IMPORT_EMPLOYEES_HISTORY} element={<ImportEmployeesHistory />} />
                <Route path={`${NAVIGATION.IMPORT_EMPLOYEES_HISTORY}/:id`} element={<ImportEmployeesHistory />}  />
                <Route path={NAVIGATION.EMPLOYMENT} element={<Employment />} />
                <Route path={NAVIGATION.JOBS} element={<Jobs />} />
              </Route>
            </Route>  
            <Route path="*" element={<Navigate to={NAVIGATION.HOME} />} />
          </Routes>
          <ToastContainer></ToastContainer> 
        </BrowserRouter>
      </GlobalErrorBoundary> 
  );
}

export default App; 