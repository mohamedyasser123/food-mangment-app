import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './modules/Shared/components/AuthLayout/AuthLayout'
import NotFound from './modules/Shared/components/NotFound/NotFound'
import Login from './modules/Authentication/components/Login/Login'
import Register from './modules/Authentication/components/Register/Register'
import VerifyAccount from './modules/Authentication/components/VerifyAccount/VerifyAccount'
import ForgetPass from './modules/Authentication/components/ForgetPass/ForgetPass'
import RestPass from './modules/Authentication/components/RestPass/RestPass'
import MasterLayout from './modules/Shared/components/MasterLayout/MasterLayout'
import Dashboard from './modules/Dashboard/components/Dashboard/Dashboard'
import RecipesList from './modules/Recipes/components/RecipesList/RecipesList'
import RecipeData from './modules/Recipes/components/RecipeData/RecipeData'
import CategoriesList from './modules/Categories/components/CategoriesList/CategoriesList'
import UserList from './modules/Users/components/UsersList/UsersList'
import FavList from './modules/Favourites/components/FavList/FavList'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './modules/Shared/components/ProtectedRoute/ProtectedRoute'

function App() {
  //move to improve
  // lifting state up
  // poc prof of concept
  const [loginData,setLoginData]=useState(null);
  const saveLoginData=()=>{
  let encodedToken=localStorage.getItem('token');
  let decodedToken=jwtDecode(encodedToken);
  setLoginData(decodedToken);
  }
  useEffect(()=>{
    if(localStorage.getItem('token'))
    saveLoginData();
  },[])
  
  const routes=createBrowserRouter(
    
      [
        {
          path:"",
          element:<AuthLayout/>,
          errorElement:<NotFound/>,
          children:[
            {index:true ,element:<Login saveLoginData={saveLoginData} />  },
            {path:"login", element:<Login saveLoginData={saveLoginData}/>},
            {path:"register", element:<Register/>},
            {path:"verify-account",element:<VerifyAccount/>},
            {path:"forget-pass",element:<ForgetPass/>},
            {path:"rest-pass",element:<RestPass/>},
          ]

        },
         {
          path:"dashboard",
          element:<ProtectedRoute loginData={loginData}><MasterLayout loginData={loginData} setLoginData={setLoginData}/></ProtectedRoute>,
          errorElement:<NotFound/>,
          children:[
             {index:true ,element:<Dashboard/> },
             {path:"recipes", element:<RecipesList/>},
            {path:"recipe-data", element:<RecipeData/>},
            {path:"categories",element:<CategoriesList/>},
            {path:"users",element:<UserList/>},
            {path:"favourites",element:<FavList/>},

          ]
          
        }
      ]
    
  )
  return (
    <>
    <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
