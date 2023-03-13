import useAuth from '../../../Hooks/Authenticated/useAuth';
import { Outlet } from 'react-router-dom';
import Unauthorized from '../../Unauthorized/Unauthorized';

const RequireAuth = () => {
  const { auth } = useAuth();

  return (
    auth?.accessToken
      ? <Outlet />
      : <Unauthorized />
  );
};

export default RequireAuth;