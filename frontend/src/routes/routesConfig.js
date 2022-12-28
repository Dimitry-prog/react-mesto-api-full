import MainLayout from "../components/MainLayout";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import {Navigate} from "react-router-dom";

export const publicRoutes = [
  {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path: '/signin',
    element: <SignIn/>
  },
  {
    path: '*',
    element: <Navigate to='/signup'/>
  }
];

export const privateRoutes = [
  {
    path: '/',
    element: <MainLayout/>
  },
  {
    path: '*',
    element: <Navigate to='/'/>
  }
];


