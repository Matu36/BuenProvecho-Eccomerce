import { Box, Text } from "@chakra-ui/react";
import React, {useEffect} from "react";
import { getOfertas } from "../Redux/actions";
import { DB } from "../utils/DB";
import { useSelector, useDispatch } from "react-redux";

const CardOfert = () => {
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOfertas());
  }, []);

  const Ofertas = useSelector (state => state.ofertas)
  const products = DB.slice(0, 3);


  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent={{ base: "center", md: "space-between" }}
      paddingTop={{ base: "15%", md: "5%" }}
      sx={{
        // Estilos específicos para el rango 768px - 1000px

        "@media (min-width: 768px) and (max-width: 802px)": {
          maxWidth: "5%", marginTop:"3rem"
        },
        "@media (min-width: 802px) and (max-width: 836px)": {
          maxWidth: "20%", marginTop:"3rem"
        },
        "@media (min-width: 836px) and (max-width: 898px)": {
          maxWidth: "40%", marginTop:"3rem"
        },
        "@media (min-width: 898px) and (max-width: 950px)": {
          maxWidth: "70%", marginTop:"3rem"
        },
      }} 
    >
      
      {products.map((product) => (
        <Box display="flex" key={product.id} padding={{ base: "2%", md: "5%" }}>
          <Box
            p="2"
            borderRadius="10%"
            maxW="sm"
            border="solid 3px gray"
            boxShadow="inset 0px -4px 4px -2px rgba(0, 0, 0, 0.5)"
            paddingBottom="10%"
            backgroundColor="white"
           
          >
            <Box
              display="flex"
              overflow="hidden"
              w={{ base: "100px", md: "150px" }}
              h={{ base: "100px", md: "150px" }}
             
            
              borderRadius="50%"
              marginTop="-4rem"
              
            >
              <img
                src={product.Imagen}
                alt="imagen"
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Box>
            <Box>
              <Text color="black">
                {product.Nombre}
              </Text>
              <Text> $ {product.Efectivo} </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CardOfert;
