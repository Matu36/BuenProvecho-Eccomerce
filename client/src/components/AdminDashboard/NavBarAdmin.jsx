import React, {useState, useEffect} from "react";
import { Flex, Box, Text, IconButton, Spacer, Badge, Menu, MenuList, MenuButton,
MenuItem } from "@chakra-ui/react";
import { FaUser, FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function NavBarAdmin() {

  const mensajessinleer = useSelector((state) => state.mensajesnoleidos);
  const [mensajeNoLeido, setMensajeNoLeido] = useState(0);
 
  

  useEffect(() => {
    const contador = mensajessinleer.length
    setMensajeNoLeido(contador);
  }, [mensajessinleer]);
  
  return (
    <Flex
  as="nav"
  align="center"
  justify="space-between"
  wrap="wrap"
  padding="1rem"
  bg="blue.500"
  color="white"
  maxW="100%"
  
>
  
  <Box>
    <Text marginLeft={{ base: "4rem", md: "35rem" }} fontSize="lg" fontWeight="bold">
      Panel de Administrador
    </Text>
  </Box>
  <Spacer />
  <Box>
    <Menu >
      <MenuButton 
        as={IconButton}
        aria-label="Usuario"
        icon={<FaUser />}
        variant="ghost"
        mr={2}
        _hover={{ bg: "none" }}
      />
      <MenuList style={{ backgroundColor: "white" }} variant="menu">
        <MenuItem color="black" as={Link} to="/">
          Home
        </MenuItem>
      </MenuList>
    </Menu>

    <IconButton 
      aria-label="Notificaciones"
      icon={<FaBell />}
      variant="ghost"
      onClick={() => {
        alert(`Tiene ${mensajeNoLeido} mensajes sin leer.`);
      }}
    ></IconButton>
      {mensajeNoLeido > 0 && (
      
       <Badge
         colorScheme="red"
         borderRadius="full"
        marginTop= "1rem"
         fontSize="0.8rem"
        marginLeft="-1rem"
      px={1}
         transform="translate(50%, -50%)"
         
       >
         {mensajeNoLeido}
       </Badge>
    
       )}
    
  </Box>
</Flex>
  );
          }
