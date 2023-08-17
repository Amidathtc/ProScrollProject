import {createBrowserRouter} from "react-router-dom"
import HomePage from "../pages/HomePage"
import PraticeHome from "../pages/PraticeHome"
import InfiniteScroll from "../pages/infiniteScroll"



export const mainRoute = createBrowserRouter([
    {
        path: "/Home",
        element : <HomePage />
    },
    {
        path: "/HomePage",
        element : <PraticeHome />
    },
    {
        path: "/scroll",
        element : < InfiniteScroll />
    },
])