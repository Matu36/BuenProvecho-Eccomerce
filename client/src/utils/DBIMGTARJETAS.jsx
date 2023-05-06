import { Box, Image } from "@chakra-ui/react";
import mastercard2 from "../img/MASTERCARD2.jpg";
import mastercard3 from "../img/MASTERCARD3.jpg";
import TVISA from "../img/TVISA.jpg";
import TVISA1 from "../img/TVISA1.jpg";
import TVISA2 from "../img/TVISA2.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DBIMGTARJETAS = [
  {
    id: 1,
    Imagen: TVISA,
  },

  {
    id: 2,
    Imagen: TVISA1,
  },
  {
    id: 3,
    Imagen: mastercard3,
  },
  {
    id: 4,

    Imagen: mastercard2,
  },
  {
    id: 5,

    Imagen: TVISA2,
  },
];

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

const SliderDBTarjetas = () => {
  const sortedDB = DBIMGTARJETAS.slice(0, 5);
  // Selecciona los primeros 5 objetos del array ordenado

  return (
    <Box>
      <Slider {...settings}>
        {sortedDB.map((product) => (
          <Box
            key={product.id}
            w="100%"
            marginLeft={{ base: "8rem", md: "15rem" }}
            marginTop={{base:"5rem", md:"1rem"}}
          >
            <Box overflow="hidden" w="150px" h="80px">
              <Image
                src={product.Imagen}
                alt="imagen"
                objectFit="cover"
                w="100%"
                h="100%"
                borderRadius="5%"
                boxShadow="xl"
              />
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default SliderDBTarjetas;
