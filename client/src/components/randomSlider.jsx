import React from "react";
import { Box, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DB } from "../utils/DB";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: false,
  fade: true, // Agrega la opción de fade
  cssEase: "linear",
  arrows: false,
};

const RandomSlider = () => {
  // Ordena el array DB por precio de menor a mayor
  const sortedDB = DB.sort((a, b) => a.Efectivo - b.Efectivo);
  // Selecciona los primeros 10 objetos del array ordenado
  const randomProducts = sortedDB.slice(0, 10);

  return (
    <Box
      justifyContent="center"
      paddingTop="5%"
      width="100%"
      
    >
      <Slider {...settings}>
        {randomProducts.map((product) => (
          <Box
            width="100%"
            
            key={product.id}
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Box
              p="2"
              borderRadius="md"
              maxW="sm"
              width="100%"
              maxWidth="1200px"
            >
              <Box
                width="100%"
                maxWidth="1200px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                borderRadius="md"
              >
                <Image
                  src={product.Imagen}
                  alt="imagen"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default RandomSlider;
