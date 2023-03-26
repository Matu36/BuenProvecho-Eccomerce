import React, { useState, useEffect } from "react";
import {
  Text,
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
import { DB } from "../utils/DB";
import About from "./About";
import Card from "./Card";
import Footer from "./Footer";

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
    let options = comidas
      .filter((comida) => {
        return comida.Nombre.toLowerCase().includes(value.toLowerCase());
      })
      .slice(0, 3);

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
    handleReset();
    setSearchTerm("");
    setFilteredComidas([]);
}

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
    <Box >
<Box borderWidth="0px" borderLeftWidth="40px" borderRightWidth="40px" solid
      borderColor= "yellow.300"
>
      <Box>
        <NavBar 
        setShowAbout={setShowAbout}
        setProducts= {setProducts} />
      </Box>
      <Box marginTop={{base: "-3rem", md: "-3.5rem"}} marginLeft={{base: "2rem", md: "20rem"}} 
      maxWidth={{base: "80%", md:"40%"}}>
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
        <Box marginTop="-1rem" height="30px" overflow-y="auto">
          <ul>
            {autocompleteOptions.map((comida) => (
              <Text
                marginLeft="2rem"
                zIndex="3"
                fontSize="16px"
                
                key={comida.id}
                onClick={() => handleComidaClick(comida)}
              >
                {comida.Nombre}
              </Text>
            ))}
          </ul>
        </Box>

        
        {filteredComidas.map((comida, index) => (
          <Card 
            id={comida.id}
            key={index}
            onClick={() => handleComidaClick(comida)}
            Imagen={comida.Imagen}
            alt={comida.Nombre}
            Nombre={comida.Nombre}
            Efectivo={comida.Efectivo}
          />
        ))}
        
      </Box>
      {showAbout ? <About /> : null}
      <Box id="About"
        display={{ base: "none", md: "flex" }}
        position="fixed"
        backgroundColor="#F6F6F6"
        borderRight="1px solid #F6F6F6"
        padding="10px"
        top="79.9"
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
      
        marginLeft={{ base: "2rem", md: "14rem" }}
        marginTop={{ base: "-18rem", md: "-7rem" }}
        maxW={{ base: "80%" }}
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
        {products.map((product, index) => (
          <Card
            id={product.id}
            key={index}
            Imagen={product.Imagen}
            Nombre={product.Nombre}
            Efectivo={product.Efectivo}
          />
        ))}
      </Box>
      </Box>
      <Box display={{md:"none"}}>

<Footer setShowAbout={setShowAbout}/>
      </Box>

    </Box>
  );
}
