import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "./Pages/LandingPage";
import ContactPage from "./Pages/ContactPage";
import About from "./pages/About";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUP";
import { TokenProvider } from "./Components/context/TokenContent";
import Dashboard from "./Components/Chart/DashBoard";
// import { Chart } from "";
import ChartTo from "./Components/Chart/ChartTo";
// import Home from "./pages/Home";
// import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Shared layout
    children: [
      { path: "/", element: <LandingPage /> }, // Default route
      { path: "/contact", element: <ContactPage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/about", element: <About /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/chart", element: <ChartTo /> },
    ],
  },
]);

function App() {
  return (
    <TokenProvider>
      {" "}
      {/* Wrap the entire app with TokenProvider */}
      <RouterProvider router={router} />
    </TokenProvider>
  );
}

export default App;
