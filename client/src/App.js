import './App.css';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import ShoppingCart from "../src/components/ShoppingCart/ShoppingCart/ShoppingCart"
import AppAdmin from './components/AdminDashboard/AppAdmin';
import { Auth0Provider } from "@auth0/auth0-react";
import LoginUser from "../src/components/LoginUser";
import Stripe from "../src/components/Stripe";


export const Auth0ProviderConfig = {
  domain: "dev-kpt3n5qs35pzlkke.us.auth0.com",
  clientId: "g4Cw4zVyvVGWDkq8HCFfWL2J451RRgzG",
  redirectUri: `http://localhost:3000/Logued`
};


function App() {

return (

    <Auth0Provider {...Auth0ProviderConfig}>
    <Routes>
      <Route exact path={"/"} element={<Home />} />
      <Route exact path={"/"} element={<NavBar />} />
      <Route exact path={"/Scart"} element={<ShoppingCart />} />
      <Route exact path={"/admin"} element= {<AppAdmin/>} />
      <Route exact path={"/Logued"} element= {<LoginUser/>} />
      <Route exact path={"/Checkout"} element= {<Stripe/>} />
    </Routes>
    </Auth0Provider>
  );
}

export default App;
