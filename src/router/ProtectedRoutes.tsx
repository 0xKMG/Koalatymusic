import { Context } from 'context/store';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = (): JSX.Element => {
  const { start } = useContext(Context);
  return start ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
