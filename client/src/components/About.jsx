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
      <Flex flexDirection="column" height="100%" backgroundColor="white" 
      marginLeft={{base:"0", md:"15rem"}} marginTop={{base:"0", md:"-5rem"}}>
        <Flex
          justifyContent="flex-end"
          pr={{ base: 3, md: 20 }}
          pt={{ base: 5, md: 2 }}
        >
          <Button
            _hover={{ color: "blue" }}
            background="none"
            fontSize={{ base: "14", md: "18px" }}
            onClick={HandleCancelAbout}
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
              experiencia culinaria. Contamos con un excelente staff de
              Cocineros altamente especializados en divesas áreas de la cocina;
              Que tengas buen Provecho!
            </Text>
          </Flex>
        </Box>
      </Flex>
    </motion.div>
  );
}
