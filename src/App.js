import { Route, Routes, Router } from "react-router-dom";
import Nav from "./pages/navbar/Nav";
import Search from "./pages/search/Search";
import Brand from "./pages/brand/Brand"
import LastProduct from "./pages/lastproduct/LastProduct";
import About from "./pages/About/About";
import Footer from "./pages/footer/Footer"
import Register from "./pages/register/Register";



function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Example authentication state

  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  
  return (
    <div>
    <Nav isAuthenticated={isAuthenticated} onLogout={handleLogout} />
    
    
    <Routes>
      <Route path="/register" element={<Register />} /> 
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
