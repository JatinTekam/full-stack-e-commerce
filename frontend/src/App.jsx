
import Applayout from './component/Applayout'
import Heropage from './Pages/Heropage'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Signup from './Pages/Signup';
import Contact from './Pages/Contact';
import Collection from './Pages/Collection';
import IndiviualPage from './Pages/IndiviualPage';
import { getIndiviualData } from './Pages/getIndiviualData';
import Login from './Pages/Login';




const router=createBrowserRouter([
  {
    path:"/",
    element:<Applayout/>,
    children:[
      {
        path:"/",
        element:<Heropage/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"/collection",
        element:<Collection/>,

      },
      {
        path:"/product/:id",
        element:<IndiviualPage/>,
        loader:getIndiviualData
      }
    ]
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  }
])

function App() {
  

 return <div className=''>
   <RouterProvider router={router}/>
  </div>
}

export default App
