import React from "react";
import { Flex, Box, Text, IconButton, Spacer } from "@chakra-ui/react";
import { FaUser, FaBell } from "react-icons/fa";

export default function NavBarAdmin() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="blue.500"
      color="white"
    >
      <Box>
        <Text marginLeft= "35rem"  fontSize="lg" fontWeight="bold">
          Panel de Administrador
        </Text>
      </Box>
      <Spacer />
      <Box>
        <IconButton
          aria-label="Usuario"
          icon={<FaUser />}
          variant="ghost"
          mr={2}
        />
        <IconButton
          aria-label="Notificaciones"
          icon={<FaBell />}
          variant="ghost"
        />
      </Box>
    </Flex>
  );
}
