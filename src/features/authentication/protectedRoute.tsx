import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react'; 
import { checkAuthentication } from './authenticationThunk'; 
import { RootState, AppDispatch } from '../../app/store';

export default function ProtectedRoute() {

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();   
  const user = useSelector((state: RootState) => state.authentication.profile);
 
  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch, location.pathname]);
   
  if (user === null) return <Navigate to="/login" />;

  return <Outlet />;
}