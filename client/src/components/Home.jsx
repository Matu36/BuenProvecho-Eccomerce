import React, { useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import NavBar from "./NavBar";
import RandomSlider from "./randomSlider";
import Logo from "../img/LOGO.png";
import Card from "./Card";
import Sidebar from "./Sidebar";

export default function Home() {
  const [selectedFood, setSelectedFood] = useState();
  const [products, setProducts] = useState([]);

  const handleSelectFood = (DB) => {
    setSelectedFood(DB);
  };

  return (
    <Box>
      <NavBar handleSelectFood={handleSelectFood} />

      {selectedFood && (
        <Box position="fixed" top="250px" left="0" right="0" zIndex="1">
          <Card selectedFood={selectedFood} />
        </Box>
      )}

      <Box
        display={{ base: "none", md: "flex" }}
        position="fixed"
        backgroundColor="#F6F6F6"
        borderRight="1px solid #F6F6F6"
        padding="10px"
        top="85"
        left="0"
        bottom="0"
        width="10rem"
        overflow="auto"
      >
        <Sidebar setProducts={setProducts} />
      </Box>
      <Box
        mt={{ base: "-20rem", md: "-8rem" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box
          maxWidth={{ base: "200px", md: "400px" }}
          maxHeight={{ base: "50px", md: "200px" }}
          margin="auto"
        >
          <Image
            src={Logo}
            alt="Logo de la empresa"
            width="100%"
            height="100%"
            objectFit="contain"
          />
        </Box>
      </Box>

      <Box
        marginLeft={{ base: "0rem", md: "14rem" }}
        marginTop={{ base: "-18rem", md: "-7rem" }}
      >
        {RandomSlider()}
      </Box>
      <Box
        id="Cartas"
        maxW="sm"
        overflow="hidden"
        boxShadow="md"
        mx="auto"
        mt="4"
      >
        {/* Renderiza los productos filtrados */}
        {products.map((product) => (
          <Box mx="auto" mt="8" key={product.id}>
            <Image
              src={product.Imagen}
              alt={product.Nombre}
              maxH="300px"
              maxW="100%"
              border="1px solid #8B4513"
              width="200px"
              height="200px"
              objectFit="cover"
            />
            <Text fontWeight="semibold" fontSize="lg" mr="2">
              {product.Nombre}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {product.Efectivo}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
