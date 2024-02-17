import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ShoppingCart from "../src/components/ShoppingCart/ShoppingCart/ShoppingCart";
import AppAdmin from "./components/AdminDashboard/AppAdmin";
import { Auth0Provider } from "@auth0/auth0-react";
import LoginUser from "../src/components/LoginUser";
import Stripe from "../src/components/Stripe";
import CheckoutMP from "./components/MercadoPago/CheckoutMP";
import Carta from "./components/Carta";

const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth0Client = process.env.REACT_APP_AUTH0_CLIENT;

export const Auth0ProviderConfig = {
  domain: auth0Domain,
  clientId: auth0Client,

  redirectUri: `https://buenprovecho.vercel.app/`,
};
//https://buenprovecho.vercel.app/ => dominio

function App() {
  return (
    <Auth0Provider {...Auth0ProviderConfig}>
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/"} element={<NavBar />} />
        <Route exact path={"/Scart"} element={<ShoppingCart />} />
        <Route exact path={"/admin"} element={<AppAdmin />} />
        {/* <Route exact path={"/Logued"} element= {<LoginUser/>} /> */}
        <Route exact path={"/Checkout"} element={<Stripe />} />
        <Route exact path={"/CheckoutMP"} element={<CheckoutMP />} />
        <Route exact path={"/Carta"} element={<Carta />} />
      </Routes>
    </Auth0Provider>
  );
}

export default App;
