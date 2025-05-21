// src/Routes/AppRoutes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../Components/AppLayout/AppLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Customer from "../Pages/Customer/Customer";
import Products from "../Pages/Products/Products";
import Categories from "../Pages/Categories/Categories";
import Profile from "../Pages/Profile/Profile";
import Logout from "../Pages/Logout/Logout";
import ForgotPassword from "../Pages/Forgotpassword/Forgotpassword";
import Emailverification from "../Pages/Emailverification/Emailverification";
import ResetPassword from "../Pages/Resetpassword/Resetpassword";
import ProductDetails from "../Pages/Productdetails/Productdetails";
import Orders from "../Pages/Orders/Orders";
import Orderdetails from "../Pages/Orderdetails/Orderdetails";
import LogoutConfirmation from "../Components/Logoutconfirm/Logoutconfirm";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Logout route without layout */}
      <Route path="/logout" element={<Logout />} />
<Route path="/Forgot-password" element={<ForgotPassword />} />
<Route path="/verify-code" element={<Emailverification />} />
<Route path="/reset-password" element={<ResetPassword />} />
<Route path="/logout-confirm" element={<LogoutConfirmation/>} />

      {/* Routes with sidebar + header layout */}
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/profile" element={<Profile />} />
         <Route path="/products/:productId" element={<ProductDetails />} />
         <Route path="/orders" element={<Orders />} />
         <Route path="/order-details/:id" element={<Orderdetails />} />



        

      </Route>
    </Routes>
  );
};

export default AppRoutes;
