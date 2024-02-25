import React from "react";
import { useNavigate } from "react-router-dom";
import chef from "../img/CHEFICONO.png";
import { BarLoader } from "react-spinners";
import "./styles.css";

export default function LoggedInPage() {
  const navigate = useNavigate();

  // Esperar 4 segundos antes de redirigir
  setTimeout(() => {
    navigate("/");
  }, 4000);

  return (
    <div className="contain">
      <div className="aviso-login show">
        <img src={chef} className="imagenAviso" alt="" />
        <div className="textoCentrado">
          <p>Te equivocaste de lugar!</p>
          <br />
          <BarLoader color={"white"} loading={true} height={10} />
        </div>
      </div>
    </div>
  );
}
