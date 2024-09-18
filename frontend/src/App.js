import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Admin } from "./Components/Admin"
import { Home } from "./Components/Home"
import { AllData } from "./Components/AllData";

export const App = () => {
  const route = createBrowserRouter([
    { path: "/", element: <Admin /> },
    { path: "/home", element: <Home /> },
    { path: "/edit/:id", element: <Home /> },
    { path: "alldata", element: <AllData /> }
  ]);
  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}