import React from "react";
import { Box, Image } from "@chakra-ui/react";

export default function Card ({ selectedFood }) {
  const { Imagen, Nombre, Efectivo, MercadoPago } = selectedFood;
  
  return (
    <Box border= "solid 5px red">
      <h2>{Nombre}</h2>
      <img src={Imagen} alt={Nombre} />
      <p>{Efectivo}</p>
      <p>{MercadoPago}</p>
    </Box>
  );
}
 