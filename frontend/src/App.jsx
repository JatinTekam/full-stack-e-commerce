import Applayout from "./component/Applayout";
import Heropage from "./Pages/Heropage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Pages/Signup";
import Contact from "./Pages/Contact";
import Collection from "./Pages/Collection";
import IndiviualPage from "./Pages/IndiviualPage";
import { getIndiviualData } from "./Pages/getIndiviualData";
import Login from "./Pages/Login";
import ProtectedRoutes from "./proctcedroutes/ProtectedRoutes";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.login.user !== null);
  
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
          element: <ProtectedRoutes authenticated={isAuthenticated} />,
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
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
