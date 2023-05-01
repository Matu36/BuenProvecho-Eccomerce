import React from "react";
import { useSelector } from "react-redux";
import { Box, Flex, Heading, Image, List, ListItem } from "@chakra-ui/react";
import pvacio from "../../img/pvacio.png";

export default function WidgetSm() {
  const users = useSelector((state) => state.users);
  const usersSlice = users.slice(-5);

  return (
    <Box
      bg="white"
      borderRadius="md"
      boxShadow="sm"
      p="4"
      marginLeft={{ base: "1rem", md: "0" }}
    >
      <Heading as="h3" size="sm" mb="2">
        Nuevos Usuarios
      </Heading>
      <List styleType="none" m="0" p="0">
        {usersSlice.map((user) => (
          <ListItem key={user.id} py="2">
            <Flex align="center">
              <Image
                src={pvacio}
                alt={`Foto de ${user.email}`}
                boxSize="32px"
                objectFit="cover"
                mr="2"
              />
              <Box>
                <Heading as="h4" size="sm" mb="1">
                  {user.email}
                </Heading>
              </Box>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
