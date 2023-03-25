import React from "react";
import { Box, Button, Text, Image, Icon } from "@chakra-ui/react";
import {GiMoneyStack, GiShoppingCart} from "react-icons/gi";

export default function Card ({id, Imagen, Nombre, Efectivo }) {
  
  
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
                  Efectivo {Efectivo}
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
                >
                  Añadir al Carrito
                </Button>
              </Box>
            </Box>
          </Box>
  );
}
 