import React, {useState, useEffect} from "react";
import { Flex, Box, Text, IconButton, Spacer, Badge } from "@chakra-ui/react";
import { FaUser, FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function NavBarAdmin() {

  const mensajes = useSelector((state) => state.mensajes);
  const [mensajeNoLeido, setMensajeNoLeido] = useState(0);
  
  useEffect(() => {
    const noLeidos = mensajes.filter((mensaje) => !mensaje.leido).length;
    setMensajeNoLeido(noLeidos);
  }, [mensajes]);
  
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
          onClick={() => {
            alert(`Tiene ${mensajeNoLeido} mensajes sin leer.`);
            setMensajeNoLeido(0);
          }}
        >
          
        </IconButton>
        {mensajeNoLeido > 0 && (
            <Badge 
              colorScheme="red" 
              borderRadius="full" 
              px="2" 
              fontSize="0.8em"
            >
              {mensajeNoLeido}
            </Badge>
          )}
      </Box>
    </Flex>
  );
          }
