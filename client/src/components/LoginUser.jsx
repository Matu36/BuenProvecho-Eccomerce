import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { getUsers } from "../Redux/actions";
import { useDispatch } from "react-redux";
import chef from "../img/CHEFICONO.png";
import { BarLoader } from "react-spinners";
import "./styles.css";

export default function LoggedInPage() {
  const { user, isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //CON ESTA FUNCION UNA VEZ LOGUEADO, SE ENVIA EL USER POR QUERY PARA MATCHEAR
  //CON LA BASE DE DATOS.
  useEffect(() => {
    dispatch(getUsers(user));
  }, [user]);

  // Esperar 4 segundos antes de redirigir
  setTimeout(() => {
    navigate("/");
  }, 4000);

  return (
    // isAuthenticated && (
    <div className="contain">
      <div className="aviso-login show">
        <img src={chef} className="imagenAviso" alt="" />
        <div className="textoCentrado">
          <p>Bienvenido!</p>
          {user && <p>{user.name}</p>}
          <BarLoader color={"white"} loading={true} height={10} />
        </div>
      </div>
    </div>
  );
  // );
}
