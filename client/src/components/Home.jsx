import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  Icon,
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import NavBar from "./NavBar";
import RandomSlider from "./randomSlider";
import Logo from "../img/LOGO.png";
import Sidebar from "./Sidebar";
import { GiShoppingCart, GiMoneyStack } from "react-icons/gi";
import { DB } from "../utils/DB";
import About from "./About";

export default function Home() {
  //RENDERIZADO DE CARTA EN EL FILTRO DE CATEGORIA
  const [products, setProducts] = useState([]);

  //About
  const [showAbout, setShowAbout] = useState(false);

  //AUTOCOMPLETE//

  const [searchTerm, setSearchTerm] = useState("");
  const [comidas, setComidas] = useState(DB);
  const [selectedComida, setSelectedComida] = useState(null);
  const [filteredComidas, setFilteredComidas] = useState([]);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filtrar las opciones de autocompletado
    let options = comidas.filter((comida) => {
      return comida.Nombre.toLowerCase().includes(value.toLowerCase());
    }).slice(0, 3);

    setAutocompleteOptions(options);
  };

  

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const filteredComidas = comidas.filter((comida) => {
      return comida.Nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredComidas(filteredComidas);
  };

  const handleComidaClick = (comida) => {
    setSelectedComida(comida);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredComidas([]);
    setAutocompleteOptions([]);
  };

  useEffect(() => {
    if (searchTerm === "") {
      handleReset();
    }
  }, [searchTerm]);
  //FIN AUTOCOMPLETE

  return (
    <Box>
      <Box>
        <NavBar setShowAbout={setShowAbout} />
        
      </Box>
      <Box marginTop="-3.5rem" marginLeft="23rem" maxWidth="40%">
        <InputGroup borderRadius="5%">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            backgroundColor="white"
            placeholder="Buscar Comida"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
        </InputGroup>
        <button onClick={handleSearch}></button>
        <Box marginTop= "-1rem"  height="30px" overflow-y="auto">
        <ul>
          {autocompleteOptions.map((comida) => (
            <Text marginLeft= "2rem"  zIndex= "3"  fontSize= "16px" fontWeight= "bold" key={comida.id} onClick={() => handleComidaClick(comida)}>
              {comida.Nombre}
            </Text>
          ))}
        </ul>
        </Box>
        {filteredComidas.map((comida) => (
          <Box
            maxW="50%"
            overflow="hidden"
            boxShadow="md"
            mx="auto"
            mt="4"
            key={comida.id}
            onClick={() => handleComidaClick(comida)}
          >
            <Image
              maxH="300px"
              maxW="100%"
              border="2px solid #8B4513"
              width="200px"
              height="200px"
              objectFit="cover"
              src={comida.Imagen}
              alt={comida.Nombre}
            />
            <Text fontWeight="semibold" fontSize="lg" mr="2">
              {comida.Nombre}
            </Text>
            <Box flexDirection="column">
              <Box>
                <Button
                  as="a"
                  href="https://wa.me/5492215704647"
                  target="_blank"
                  aria-label="Whatsapp"
                  leftIcon={<Icon as={GiMoneyStack} />}
                  color="#0077CC"
                  textDecor="none"
                  padding="5px"
                  borderRadius="5px"
                  bg="none"
                >
                  Efectivo {comida.Efectivo}
                </Button>
              </Box>
              <Box>
                <Button
                  leftIcon={<Icon as={GiShoppingCart} />}
                  color="#0077CC"
                  textDecor="none"
                  padding="5px"
                  borderRadius="5px"
                  bg="none"
                >
                  Añadir al Carrito
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      {showAbout ? <About /> : null}
      <Box
        display={{ base: "none", md: "flex" }}
        position="fixed"
        backgroundColor="#F6F6F6"
        borderRight="1px solid #F6F6F6"
        padding="10px"
        top="85"
        left="0"
        bottom="0"
        width="10rem"
        overflow="auto"
      >
        <Sidebar setProducts={setProducts} />
      </Box>
      <Box
        mt={{ base: "-20rem", md: "-8rem" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box
          maxWidth={{ base: "200px", md: "400px" }}
          maxHeight={{ base: "50px", md: "200px" }}
          margin="auto"
        >
          <Image
            src={Logo}
            alt="Logo de la empresa"
            width="100%"
            height="100%"
            objectFit="contain"
          />
        </Box>
      </Box>

      <Box
        marginLeft={{ base: "0rem", md: "14rem" }}
        marginTop={{ base: "-18rem", md: "-7rem" }}
      >
        {RandomSlider()}
      </Box>
      <Box
        id="Cartas"
        maxW="sm"
        overflow="hidden"
        boxShadow="md"
        mx="auto"
        mt="4"
      >
        {/* Renderiza los productos filtrados */}
        {products.map((product) => (
          <Box
            maxW="50%"
            overflow="hidden"
            boxShadow="md"
            mx="auto"
            mt="4"
            key={product.id}
          >
            <Image
              src={product.Imagen}
              alt={product.Nombre}
              maxH="300px"
              maxW="100%"
              border="2px solid #8B4513"
              width="200px"
              height="200px"
              objectFit="cover"
            />
            <Text fontWeight="semibold" fontSize="lg" mr="2">
              {product.Nombre}
            </Text>
            <Box flexDirection="column">
              <Box>
                <Button
                  as="a"
                  href="https://wa.me/5492215704647"
                  target="_blank"
                  aria-label="Whatsapp"
                  leftIcon={<Icon as={GiMoneyStack} />}
                  color="#0077CC"
                  textDecor="none"
                  padding="5px"
                  borderRadius="5px"
                  bg="none"
                >
                  Efectivo {product.Efectivo}
                </Button>
              </Box>
              <Box>
                <Button
                  leftIcon={<Icon as={GiShoppingCart} />}
                  color="#0077CC"
                  textDecor="none"
                  padding="5px"
                  borderRadius="5px"
                  bg="none"
                >
                  Añadir al Carrito
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
