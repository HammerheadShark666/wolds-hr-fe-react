import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { setCredentials } from './features/authentication/authenticationSlice';
import { ToastContainer } from 'react-toastify'; 
import Layout from "./layouts/Layout";
import Employees from './features/employee/pages/Employees';
import Employment from "./features/employment/pages/Employment";
import Home from "./features/home/pages/Home"; 
import Jobs from './features/job/pages/Jobs';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';
import 'react-toastify/dist/ReactToastify.css';
import EmployeesImport from './features/employee/pages/EmployeesImport';
import Login from './features/authentication/login';
import ProtectedRoute from './features/authentication/protectedRoute';
import { useAppDispatch } from './app/hooks';

function App() {


  const dispatch = useAppDispatch();
  
  const token = useSelector((state: any) => state.authentication.token);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const profile = JSON.parse(localStorage.getItem('profile') || 'null');
    if (token) {
      dispatch(setCredentials({ token, profile }));
    }
  }, [dispatch]);
  
  return ( 
      <GlobalErrorBoundary>
        <BrowserRouter>
          <Routes>         
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/employees-import" element={<EmployeesImport />} />
                <Route path="/employment" element={<Employment />} />
                <Route path="/jobs" element={<Jobs />} />
              </Route>
            </Route> 
            <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} /> 
          </Routes>
          <ToastContainer></ToastContainer> 
        </BrowserRouter>
      </GlobalErrorBoundary> 
  );
}

export default App; 