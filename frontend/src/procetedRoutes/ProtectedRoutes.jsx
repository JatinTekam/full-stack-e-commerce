import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ authenticated, redirectPath="/" }) => {
  if (!authenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;