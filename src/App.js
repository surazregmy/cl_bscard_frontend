import "./App.css";
import Home from "./pages/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./pages/contact";
import UploadImage from "./pages/upload";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Logout from "./pages/logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Contact></Contact>,
      },
      {
        path: "/upload",
        element: <UploadImage></UploadImage>,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
