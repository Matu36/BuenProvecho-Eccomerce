import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  useStatStyles,
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
import { Link } from "react-router-dom";
import SliderCarrousel from "./SliderCarrousel";
import appetizer from "../img/Appetizers.png";
import Carta from "./Carta";
import AvisoLogin from "./AvisoLogin";

export default function Home() {
  let currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getUsers(currentUser));
  }, []);

  // const [showAvisoLogin, setShowAvisoLogin] = useState(false);

  // if (currentUser) {
  //   // Mostrar AvisoLogin solo si hay información del usuario en localStorage
  //   setShowAvisoLogin(true);
  // }

  //RENDERIZADO DE CARTA EN EL FILTRO DE CATEGORIA
  const [products, setProducts] = useState([]);

  //About
  const [showAbout, setShowAbout] = useState(false);

  const handleMostrarAbout = () => {
    setShowAbout(true);
  };

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

  //MOSTRAR CARTA //

  const [mostrarCarta, setMostrarCarta] = useState(false);

  const handleMostrarCarta = () => {
    setMostrarCarta(true);
  };

  const handleCerrarCarta = () => {
    setMostrarCarta(false);
  };

  return (
    <Box backgroundColor="black">
      {/* {showAvisoLogin && <AvisoLogin />} */}
      {/* <Box>
        <NavBar2 />
      </Box> */}
      <Box>
        <Box>
          <NavBar
            handleMostrarFormulario={handleMostrarFormulario}
            setShowAbout={setShowAbout}
            handleMostrarAbout={handleMostrarAbout}
            setProducts={setProducts}
            handleCerrarCarta={handleCerrarCarta}
            handleMostrarCarta={handleMostrarCarta}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          maxWidth={{ base: "80%", md: "30%" }}
          margin="0 auto" // Centra el contenedor horizontalmente
        >
          <InputGroup borderRadius="35%">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              backgroundColor="white"
              placeholder="Buscar Comida"
              color="black"
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
          </InputGroup>
          <button onClick={handleSearch}></button>
          <Box marginTop="1rem" height="30px" overflow-y="auto" zIndex="1">
            <ul>
              {autocompleteOptions.map((comida) => (
                <Text
                  borderRadius="10px"
                  background="white"
                  color="black"
                  width="100%"
                  padding="0.5rem"
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

        <Box zIndex="1500">
          {showAbout && (
            <About
              HandleCancelAbout={HandleCancelAbout}
              handleMostrarAbout={handleMostrarAbout}
            />
          )}
        </Box>
        <Box zIndex="1500">
          {mostrarCarta && <Carta handleCerrarCarta={handleCerrarCarta} />}
        </Box>
        <Box>
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
        <div className="sliderContainer">
          <SliderCarrousel />
        </div>
        <br />
        <Box>
          {mostrarFormulario && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "gray",
                padding: "10px",
                zIndex: "999",
                borderRadius: "15px",
                maxWidth: "80%",
                color: "white",
              }}
            >
              <button onClick={handleCerrarFormulario}>
                <CgCloseO fontSize="1.5rem" />
              </button>
              <MensajesUsuario />
            </div>
          )}
        </Box>
      </Box>
      <Sidebar setProducts={setProducts} />

      <Box
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

      <Box width={{ base: "100%", md: "80%" }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          margin="0 auto"
        ></Box>
      </Box>
      <div className="appetizers">
        <img src={appetizer} alt="" />
      </div>
      <br />
      <br />

      <Footer2 />

      <br />
    </Box>
  );
}
