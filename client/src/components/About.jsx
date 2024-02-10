import React from "react";
import { Box, Text, Image, Flex, Button } from "@chakra-ui/react";
import Nosotros from "../img/Nosotros.jpg";
import { motion } from "framer-motion";

export default function About({ HandleCancelAbout }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Flex
        flexDirection="column"
        height="100%"
        backgroundColor="red.900"
        zIndex="1999"
        maxWidth="90%"
        margin="auto"
        border="solid 5px white"
        borderRadius="15px"
        color="gray"
      >
        <Flex
          justifyContent="flex-end"
          pr={{ base: 3, md: 20 }}
          pt={{ base: 5, md: 2 }}
        >
          <Button
            _hover={{ color: "gray" }}
            background="none"
            fontSize={{ base: "14", md: "18px" }}
            onClick={HandleCancelAbout}
            color="white"
          >
            Cerrar
          </Button>
        </Flex>
        <Box py={5} px={8}>
          <Text
            textAlign="center"
            fontSize="3xl"
            fontFamily="heading"
            fontWeight="bold"
            color="white"
          >
            Sobre Nosotros
          </Text>
          <Flex flexDirection="column" alignItems="center" mt={8}>
            <Image
              src={Nosotros}
              alt="Nosotros"
              maxWidth="100%"
              borderRadius="lg"
            />
            <Text
              textAlign="justify"
              fontSize="lg"
              fontFamily="body"
              maxWidth="60ch"
              mt={8}
              color="white"
            >
              ¡Bienvenidos a Buen Provecho! Somos una empresa apasionada por la
              gastronomía y la excelencia en el servicio. Nuestro equipo está
              compuesto por chefs talentosos y apasionados por la cocina,
              comprometidos a ofrecer experiencias culinarias únicas. Desde
              platos exquisitos hasta un servicio impecable, en Buen Provecho
              nos esforzamos por hacer que cada comida sea memorable. ¡Descubre
              el placer de sabores auténticos y momentos inolvidables con
              nosotros!
            </Text>
          </Flex>
        </Box>
      </Flex>
    </motion.div>
  );
}
