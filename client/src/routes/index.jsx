import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page";
import MainLayout from "../layouts/main";
import NotFound from "../view/not-round";


const Router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        element: <MainLayout />

    },
    {
        path: '*',
        element: <NotFound /> 
      }
])

export default Router;