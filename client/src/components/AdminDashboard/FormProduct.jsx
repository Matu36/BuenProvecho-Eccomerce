import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComida } from "../../Redux/actions/index";
import { Input, FormLabel, Button } from "@chakra-ui/react";
import {
  Box,
  HStack,
  FormControl,
  Select,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Center,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

export default function FormProduct(props) {
  const dispatch = useDispatch();
  const comidas = useSelector((state) => state.comidas);
  const categorias = [...new Set(comidas.map((comida) => comida.Categoria))];

                                      //CLOUDDINARY//

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Images"); //Images es el folder que cree en cDinary
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmfzplfra/image/upload",   //dmfzplfra es mi n de usuario
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
  console.log(res);
  setImage(file.secure_url);
  setLoading(false);
  setIngredient({
    ...ingredient,
    Imagen: file.secure_url,
  });
};

                                    //CLOUDDINARY//

  //CREACION DE INGREDIENTE //
  const [ingredient, setIngredient] = useState({
    Nombre: "",
    Efectivo: "",
    Categoria: "",
    Imagen: "",
    MercadoPago: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (
      ingredient.Nombre &&
      ingredient.Efectivo &&
      ingredient.Categoria &&
      ingredient.Imagen &&
      ingredient.MercadoPago
    ) {
      const newIngredient = {
        ...ingredient,
      };
      dispatch(createComida(newIngredient));
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "La Comida ha sido creada",
        showConfirmButton: false,
        timer: 4000,
      });
      window.location.reload();
      setIngredient({
        Nombre: "",
        Efectivo: "",
        Categoria: "",
        Imagen: "",
        MercadoPago: "",
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
        border="4px solid"
        borderColor="gray.400"
        borderRadius="lg"
        boxShadow="md"
        p={1}
        width="100%"
        padding="5px"
        backgroundColor="yellow.200"
        opacity="0.9"
        borderBlockEndColor="ActiveBorder"
      >
        {/* <Text
    fontSize={{ base: "20px", md: "30px", lg: "46px" }}
    textAlign="center"
    fontWeight="bold"
    color="teal.600"
    backgroundColor="blue.200"
    opacity="0.5"
    mb="5px"
    
  >
    Agregar Comida
  </Text> */}

        <HStack spacing="24px">
          <Box>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                name="nombre"
                value={ingredient.Nombre}
                autoComplete="off"
                placeholder="Nombre"
                onChange={(e) =>
                  setIngredient({ ...ingredient, Nombre: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Categoria</FormLabel>
              <Select
                name="categoria"
                value={ingredient.Categoria}
                onChange={(e) =>
                  setIngredient({ ...ingredient, Categoria: e.target.value })
                }
                placeholder="Selecciona una categoria"
              >
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Efectivo</FormLabel>
              <InputGroup>
                <InputLeftAddon children="$" />
                <NumberInput
                  name="Efectivo"
                  value={ingredient.Efectivo}
                  autoComplete="off"
                  placeholder="Precio "
                  onChange={(value) =>
                    setIngredient({
                      ...ingredient,
                      Efectivo: parseInt(value) || "",
                    })
                  }
                >
                  <NumberInputField />
                </NumberInput>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Imagen</FormLabel>
              <Input
                type="file"
                name="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={uploadImage}
              />
            </FormControl>

            <FormControl>
              <FormLabel>MercadoPago</FormLabel>
              <InputGroup>
                <InputLeftAddon children="$" />
                <NumberInput
                  name="MercadoPago"
                  value={ingredient.MercadoPago}
                  autoComplete="off"
                  placeholder="MercadoPago "
                  onChange={(value) =>
                    setIngredient({
                      ...ingredient,
                      MercadoPago: parseInt(value) || "",
                    })
                  }
                >
                  <NumberInputField />
                </NumberInput>
              </InputGroup>
            </FormControl>
          </Box>
        </HStack>
        <Center marginTop="20px">
          <Button type="submit">Agregar Comida</Button>
        </Center>
      </Box>
    </form>
  );
}
