import Applayout from "./component/Applayout";
import Heropage from "./Pages/Heropage";
import { createBrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Contact from "./Pages/Contact";
import Collection from "./Pages/Collection";
import IndiviualPage from "./Pages/IndiviualPage";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { AuthProvider, useAuth } from "./authContext/AuthContext";
import {refreshUser } from "./features/login/loginSlice";
import { useEffect, useState } from "react";
import ProtectedRoutes  from "./procetedroutes/ProtectedRoutes";
import NotFound from "./Pages/NotFound";
import Profile from "./Pages/Profile";

function App() {
  let isAuthenticated=useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(refreshUser());     
  }, [dispatch]);


  return (
    <AuthProvider>
      <Routes>
      <Route path="/" element={<Applayout />}>
        <Route index element={<Heropage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="profile" element={<Profile/>} />
  
        <Route element={<ProtectedRoutes authenticated={isAuthenticated} />}>
          <Route path="collection" element={<Collection />} />
          <Route path="product/:id" element={<IndiviualPage />} />
        </Route>
      </Route>

      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />

      
      <Route path="*" element={<NotFound />} />
    </Routes>
    </AuthProvider>
  );
}

export default App;
