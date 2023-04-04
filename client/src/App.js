import './App.css';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import ShoppingCart from "../src/components/ShoppingCart/ShoppingCart/ShoppingCart"
import AppAdmin from './components/AdminDashboard/AppAdmin';
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";

const Auth0ProviderConfig = {
  domain: "dev-kpt3n5qs35pzlkke.us.auth0.com",
  clientId: "g4Cw4zVyvVGWDkq8HCFfWL2J451RRgzG",
  redirectUri: window.location.origin
};


function App() {

const {isAuthenticated} = useAuth0();
return (

    <Auth0Provider {...Auth0ProviderConfig}>
    <Routes>
      <Route exact path={"/"} element={<Home />} />
      <Route exact path={"/"} element={<NavBar />} />
      <Route exact path={"/Scart"} element={<ShoppingCart />} />
      <Route exact path={"/admin"} render={() => isAuthenticated ? <AppAdmin /> : <Home /> } />
    </Routes>
    </Auth0Provider>
  );
}

export default App;
