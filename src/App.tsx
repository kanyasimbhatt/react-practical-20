import { Route, Routes, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { RouteProtection } from './components/RouteProtection/RouteProtection';
import ProductList from './components/Products/ProductList/ProductList';
import { Login } from './components/Auth/Login/Login';
import { SignUp } from './components/Auth/SignUp/SignUp';
import { getData } from './Utils/store';
import './App.css'
import { AddEditForm } from './components/Products/AddEditProduct/AddEditProduct';

function App() {
  const userId = getData('user-id');
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  return (
    <Routes>
      <Route element={<RouteProtection userId={userId} />}>
        <Route path="/" element={<ProductList />}></Route>
        <Route path="/add-product" element={<AddEditForm />} />
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