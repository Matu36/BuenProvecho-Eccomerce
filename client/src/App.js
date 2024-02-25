import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ShoppingCart from "../src/components/ShoppingCart/ShoppingCart/ShoppingCart";
import AppAdmin from "./components/AdminDashboard/AppAdmin";
import { Auth0Provider } from "@auth0/auth0-react";
import LoginUser from "../src/components/LoginUser";
import Stripe from "../src/components/Stripe";
import CheckoutMP from "./components/MercadoPago/CheckoutMP";
import Carta from "./components/Carta";
import { useAuth0 } from "@auth0/auth0-react";
import { getUsers } from "./Redux/actions";

const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth0Client = process.env.REACT_APP_AUTH0_CLIENT;

export const Auth0ProviderConfig = {
  domain: auth0Domain,
  clientId: auth0Client,

  redirectUri: `https://buenprovecho.vercel.app/Logued/`,
};
//https://buenprovecho.vercel.app/ => dominio

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [esMatipineda857, setEsMatipineda857] = useState(false);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        // Llama a getUsers para obtener información de los usuarios
        const response = await getUsers({ email: "matipineda857@gmail.com" });

        // Verifica si el usuario actual es "matipineda857@gmail.com"
        const esUsuarioMatipineda857 =
          response?.email === "matipineda857@gmail.com";

        // Actualiza el estado según la verificación
        setEsMatipineda857(esUsuarioMatipineda857);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    if (!isLoading && isAuthenticated) {
      obtenerUsuarios();
    }
  }, [isAuthenticated, isLoading]);

  return (
    <Auth0Provider {...Auth0ProviderConfig}>
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/"} element={<NavBar />} />
        <Route exact path={"/Scart"} element={<ShoppingCart />} />
        <Route
          path="/admin"
          element={
            isAuthenticated && esMatipineda857 ? (
              <AppAdmin />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route exact path={"/Logued"} element={<LoginUser />} />
        <Route exact path={"/Checkout"} element={<Stripe />} />
        <Route exact path={"/CheckoutMP"} element={<CheckoutMP />} />
        <Route exact path={"/Carta"} element={<Carta />} />
      </Routes>
    </Auth0Provider>
  );
}

export default App;
