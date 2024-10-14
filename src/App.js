import { Route, Routes, Router } from "react-router-dom";
import Nav from "./pages/navbar/Nav";
import Search from "./pages/search/Search";
import Brand from "./pages/brand/Brand"



function App() {
  return (
    <>
    <Nav/>
    <Search />
    <Brand />
    </>
  );
}

export default App;
