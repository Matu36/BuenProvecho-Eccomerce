import React, {useEffect, useState} from "react";
import {useSelector } from "react-redux";
import Paginacion from "./Paginación";
import { Box, Text, Divider } from "@chakra-ui/react";

export default function Mensajes () {
    
    const mensajes = useSelector((state) => state.mensajes);

    const message = mensajes.map((product) => {
        return {
         
          email: product.email,
          Nombre: product.Nombre,
          Mensaje: product.Mensaje
          
        };
      });
      

    const [ingredients, setIngredients] = useState(message);

    //PAGINADO

  const [currentPage, setCurrentPage] = useState(1); //Pagina Actual seteada en 1
  const [numberOfPage, setNumberOfPage] = useState(0); //Numero de Paginas seteado en 0
  const [totalIngredients, setTotalIngredients] = useState(message);

  const indexFirstPageIngredient = () => (currentPage - 1) * 9; // Indice del primer Elemento
  const indexLastPageIngredient = () => indexFirstPageIngredient() + 9; //Indice del segundo elemento

  const handlePageNumber = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    setTotalIngredients(
      ingredients.slice(indexFirstPageIngredient(), indexLastPageIngredient())
    );
    setNumberOfPage(Math.ceil(ingredients.length / 9)); // cambiando el estado local de numeros de paginas a renderiza
  }, [ingredients, currentPage]);

  //FIN PAGINADO

    return (
        <Box bg="gray.100" p={4} borderRadius="lg">
        {totalIngredients.map((msg, index) => (
          <Box key={index} mb={4}>
          <Text fontWeight="bold">{msg.Nombre}</Text>
          <Text>{msg.email}</Text>
          <Text>{msg.Mensaje}</Text>
          <Divider my={2} borderColor="gray.300" />
        </Box>
        ))}
    
<Box width="100%" marginBottom="2rem">
          <br />
          {message && (
            <Paginacion
              currentPage={currentPage}
              numberOfPage={numberOfPage}
              handlePageNumber={handlePageNumber}
            />
          )}
        </Box>
        </Box>
    )
}