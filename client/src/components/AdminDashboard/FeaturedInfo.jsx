import React, { useState, useEffect } from "react";
import { Flex, Box, Text, Heading } from "@chakra-ui/react";
import Stripe from "stripe";
import { useSelector } from "react-redux";

const stripe = new Stripe(
  "sk_test_51N42BCBSrEQZgu90tmmqu1XosIWVVDIqXPNgr9VRjhfgEXc8oIEukd9Nzu7D7GgCXmHtp9db49YJBwDS12yF9xrB00diqyimcv"
);

export default function FeaturedInfo() {
  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    async function obtenerCargos() {
      const resultado = await stripe.charges.list({ limit: 100 });
      setCargos(resultado.data);
    }

    obtenerCargos();
  }, []);

  //FUNCION QUE SUMA TODAS LAS PROPIEDADES AMOUNT DE CARGOS
  const totalAmount = cargos.reduce(
    (accumulator, currentCharge) => accumulator + currentCharge.amount,
    0
  );

  const productos = useSelector((state) => state.comidas);

  const totalCostos = productos.reduce(
    (accumulator, currentCharge) => accumulator + currentCharge.MercadoPago,
    0
  );

  const ganancias = totalAmount - totalCostos;

  return (
    <Flex
      justify="space-between"
      alignItems="center"
      bg="gray.50"
      p="4"
      borderRadius="10px"
      maxW={{ base: "100%", md: "none" }}
      marginLeft={{ base: "0", md: "6rem" }}
    >
      <Box
        flex="1"
        ml="1"
        backgroundColor="blue.400"
        marginLeft={{ base: "0", md: "-5rem" }}
      >
        <Heading
          as="h3"
          color="white"
          fontSize="lg"
          mb="2"
          marginLeft={{ base: "1rem", md: "7rem" }}
        >
          Ganancias
        </Heading>
        <Box display="flex" alignItems="center" mb="2">
          <Text
            color="white"
            fontSize={{ base: "16px", md: "2xl" }}
            fontWeight="semibold"
            mr="0"
            marginLeft={{ base: "1.5rem", md: "6rem" }}
          >
            $ {ganancias}
          </Text>
        </Box>
        <Text
          backgroundColor="blue.600"
          textAlign="center"
          fontSize="md"
          color="white"
          marginLeft={{ base: "0", md: "0rem" }}
        >
          Ganancias totales
        </Text>
      </Box>

      <Box flex="1" mr="2" backgroundColor="green.200">
        <Heading
          as="h3"
          color="white"
          fontSize="lg"
          mb="2"
          marginLeft={{ base: "2rem", md: "7rem" }}
        >
          Ventas
        </Heading>
        <Box display="flex" alignItems="center" mb="2">
          <Text
            color="white"
            fontSize={{ base: "16px", md: "2xl" }}
            fontWeight="semibold"
            mr="0"
            marginLeft={{ base: "1.5rem", md: "6rem" }}
          >
            $ {totalAmount}
          </Text>
        </Box>
        <Text
          align="center"
          backgroundColor="green.500"
          fontSize="md"
          color="white"
          marginLeft={{ base: "0", md: "0rem" }}
        >
          Ventas totales
        </Text>
      </Box>

      <Box flex="1" backgroundColor="yellow.200" marginLeft="-0.5rem">
        <Heading textAlign="center" as="h3" fontSize="lg" mb="2" color="white">
          Costos
        </Heading>
        <Box display="flex" alignItems="center" mb="2">
          <Text
            color="white"
            fontSize={{ base: "16px", md: "2xl" }}
            fontWeight="semibold"
            mr="2"
            marginLeft={{ base: "2rem", md: "7rem" }}
          >
            $ {totalCostos}
          </Text>
          {totalCostos < totalAmount}
        </Box>
        <Text
          fontSize="md"
          color="white"
          textAlign="center"
          backgroundColor="yellow.500"
        >
          Costos totales
        </Text>
      </Box>
    </Flex>
  );
}
