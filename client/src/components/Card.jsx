import React from "react";
import { Box } from "@chakra-ui/react";

export default function Card ({ selectedFood }) {
  const {id,  Imagen, Nombre, Efectivo, MercadoPago } = selectedFood;
  
  return (
    <Box border= "solid 5px red">
      <div key={id} />
      <h2>{Nombre}</h2>
      <img src={Imagen} alt={Nombre} />
      <p>{Efectivo}</p>
      <p>{MercadoPago}</p>
    </Box>
  );
}
 