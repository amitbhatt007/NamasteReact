import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/header/header.jsx";
import Home from "./components/home/home.jsx";
import Footer from "./components/footer/footer.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error/error.jsx";

const About = lazy(() => import("./components/about/about.jsx"));
const ContactUs = lazy(() => import("./components/contactUs/contactUs.jsx"));
const RestaurentMenu = lazy(() =>
  import("./components/restaurentMenu/restaurentMenu.jsx")
);

const App = () => {
  return (
    <>
      <Header />
      <div className="outlet-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/about",
        element: (
          <Suspense fallback="Loading...">
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback="Loading...">
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "/menu/:resId",
        element: (
          <Suspense fallback="Loading...">
            <RestaurentMenu />
          </Suspense>
        ),
      },
      { path: "*", element: <Error /> },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routerConfig} />);
