import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Paginacion from "./Paginación";
import { Box, Text, Divider, Button, Flex } from "@chakra-ui/react";
import { REMOVE_ONE_FROM_MESSAGE } from "../../Redux/actions";

export default function Mensajes() {
  const dispatch = useDispatch();

  const mensajes = useSelector((state) => state.mensajes);

  const marcarComoLeido = (id) => {
    dispatch({ type: REMOVE_ONE_FROM_MESSAGE, payload: id });
  };

  const message = mensajes.map((product) => {
    return {
      id: product.id,
      email: product.email,
      Nombre: product.Nombre,
      Mensaje: product.Mensaje,
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

  const [clickedButton, setClickedButton] = useState(null);
  const [buttonState, setButtonState] = useState({});

  return (
    
    <Box  bg="gray.100" p={4} borderRadius="lg"  width={{base:"420px", md:"800px"}}
    marginLeft={{base:"-6rem", md:"-5rem"}}>
      {totalIngredients.map((msg, index) => (
        <Box key={index} mb={4}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="bold">{msg.Nombre}</Text>
              <Text >{msg.email}</Text>
              <Text>{msg.Mensaje}</Text>
            </Box>
            <Box>
            <Button 
              colorScheme="green"
              size="sm"
              variant={buttonState[msg.id] ? "solid" : "outline"}
              isDisabled={buttonState[msg.id]}
              onClick={() => {
                setButtonState({ ...buttonState, [msg.id]: true });
                setClickedButton(msg.id); // Actualizamos el estado local del botón que se ha clicado
                marcarComoLeido(msg.id);
                // Llamamos a la función marcarComoLeido para cambiar el estado global
              }}
            >
              Marcar como leído
            </Button>
            </Box>
          </Flex>
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
    
  );
}
