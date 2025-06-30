import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { getData } from "./Utils/store";

function App() {
  const userId = getData("user-id");
  const RouteProtection = lazy(
    () => import("./components/RouteProtection/RouteProtection")
  );
  const Login = lazy(() => import("./components/Auth/Login/Login"));
  const SignUp = lazy(() => import("./components/Auth/SignUp/SignUp"));
  const ProductList = lazy(
    () => import("./components/Products/ProductList/ProductList")
  );
  return (
    <Routes>
      <Route
        element={
          <Suspense>
            <RouteProtection userId={userId} />
          </Suspense>
        }
      >
        <Route
          path="/"
          element={
            <Suspense>
              <ProductList />
            </Suspense>
          }
        ></Route>
      </Route>
      <Route
        path="/login"
        element={
          <Suspense>
            <Login />
          </Suspense>
        }
      ></Route>
      <Route
        path="/signup"
        element={
          <Suspense>
            <SignUp />
          </Suspense>
        }
      ></Route>
    </Routes>
  );
}

export default App;
