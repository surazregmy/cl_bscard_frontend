import "./App.css";
import Home from "./pages/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./pages/contact";
import UploadImage from "./pages/upload";

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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
