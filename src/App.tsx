import { Route, Routes } from "react-router-dom";
import { RouteProtection } from "./components/RouteProtection/RouteProtection";
import { ProductList } from "./components/Products/ProductList/ProductList";
import { Login } from "./components/Auth/Login/Login";
import { SignUp } from "./components/Auth/SignUp/SignUp";
import { getData } from "./Utils/store";

function App() {
  const userId = getData("user-id");

  return (
    <Routes>
      <Route element={<RouteProtection userId={userId} />}>
        <Route path="/" element={<ProductList />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
  );
}

export default App;
