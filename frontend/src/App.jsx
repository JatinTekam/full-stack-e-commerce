import Applayout from "./component/Applayout";
import Heropage from "./Pages/Heropage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Pages/Signup";
import Contact from "./Pages/Contact";
import Collection from "./Pages/Collection";
import IndiviualPage from "./Pages/IndiviualPage";
import { getIndiviualData } from "./Pages/getIndiviualData";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { AuthProvider } from "./authContext/AuthContext";
import ProtectedRoutes from "./procetedroutes/ProtectedRoutes";
import { refreshUser } from "./features/auth/AuthSlice";
import { useEffect, useState } from "react";

function App() {
  let isAuthenticated=useSelector((state) => state.login.isLogedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
    console.log(isAuthenticated);
    
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "/",
          element: <Heropage />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          element: <ProtectedRoutes authenticated={!isAuthenticated} redirectPath="/login" />,
          children: [
            {
              path: "/collection",
              element: <Collection />,
            },
            {
              path: "/product/:id",
              element: <IndiviualPage />,
              loader: getIndiviualData,
            },
          ],
        },
      ],
    },

    {
      element: <ProtectedRoutes authenticated={isAuthenticated} redirectPath="/" />,
      children: [
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
