import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ShoppingCart from "../src/components/ShoppingCart/ShoppingCart/ShoppingCart";
import AppAdmin from "./components/AdminDashboard/AppAdmin";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import LoginUser from "../src/components/LoginUser";
import Stripe from "../src/components/Stripe";
import CheckoutMP from "./components/MercadoPago/CheckoutMP";
import Carta from "./components/Carta";
import Error from "../src/components/Error";

const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth0Client = process.env.REACT_APP_AUTH0_CLIENT;

export const Auth0ProviderConfig = {
  domain: auth0Domain,
  clientId: auth0Client,
  redirectUri: `https://buenprovecho.vercel.app/Logued/`,
};

function AuthenticatedApp() {
  const { isAuthenticated, user } = useAuth0();

  // Resto del componente
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/"} element={<NavBar />} />
      <Route path={"/Scart"} element={<ShoppingCart />} />
      <Route
        path="/admin"
        element={
          isAuthenticated && user.email === "matipineda857@gmail.com" ? (
            <AppAdmin />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path={"/Logued"} element={<LoginUser />} />
      <Route path={"/Checkout"} element={<Stripe />} />
      <Route path={"/CheckoutMP"} element={<CheckoutMP />} />
      <Route path={"/Carta"} element={<Carta />} />
      <Route path={"*"} element={<Error />} />
    </Routes>
  );
}

function App() {
  return (
    <Auth0Provider {...Auth0ProviderConfig}>
      <AuthenticatedApp />
    </Auth0Provider>
  );
}

export default App;
