import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { MdOutlineEditCalendar } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import {
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import apetit from "../img/apetit.png";

const Footer2 = () => {
  return (
    <Box
      border="1px solid white"
      borderRadius="8px"
      padding="1rem"
      justifyContent="center"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      textAlign="center"
      maxWidth={{ base: "90%", md: "95%" }}
      margin="auto"
    >
      <Box
        flex="1"
        width={{ base: "100%", md: "auto" }}
        marginLeft={{ base: "0", md: "13rem" }}
      >
        <Box width="100%">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="gray"
          >
            <MdOutlineEditCalendar size={24} />
          </Box>
          <Text color="white"> Domingos a jueves de 12pm a 00am </Text>
          <Text color="white"> Viernes y Sábados de 12pm a 1:30am </Text>
        </Box>
        <br />
        <Box width="100%">
          <Box display="flex" alignItems="center" justifyContent="center">
            <IconButton
              display={{ base: "none", md: "inline-flex" }}
              as="a"
              href="https://maps.google.com/"
              target="_blank"
              fontSize={{ base: "28px", md: "22px" }}
              aria-label="Geolocalización"
              title="Geolocalización"
              icon={<FaMapMarkerAlt />}
              variant="ghost"
              color="gray"
            />
          </Box>
          <Text color="white"> Avenida Colón 1251, Mar del Plata </Text>
        </Box>
        <br />
        <Box width="100%" marginBottom="1rem">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="gray"
          >
            <AiOutlineMail size={24} />
          </Box>
          <Text color="white"> Buenprovecho@gmail.com </Text>
        </Box>
        <Box width="100%">
          <Box display="flex" alignItems="center" justifyContent="center">
            <IconButton
              display={{ base: "none", md: "inline-flex" }}
              as="a"
              href="https://www.facebook.com/"
              target="_blank"
              aria-label="Facebook"
              fontSize={{ base: "28px", md: "22px" }}
              icon={<FaFacebook />}
              title="Facebook"
              variant="ghost"
              color="gray"
            />
          </Box>
          <Text color="white"> BonApetit@facebook.com </Text>
        </Box>
      </Box>
      {/* Sección de la imagen */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={{ base: "1rem", md: 0 }}
      >
        <img
          src={apetit}
          alt=""
          style={{
            maxWidth: "50%",
            borderRadius: "15px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Footer2;
