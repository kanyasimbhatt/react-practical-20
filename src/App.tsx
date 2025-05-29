import { Route, Routes, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { RouteProtection } from "./components/RouteProtection/RouteProtection";
import ProductList from "./components/Products/ProductList/ProductList";
import { Login } from "./components/Auth/Login/Login";
import { SignUp } from "./components/Auth/SignUp/SignUp";
import { useDispatch } from "react-redux";
import { fetchUsers, setUsers } from "./store/User/userSlice";
import type { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { AddEditForm } from "./components/Products/AddEditProduct/AddEditProduct";

function App() {
  const location = useLocation();
  const userId: string = localStorage.getItem("user-id") || "";
  const from = location.state?.from?.pathname || "/";
  const dispatch = useDispatch<AppDispatch>();

  const { data } = useQuery({
    queryKey: ["fetch-users"],
    queryFn: () => fetchUsers(""),
  });

  useEffect(() => {
    dispatch(setUsers(data));
  }, [data, dispatch]);
  return (
    <Routes>
      <Route element={<RouteProtection userId={userId} />}>
        <Route path="/" element={<ProductList />}></Route>
        <Route path="add-product" element={<AddEditForm />} />
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
  );
}

export default App;
