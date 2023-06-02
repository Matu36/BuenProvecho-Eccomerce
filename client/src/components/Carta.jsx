import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getComidas } from "../Redux/actions";

const Carta = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComidas());
  }, []);

  const Menu = useSelector((state) => state.comidas);

  const categoriasUnicas = Array.from(
    new Set(Menu.map((item) => item.Categoria))
  );

  return (
    <Box backgroundColor="blackAlpha.900">
      <Box border="solid 2px yellow" marginLeft="1rem" marginRight="1rem">
        <br />

        <div className="TituloCarta">
          <h1>MENÚ</h1>
        </div>
        <div className="TituloLoguin">
          <h1>Buen Provecho!</h1>
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
      </Box>
    </Box>
  );
};

export default Carta;
