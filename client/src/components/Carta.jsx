import React, { useEffect } from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getComidas } from "../Redux/actions";
import chef from "../img/CHEFICONO.png";

const Carta = ({ handleCerrarCarta }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComidas());
  }, []);

  const Menu = useSelector((state) => state.comidas);

  const categoriasUnicas = Array.from(
    new Set(Menu.map((item) => item.Categoria))
  );

  return (
    <Box backgroundColor="black">
      <Box border="solid 10px darkRed" marginLeft="1rem" marginRight="1rem">
        <Flex
          justifyContent="flex-end"
          pr={{ base: 3, md: 20 }}
          pt={{ base: 5, md: 2 }}
        >
          <Button
            _hover={{ color: "gray" }}
            background="none"
            fontSize={{ base: "14", md: "18px" }}
            onClick={handleCerrarCarta}
            color="white"
          >
            Cerrar
          </Button>
        </Flex>

        <div className="TituloLoguin">
          <img src={chef} alt="" style={{ width: "200px" }} />
        </div>
        <div className="TituloCarta">
          <h1 className="colorMenu">MENÚ</h1>
        </div>
        <div style={{ columns: "2", columnGap: "2rem" }}>
          {categoriasUnicas.map((categoria) => (
            <Box key={categoria} mb="4">
              <Text
                color="white"
                fontWeight="bold"
                fontSize="xl"
                display="flex"
                marginLeft="1rem"
              >
                {categoria}
              </Text>
              {Menu.filter((item) => item.Categoria === categoria).map(
                (item) => (
                  <Box
                    key={item.Nombre}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text color="white" marginLeft="1rem">
                      {item.Nombre}
                    </Text>
                    <Text color="white" marginRight="2rem">
                      $ {item.Efectivo}
                    </Text>
                  </Box>
                )
              )}
            </Box>
          ))}
        </div>
        <br />
      </Box>
    </Box>
  );
};

export default Carta;
