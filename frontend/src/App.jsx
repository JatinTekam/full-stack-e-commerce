import Applayout from "./component/Applayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthProvider, useAuth } from "./authContext/AuthContext";
import { lazy } from "react";
import ProtectedRoutes  from "./procetedroutes/ProtectedRoutes";
import NotFound from "./Pages/NotFound";



const Heropage=lazy(()=>import("./Pages/Heropage"));
const Profile=lazy(()=>import("./Pages/Profile"));
const ProductBuy=lazy(()=>import("./Pages/ProductBuy"));
const Login=lazy(()=>import("./Pages/Login"));
const IndiviualPage=lazy(()=>import("./Pages/IndiviualPage"));
const Collection=lazy(()=>import("./Pages/Collection"));
const Contact=lazy(()=>import("./Pages/Contact"));
const Signup=lazy(()=>import("./Pages/Signup"));




function App() {
  const{accessToken,isLoggedIn}=useSelector((state) => state.login);


  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
      <Route path="/" element={<Applayout />}>
        <Route index element={<Heropage />} />
        <Route path="/contact" element={<Contact />} />
        
  
        <Route element={<ProtectedRoutes authenticated={isLoggedIn} />}>
        <Route path="/profile" element={<Profile/>} />  
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<IndiviualPage />} />
        </Route>
          
      </Route>


      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      
      <Route element={<ProtectedRoutes authenticated={isLoggedIn} />}>
        <Route path="/checkout" element={<ProductBuy />} />
      </Route>

      
      <Route path="*" element={<NotFound />} />
    </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
