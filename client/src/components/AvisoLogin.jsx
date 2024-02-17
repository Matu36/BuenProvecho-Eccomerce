import React, { useState, useEffect } from "react";
import chef from "../img/CHEFICONO.png";
import { useAuth0 } from "@auth0/auth0-react";

export default function AvisoLogin() {
  const [user] = useAuth0();

  return (
    <div className="aviso-login show">
      <img src={chef} className="imagenAviso" alt="" />
      <div className="textoCentrado">
        <p>Bienvenido!</p>
        {user && <p>{user.name}</p>}
      </div>
    </div>
  );
}
