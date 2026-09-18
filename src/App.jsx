import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Protectedroute from "./components/Protectedroute";
// import { useTheme } from "./context/Themecontext";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));
const Products = lazy(() => import("./pages/Products"));
const Users = lazy(() => import("./pages/Users"));
const Viewproduct = lazy(() => import("./pages/Viewproduct"));

function App() {
  // const { darkMode, toggleTheme } = useTheme();

  return (
    <>
         {/* <div className={darkMode ? "app dark" : "app"}>

      <button onClick={toggleTheme}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      </div> */}

      <BrowserRouter>
        <Suspense fallback={<h3>Loading...</h3>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <Protectedroute>
                  <Dashboard />
                </Protectedroute>
              }
            />

            <Route
              path="/products"
              element={
                <Protectedroute>
                  <Products />
                </Protectedroute>
              }
            />

            <Route
              path="/orders"
              element={
                <Protectedroute>
                  <Orders />
                </Protectedroute>
              }
            />

            <Route
              path="/users"
              element={
                <Protectedroute>
                  <Users />
                </Protectedroute>
              }
            />

            <Route
              path="/viewproduct/:id"
              element={
                <Protectedroute>
                  <Viewproduct />
                </Protectedroute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;