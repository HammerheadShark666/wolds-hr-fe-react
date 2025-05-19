import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const token = useSelector((state: any) => state.authentication.token);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
