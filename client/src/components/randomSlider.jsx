import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DB } from "../utils/DB";


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: false,
  fade: true, // Agrega la opción de fade
  cssEase: 'linear',
  arrows: false
};

const RandomSlider = () => {
    // Ordena el array DB por precio de menor a mayor
    const sortedDB = DB.sort((a, b) => a.Efectivo - b.Efectivo);
    // Selecciona los primeros 10 objetos del array ordenado
    const randomProducts = sortedDB.slice(0, 10);

  return (
    <Box  >
      <Slider {...settings}>
       
        {randomProducts.map(product => (
          <Box key={product.id} display="flex" alignItems="center" justifyContent="center" textAlign="center" w="100%">
          <Box p="2" shadow="md" borderWidth="1px" borderRadius="md" maxW="sm">
          <Box display="flex" alignItems="center" justifyContent="center" overflow="hidden" w="600px" h="300px" borderWidth="1px" borderRadius="md" borderColor="gray.200" boxShadow="lg">
            <Image src={product.Imagen} alt="imagen" objectFit="cover" w="100%" h="100%"
             />
          </Box>
          <Text mt="2" fontWeight="bold">{product.Nombre}</Text>
          <Text>{product.Efectivo}</Text>
        </Box>
      </Box>
    ))}
  </Slider>
</Box>
  );
};

export default RandomSlider;
