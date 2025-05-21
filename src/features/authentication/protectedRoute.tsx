import { Navigate, Outlet, useLocation } from 'react-router-dom'; 
import { isLoggedIn } from '../../helpers/auth';
import { store } from '../../app/store';
import { logout } from './authenticationSlice';

const ProtectedRoute = () => {

  const location = useLocation();
  const loggedIn = isLoggedIn();

  if(!loggedIn) {
    store.dispatch(logout());
  } 

  return loggedIn
    ? <Outlet /> 
    : <Navigate to="/login" replace state={{ from: location }} />;

};

export default ProtectedRoute;