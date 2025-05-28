import { Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { RouteProtection } from "./components/RouteProtection/RouteProtection";
import { ProductList } from "./components/Products/ProductList/ProductList";
import { Login } from "./components/Auth/Login/Login";
import { SignUp } from "./components/Auth/SignUp/SignUp";
function App() {
  const location = useLocation();
  const userId: string = localStorage.getItem("user-id") || "";
  const from = location.state?.from?.pathname || "/";
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<RouteProtection userId={userId} />}>
          <Route path="/" element={<ProductList />}></Route>
        </Route>
        <Route
          path="/login"
          element={userId ? <Navigate to={from} /> : <Login />}
        ></Route>
        <Route
          path="/signup"
          element={userId ? <Navigate to={from} /> : <SignUp />}
        ></Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
