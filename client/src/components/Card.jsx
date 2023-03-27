import React, {useState} from "react";
import { Box, Button, Text, Image, Icon, Alert, AlertIcon } from "@chakra-ui/react";
import {GiMoneyStack, GiShoppingCart} from "react-icons/gi";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../Redux/actions";

export default function Card ({id, Imagen, Nombre, Efectivo }) {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const addToCartHandler = () => {
    dispatch({ type: ADD_TO_CART, payload: id });
    setShowAlert(true);
  };
  
  return (
    <Box
            maxW="50%"
            overflow="hidden"
            boxShadow="md"
            mx="auto"
            mt="4"
            
          >
            <Image src= {Imagen}
              maxH="300px"
              maxW="100%"
              border="2px solid #8B4513"
              width="200px"
              height="200px"
              objectFit="cover"
             
            />
            <Text fontWeight="semibold" fontSize="lg" mr="2">
              {Nombre}
            </Text>
            <Box flexDirection="column">
              <Box>
                <Button
                  as="a"
                  href="https://wa.me/5492215704647"
                  target="_blank"
                  aria-label="Whatsapp"
                  leftIcon={<Icon as={GiMoneyStack} />}
                  color="#0077CC"
                  textDecor="none"
                  padding="5px"
                  borderRadius="5px"
                  bg="none"
                >
                  Efectivo $ {Efectivo}
                </Button>
              </Box>
              <Box>
                <Button
                  leftIcon={<Icon as={GiShoppingCart} />}
                  color="#0077CC"
                  textDecor="none"
                  padding="5px"
                  borderRadius="5px"
                  bg="none"
                  onClick={addToCartHandler}
                >
                  Añadir al Carrito
                </Button>
                {showAlert && (
      <Alert status="success">
        <AlertIcon />
        El ítem ha sido añadido al carrito.
      </Alert>
    )}
              </Box>
            </Box>
          </Box>
  );
}
 