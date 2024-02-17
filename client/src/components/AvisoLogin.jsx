import React, { useState, useEffect } from "react";
import chef from "../img/CHEFICONO.png";
import { useAuth0 } from "@auth0/auth0-react";

const AvisoLogin = () => {
  const { user, isAuthenticated } = useAuth0();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasBeenShown = localStorage.getItem("avisoShown");

    if (isAuthenticated && !hasBeenShown) {
      setVisible(true);
      localStorage.setItem("avisoShown", "true");
    }
  }, [isAuthenticated]);

  return visible ? (
    <div className="aviso-login show">
      <img src={chef} className="imagenAviso" alt="" />
      <div className="textoCentrado">
        <p>Bienvenido!</p>
        {user && <p>{user.name}</p>}
      </div>
    </div>
  ) : null;
};
