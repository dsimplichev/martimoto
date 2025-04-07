import { Route, Routes } from "react-router-dom";
import Nav from "./pages/navbar/Nav";
import Search from "./pages/search/Search";
import Brand from "./pages/brand/Brand";
import LastProduct from "./pages/lastproduct/LastProduct";
import About from "./pages/About/About";
import Footer from "./pages/footer/Footer";
import PartsSearch from "./pages/partsSearch/PartsSearch";
import BrandDetails from "./pages/brandDetails/BrandDetails";
import ModelDetails from "./pages/brandDetails/ModelDetails";
import YearDetails from "./pages/brandDetails/YearDetails";
import Accessories from "./pages/accessories/Accessories";
import AccessoryDetails from "./pages/accessories/AccessoryDetails";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AddAccessory from "./pages/addAccessory/AddAccessory";
import AddPart from "./pages/addPart/AddPart";
import AccessoryDetailPage from "./pages/accessories/AccessoryDetailPage";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order"; 
import AdminOrder from "./pages/adminOrder/AdminOrder";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import UserProfile from "./pages/userProfile/UserProfile";

import React, { useState, useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

function App() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div>
      <Nav isLoggedIn={isLoggedIn} onLogout={logout} />

      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/last-product" element={<LastProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/partssearch" element={<PartsSearch />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/accessories/:accessoryName" element={<AccessoryDetails />} />
        <Route path="/brands/:brandName" element={<BrandDetails />} />
        <Route path="/brands/:brandName/models/:modelName" element={<ModelDetails />} />
        <Route path="/brands/:brandName/models/:modelName/:subModelName" element={<YearDetails />} />
        <Route path="/add-accessory" element={<AddAccessory />} />
        <Route path="/add-part" element={<AddPart />} />
        <Route path="/accessories/detail/:id" element={<AccessoryDetailPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/admin/orders" element={<AdminOrder />} /> 
        <Route path="/order/:orderId" element={<OrderDetails />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>

      <Brand />
      <LastProduct />
      <About />
      <Footer />

      {isLoginOpen && (
        <Login
          onClose={() => setIsLoginOpen(false)}
          onCreateAccountClick={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
        />
      )}

      {isRegisterOpen && (
        <Register
          onClose={() => setIsRegisterOpen(false)}
          onLoginClick={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
        />
      )}
    </div>
  );
}

export default App;