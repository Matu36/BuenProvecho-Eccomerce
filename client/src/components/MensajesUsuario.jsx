import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { crearMensaje } from "../Redux/actions/index";
import { Input, FormLabel, Button } from "@chakra-ui/react";
import { Box, VStack, FormControl, Textarea } from "@chakra-ui/react";
import Swal from "sweetalert2";

export default function MensajesUsuario() {
  const [emailValido, setEmailValido] = useState(true);
  const dispatch = useDispatch();

  const validarEmail = (valor) => {
    // Expresión regular para verificar el formato del email
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(valor);
  };

  const [mensaje, setMensaje] = useState({
    Nombre: "",
    email: "",
    Mensaje: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!validarEmail(mensaje.email)) {
      setEmailValido(false);
      return;
    }

    setEmailValido(true);

    if (mensaje.Nombre && mensaje.email && mensaje.Mensaje) {
      const newMensaje = {
        ...mensaje,
      };
      dispatch(crearMensaje(newMensaje));
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "El mensaje ha sido enviado",
        showConfirmButton: false,
        timer: 3000,
      });

      setMensaje({
        Nombre: "",
        email: "",
        Mensaje: "",
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Por favor, completa todos los campos",
        showConfirmButton: true,
      });
    }
  };

  return (
    <form onSubmit={handleOnSubmit} backgroundColor="transparent">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        border="2px solid"
        borderColor="gray.400"
        borderRadius="xl"
        boxShadow="lg"
        p={6}
        width={{ base: "100%", md: "100%" }}
        backgroundColor="red.900"
        opacity="0.9"
      >
        <VStack spacing={4} width="100%">
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              name="nombre"
              value={mensaje.Nombre}
              autoComplete="off"
              placeholder="Nombre"
              onChange={(e) =>
                setMensaje({ ...mensaje, Nombre: e.target.value })
              }
              borderRadius="md"
              borderColor="gray.300"
              _hover={{ borderColor: "gray.500" }}
              _focus={{ borderColor: "blue.500" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={mensaje.email}
              autoComplete="off"
              placeholder="Email"
              onChange={(e) =>
                setMensaje({ ...mensaje, email: e.target.value })
              }
              borderRadius="md"
              borderColor="gray.300"
              _hover={{ borderColor: "gray.500" }}
              _focus={{ borderColor: "blue.500" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Dejanos tu comentario</FormLabel>
            <Textarea
              name="mensaje"
              value={mensaje.Mensaje}
              placeholder="Dejanos tu comentario"
              onChange={(e) =>
                setMensaje({ ...mensaje, Mensaje: e.target.value })
              }
              borderRadius="md"
              borderColor="gray.300"
              _hover={{ borderColor: "gray.500" }}
              _focus={{ borderColor: "blue.500" }}
            />
          </FormControl>
        </VStack>
        <br />
        <Button
          type="submit"
          mt={4}
          borderRadius="md"
          colorScheme="purple"
          _hover={{ bg: "blue.800" }}
        >
          Enviar Mensaje
        </Button>
      </Box>
    </form>
  );
}
