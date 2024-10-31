import { Route, Routes, Router } from "react-router-dom";
import Nav from "./pages/navbar/Nav";
import Search from "./pages/search/Search";
import Brand from "./pages/brand/Brand"
import LastProduct from "./pages/lastproduct/LastProduct";
import About from "./pages/About/About";
import Footer from "./pages/footer/Footer"
import PartsSearch from "./pages/partsSearch/PartsSearch";

import React, { useState } from 'react';



function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  
  return (
    <div>
    <Nav isAuthenticated={isAuthenticated} onLogout={handleLogout} />
    
    
    <Routes>
    <Route path="/partssearch" element={<PartsSearch />} />
    </Routes>
    
    <Search />
    <Brand />
    <LastProduct />
    <About />
    <Footer />
  </div>
  );
}

export default App;
