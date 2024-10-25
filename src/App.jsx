import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './AuthContext';
const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <PrivateRoute><Home/></PrivateRoute>
    ,
  },
  
  {
    path: "/login",
    element:<Login/>,
  },
  {
    path: "/signup",
    element:<SignUp/>,
  },
]);
function App() {
  return (
    <div>
    <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </div>
  )
}

export default App