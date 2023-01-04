import Homepage from "./modules/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProject from "./modules/AddProject";
import ShowProject from "./modules/ShowProject";
import Register from "./modules/Authentication/Register";
import Login from "./modules/Authentication/Login";
import Profile from "./modules/Profile";
import { Provider } from "jotai";
import { Suspense } from "react";
import { CheckAuth } from "./modules/Authentication/CheckAuth";
import { BrowseProjects } from "./modules/BrowseProjects";
import { Footer } from "./shared/Footer";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/add-project",
      element: (
        <CheckAuth>
          <AddProject />
        </CheckAuth>
      ),
    },
    {
      path: "/browse",
      element: <BrowseProjects />,
    },
    {
      path: "/show-project/:projectId",
      element: <ShowProject />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <div className="App">
      <Suspense fallback={<div>loading...</div>}>
        <Provider>
          <RouterProvider router={router} />
          <Footer />
        </Provider>
      </Suspense>
    </div>
  );
}

export default App;
