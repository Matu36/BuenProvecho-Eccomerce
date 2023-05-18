import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import NavBar from "./NavBar";
import RandomSlider from "./randomSlider";
import Sidebar from "./Sidebar";
import About from "./About";
import Card from "./Card";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { getComidas } from "../Redux/actions";
import MensajesUsuario from "./MensajesUsuario";
import { CgCloseO } from "react-icons/cg";
import { getUsers } from "../Redux/actions";
import "./styles.css";
import NavBar2 from "./NavBar2";
import CardOfert from "./CardOfert";
import Footer2 from "./Footer2";

export default function Home() {
  let currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getUsers(currentUser));
  }, []);

  //RENDERIZADO DE CARTA EN EL FILTRO DE CATEGORIA
  const [products, setProducts] = useState([]);

  //About
  const [showAbout, setShowAbout] = useState(false);

  function HandleCancelAbout() {
    setShowAbout(false);
  }

  //TRAIGO LA DATA

  const dispatch = useDispatch();
  const Food = useSelector((state) => state.comidas);

  //AUTOCOMPLETE//

  const [searchTerm, setSearchTerm] = useState("");
  const [comidas, setComidas] = useState(Food);
  const [selectedComida, setSelectedComida] = useState(null);
  const [filteredComidas, setFilteredComidas] = useState([]);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  useEffect(() => {
    dispatch(getComidas());
  }, [comidas]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filtrar las opciones de autocompletado
    let options = Food.filter((comida) => {
      return comida.Nombre.toLowerCase().includes(value.toLowerCase());
    }).slice(0, 3);

    console.log(comidas);
    setAutocompleteOptions(options);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const filteredComidas = Food.filter((comida) => {
      return comida.Nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredComidas(filteredComidas);
  };

  const handleComidaClick = (comida) => {
    setSelectedComida(comida);
    setSearchTerm(comida.Nombre);
    setFilteredComidas([]);
    setAutocompleteOptions([]);
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

  useEffect(() => {
    dispatch(getComidas());
  }, [comidas]);

  const handleResetComidaSeleccionada = () => {
    setSelectedComida(null);
  };
  //FIN AUTOCOMPLETE

  //MENSAJES USUARIO//

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  function handleMostrarFormulario() {
    setMostrarFormulario(true);
  }

  function handleCerrarFormulario() {
    setMostrarFormulario(false);
  }

  //FIN MENSAJES DE USUARIO

  return (
    <Box backgroundColor="gray.500">
      <Box>
        <NavBar2 />
      </Box>
      <Box>
        <Box>
          <NavBar
            handleMostrarFormulario={handleMostrarFormulario}
            setShowAbout={setShowAbout}
            setProducts={setProducts}
          />
        </Box>

        <Box
          marginTop={{ base: "-3rem", md: "-3.2rem" }}
          paddingLeft={{ base: "20%", md: "40%" }}
          paddingRight={{ base: "0", md: "16%" }}
          maxWidth={{ base: "80%", md: "80%" }}
        >
          <InputGroup borderRadius="35%">
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
          <Box marginTop="-1em" height="30px" overflow-y="auto" zIndex="1">
            <ul>
              {autocompleteOptions.map((comida) => (
                <Text
                  background="white"
                  width="100%"
                  paddingLeft="1rem"
                  zIndex="9999"
                  fontWeight="bold"
                  fontSize={{ base: "12px", md: "16px" }}
                  key={comida.id}
                  onClick={() => handleComidaClick(comida)}
                  style={{ cursor: "pointer" }}
                >
                  {comida.Nombre}
                </Text>
              ))}
            </ul>
          </Box>
        </Box>

        <Box>
          {mostrarFormulario && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "10px",
                zIndex: "999",
              }}
            >
              <button fontSize="2rem" onClick={handleCerrarFormulario}>
                <CgCloseO />
              </button>
              <MensajesUsuario />
            </div>
          )}
        </Box>
        <Box marginLeft={{ base: "0", md: "15rem" }}>
          <Box
            maxWidth={{ base: "85%", md: "340px" }}
            marginTop={{ base: "-3rem", md: "0" }}
            mx="auto"
            paddingBottom={{ base: "0", md: "2rem" }}
            zIndex="2"
          >
            {selectedComida && (
              <Card
                id={selectedComida.id}
                Imagen={selectedComida.Imagen}
                alt={selectedComida.Nombre}
                Nombre={selectedComida.Nombre}
                Efectivo={selectedComida.Efectivo}
                onClose={handleResetComidaSeleccionada}
              />
            )}
          </Box>
        </Box>
        <Box display="flex">
          <Box
            id="About"
            display={{ base: "none", md: "flex" }}
            position="fixed"
            backgroundColor="#F6F6F6"
            borderRight="1px solid #F6F6F6"
            top="160"
            left="0"
            bottom="0"
            width="15rem"
            overflow="auto"
          >
            <Sidebar setProducts={setProducts} />
          </Box>
        </Box>
        {showAbout ? (
          <About HandleCancelAbout={HandleCancelAbout} />
        ) : (
          <>
          <Box
              marginLeft={{ base: "0", md: "15rem" }}
              id="Cartas"
              overflow="hidden"
              mx="auto"
              paddingBottom="3rem"
              mt="4"
              display="grid"
              gridTemplateColumns={{
                base: "1fr",
                md: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
              gridGap="1rem"
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
            <Box
              marginLeft={{ base: "0", md: "15rem" }} // Margen izquierdo para compensar el ancho de la barra lateral
              width={{ base: "100%", md: "80%" }} // Ancho del contenido principal
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                margin="0 auto"
              >
                <Text
                  align="center"
                  justifyContent="center"
                  fontSize="30px"
                  fontFamily="cursive"
                  marginTop={{ base: "0", md: "-5rem" }}
                >
                  Sugerencias del Cheff
                </Text>
              </Box>
              <CardOfert />
              
              {RandomSlider()}
            </Box>
            <br />
            <br />
            <Box marginLeft={{ base: "0", md: "15rem" }} paddingBlockEnd="2rem">
          <Footer2 />
        </Box>
          </>
        )}
        
      </Box>

      <Box display={{ md: "none" }}>
        <Footer
          setShowAbout={setShowAbout}
          handleMostrarFormulario={handleMostrarFormulario}
        />
      </Box>
    </Box>
  );
}
