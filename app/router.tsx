import MainPage from '@/components/MainPage'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import App from 'next/app'
import { createBrowserRouter } from 'react-router-dom'


export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/singup", element: <Signup /> },
    { path: "/signin", element: <Signin /> },
    { path: "/mainpage", element: <MainPage /> }
])