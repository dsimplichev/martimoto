import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./pages/navbar/Nav";
import Search from "./pages/search/Search";
import Brand from "./pages/brand/Brand";
import LastProduct from "./pages/lastproduct/LastProduct";
import About from "./pages/About/About"; // Проверен регистър
import Footer from "./pages/footer/Footer";
import PartsSearch from "./pages/partsSearch/PartsSearch";
import BrandDetails from "./pages/brandDetails/BrandDetails";
import ModelDetails from "./pages/brandDetails/ModelDetails";
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
import ProductResults from "./pages/ProductResults/ProductResults";
import ScrollToTopButton from "./pages/scrollToTopButton/scrollToTopButton";
import AdminMessages from "./pages/adminMessages/AdminMessages";
import PartsByYear from "./pages/brandDetails/PartsByYear";
import SinglePartPage from "./pages/singlePartPage/SinglePartPage";
import Favorites from "./pages/favorites/Favorites";
import Contact from "./pages/contact/Contact";
import OrderHistory from "./pages/orderDetails/OrderHistory";
import AutoAccessoriesPage from "./pages/AutoAccessoriesPage/AutoAccessoriesPage";
import TiresPage from "./pages/AutoAccessoriesPage/TiresPage";
import OilsPage from "./pages/AutoAccessoriesPage/OilsPage";
import OilSearchForm from "./pages/AutoAccessoriesPage/OilSearchForm";
import TruckOilSearchForm from "./pages/AutoAccessoriesPage/TruckOilSearchForm";
import MotorcycleOilSearchForm from "./pages/AutoAccessoriesPage/MotorcycleOilSearchForm";
import React, { useState, useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import WiperFluidPage from "./pages/AutoAccessoriesPage/WiperFluidPage";
import MatsPage from "./pages/AutoAccessoriesPage/MatsPage";
import AddCarTiresPage from "./pages/AddCarTiresPage/AddCarTiresPage";
import TireDetailsPage from "./pages/AutoAccessoriesPage/TireDetailsPage";
import AddOilForm from "./pages/AddOilForm/AddOilForm";
import AddWiperFluidForm from "./pages/AddWiperFluidForm/AddWiperFluidForm";
import WiperFluidDetailsPage from "./pages/AutoAccessoriesPage/WiperFluidDetailsPage";
import OilDetailsPage from "./pages/AutoAccessoriesPage/OilDetailsPage";
import TruckOilDetailsPage from "./pages/AutoAccessoriesPage/TruckOilDetailsPage";
import MotorcycleOilDetailsPage from "./pages/AutoAccessoriesPage/MotorcycleOilDetailsPage";
import AddMats from "./pages/AddMats/AddMats"

function App() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const location = useLocation();

  const isPageWithoutFooter =
    location.pathname === "/cart" || location.pathname === "/order";

  const hideBrandAndLastProduct =
    location.pathname.startsWith("/autosviat") ||
    location.pathname.startsWith("/autosviat/gumi") ||
    location.pathname.startsWith("/autosviat/masla") ||
    location.pathname.startsWith("/autosviat/techosti-chistachki") ||
    location.pathname.startsWith("/autosviat/stelki") ||
    location.pathname.startsWith("/tire/") ||
    location.pathname.startsWith("/wiper-fluid/") ||
    location.pathname.startsWith("/oil/") ||
    location.pathname.startsWith("/truck-oil/") ||
    location.pathname.startsWith("/motorcycle-oil/") ||
    location.pathname.startsWith("/contact")
  
    return (
    <div>
      <Nav isLoggedIn={isLoggedIn} onLogout={logout} />

      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/last-product" element={<LastProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/partssearch" element={<PartsSearch />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/autosviat" element={<AutoAccessoriesPage />} />
        <Route path="/autosviat/gumi" element={<TiresPage />} />
        <Route path="/autosviat/masla" element={<OilsPage />} />
        <Route path="/autosviat/masla/avtomobili" element={<OilSearchForm />} />
        <Route
          path="/autosviat/masla/kamioni"
          element={<TruckOilSearchForm />}
        />
        <Route
          path="/autosviat/masla/motori"
          element={<MotorcycleOilSearchForm />}
        />
        <Route
          path="/autosviat/techosti-chistachki"
          element={<WiperFluidPage />}
        />
        <Route path="/autosviat/stelki" element={<MatsPage />} />
        <Route
          path="/accessories/:accessoryName"
          element={<AccessoryDetails />}
        />
        <Route path="/brands/:brandName" element={<BrandDetails />} />
        <Route
          path="/brands/:brandName/models/:modelName"
          element={<ModelDetails />}
        />
        <Route
          path="/brands/:brandName/models/:modelName/:year"
          element={<PartsByYear />}
        />
        <Route path="/add-accessory" element={<AddAccessory />} />
        <Route path="/add-part" element={<AddPart />} />
        <Route
          path="/accessories/detail/:id"
          element={<AccessoryDetailPage />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/admin/orders" element={<AdminOrder />} />
        <Route path="/order/:orderId" element={<OrderDetails />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/search-results" element={<ProductResults />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/parts/:id" element={<SinglePartPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/add-car-tires" element={<AddCarTiresPage />} />
        <Route path="/tire/:id" element={<TireDetailsPage />} />
        <Route path="/add-oil" element={<AddOilForm />} />
        <Route path="/add-wiper-fluid" element={<AddWiperFluidForm />} />
        <Route path="/add-mats" element={<AddMats />} />
        <Route path="/wiper-fluid/:id" element={<WiperFluidDetailsPage />} />
        <Route path="/oil/:id" element={<OilDetailsPage />} />
        <Route path="/truck-oil/:id" element={<TruckOilDetailsPage />} />
        <Route
          path="/motorcycle-oil/:id"
          element={<MotorcycleOilDetailsPage />}
        />
      </Routes>

      {!isPageWithoutFooter && (
        <>
          {!hideBrandAndLastProduct && <Brand />}
          {!hideBrandAndLastProduct && <LastProduct />}

          <About />
          <Footer />
          <ScrollToTopButton />
        </>
      )}

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
