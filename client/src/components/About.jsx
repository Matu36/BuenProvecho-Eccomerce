import React from "react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import Nosotros from "../img/Nosotros.jpg";
import { motion } from "framer-motion";

export default function About() {
  return (

    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 2 }}
>
    <Box bg="rgba(255, 255, 255, 0.9)" py={12} px={8} borderRadius="lg">
      <Text
        textAlign="center"
        fontSize="3xl"
        fontFamily="heading"
        fontWeight="bold"
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
        >
          Somos unos capos en la gastronomía y queremos brindarte la mejor
          experiencia culinaria.
        </Text>
      </Flex>
    </Box>
    </motion.div>
  );
}
