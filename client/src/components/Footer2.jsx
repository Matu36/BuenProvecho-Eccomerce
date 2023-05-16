import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { MdOutlineEditCalendar } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const Footer2 = () => {
  return (
    <Box marginLeft={{base:"0", md:"15rem"}}
    alignContent="center"
    justifyContent="center"
    margin="auto"
    display="flex"
    flexDirection="column"
    textAlign="center"
    paddingBlockEnd="1rem"
  >
    <Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <MdOutlineEditCalendar size={24} />
      </Box>
      <Text> Domingos a jueves de 12 a 00</Text>
      <Text> Viernes y Sábados de 12 a 1:30</Text>
    </Box>
    <br />
    <Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <FaAddressCard size={24} />
      </Box>
      <Text> Avenida Colón 1251, Mar del Plata </Text>
    </Box>
    <br />
    
    <Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <AiOutlineMail size={24} />
      </Box>
      <Text> Buenprovecho@gmail.com </Text>
    </Box>
  </Box>
);
  }

export default Footer2;
