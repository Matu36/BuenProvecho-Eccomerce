import React, { useState } from "react";
import { Box, Button, Image, Icon, Alert, AlertIcon } from "@chakra-ui/react";
import { GiMoneyStack, GiShoppingCart } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../Redux/actions";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Card({ id, Imagen, Nombre, Efectivo, onClose }) {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const addToCartHandler = () => {
    dispatch({ type: ADD_TO_CART, payload: id });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <Box
      maxW={{ base: "50%", md: "60%" }}
      overflow="hidden"
      boxShadow="md"
      mx="auto"
      mt="3rem"
      border="2px solid #8B4513"
      borderRadius="lg"
      _hover={{
        boxShadow: "xl",
        transform: "scale(1.05)",
        cursor: "pointer",
        bg: "rgba(255, 255, 255, 0.8)",
      }}
    >
      
<Box position="relative">
      <Image
      
        src={Imagen}
        maxH="100%"
        maxW="100%"
        width={{ base: "100%", md: "200px" }}
        height="200px"
        objectFit="cover"
        borderRadius="lg"
      />
      {onClose && (
        <Button
        position="absolute"
        top="-1"
        right="-4"
        mt="0"
        mr="0"
        color="white"
        background="none"
          _hover={{ background: "none", color: "red" }}
          fontSize="30px"
          zIndex="999"
          onClick={onClose}
          
        >
          <AiOutlineCloseCircle />
        </Button>
      )}
      </Box>
      <Box
        p="4"
        fontFamily="Montserrat, sans-serif"
        fontWeight="bold"
        fontSize="xl"
        textAlign="center"
        bg="red.500"
        boxShadow="md"
        opacity="0.9"
      >
        {Nombre}
      </Box>
      <Box flexDirection="column">
        <Box>
          <Button
            as="a"
            href="https://wa.me/5492215704647"
            target="_blank"
            aria-label="Whatsapp"
            leftIcon={<Icon as={GiMoneyStack} />}
            color="black"
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
            color="black"
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
