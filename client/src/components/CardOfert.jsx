import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { DB } from "../utils/DB";

const CardOfert = () => {
  const products = DB.slice(0, 3);

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent={{base:"center", md: "flex-end"}}
      paddingTop={{ base: "15%", md: "7%" }}
      paddingRight="14%"
    >
      {products.map((product) => (
        <Box display="flex" key={product.id} paddingLeft="12%">
          <Box
            p="2"
            borderRadius="10%"
            maxW="sm"
            border="solid 3px gray"
            boxShadow="inset 0px -4px 4px -2px rgba(0, 0, 0, 0.5)"
            paddingBottom="20%"
            padding="15%"
          >
            <Box
              display="flex"
              overflow="hidden"
              w={{ base: "80px", md: "150px" }}
              h={{ base: "100px", md: "150px" }}
              borderRadius="50%"
              marginTop="-4rem"
            >
              <img
                src={product.Imagen}
                alt="imagen"
                objectFit="cover"
                w="100%"
                h="100%"
              />
              
            </Box>
            <Box>
            <Text zIndex={1} color="black"> {product.Nombre}</Text>
            <Text>  $ {product.Efectivo} </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CardOfert;
