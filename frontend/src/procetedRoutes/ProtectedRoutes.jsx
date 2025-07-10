import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ authenticated }) => {
  if (!authenticated) {
    return <Navigate to={"login"} replace />;
  }
  return <Outlet />;
};


export const PublicOnlyRoute  = ({ authenticated }) => {
  return authenticated ? <Navigate to={"/"} replace /> : <Outlet /> ;
};



export default ProtectedRoutes;