import { Route, Routes, Router } from "react-router-dom";
import Nav from "./pages/navbar/Nav";
import Search from "./pages/search/Search";
import Brand from "./pages/brand/Brand"
import LastProduct from "./pages/lastproduct/LastProduct";



function App() {
  return (
    <>
    <Nav/>
    <Search />
    <Brand />
    <LastProduct />
    </>
  );
}

export default App;
