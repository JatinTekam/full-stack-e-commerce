import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ authenticated }) => {
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;