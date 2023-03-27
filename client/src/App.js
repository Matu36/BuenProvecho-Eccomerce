import './App.css';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import ShoppingCart from "../src/components/ShoppingCart/ShoppingCart/ShoppingCart"


function App() {
  return (
    
    <Routes>
      <Route exact path={"/"} element={<Home />} />
      <Route exact path={"/"} element={<NavBar />} />
      <Route exact path={"/Scart"} element={<ShoppingCart />} />
    </Routes>
  );
}

export default App;
