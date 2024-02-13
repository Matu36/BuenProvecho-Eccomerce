import React, { useEffect } from "react";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import mercadopagoimg from "../../img/MercadoPago_Logo.png";
import axios from "axios";
import { TiArrowBack } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";

/*
Primero crear una aplicacion en MercadoPago, luego ir a esta pagina https://www.mercadopago.com.ar/developers/panel/app;
Fijarse en credenciales de Prueba; ahi estan nuestro acces token y api key;
Poner en variables de entorno:

*/

const CheckoutMP = () => {
  const { user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers(user));
  }, [user]);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const carro = useSelector((state) => state.cart);

  //Suma los precios de todos los productos del carrito
  const totalEfectivo = carro.reduce(
    (total, producto) => total + producto.Efectivo * producto.quantity,
    0
  );
  //Manda los nombres de los productos elegidos en el carrito en un array
  const carroNombre = carro.map((product) => product.Nombre);

  return (
    <Box
      borderWidth="10px"
      borderLeftWidth="10px"
      borderRightWidth="10px"
      solid
      borderColor="red.900"
      display={{ base: "row", md: "flex" }}
      justifyContent="center"
      backgroundColor="black"
      minHeight="100vh"
    >
      <Link to="#" onClick={handleGoBack}>
        <Box
          position="absolute"
          top="5"
          left="8"
          fontSize="30px"
          color="darkred"
        >
          <TiArrowBack />
        </Box>
      </Link>
      <Box maxWidth={{ md: "100%" }} display="flex" justifyContent="center">
        <Image src={mercadopagoimg} width={{ base: "80%", md: "100%" }}></Image>
      </Box>

      <Flex justifyContent="center">
        <Box
          marginLeft={{ base: "0", md: "10rem" }}
          sx={{
            "@media (min-width: 0px) and (max-width: 499px)": {
              maxWidth: "80%",
              marginTop: "1.5rem",
            },
          }}
        >
          <br />
          <Text
            fontSize={{ base: "1.3rem", md: "2rem" }}
            marginTop={{ base: "-2rem", md: "1rem" }}
            marginRight="4rem"
            fontFamily="perma"
            textDecorationThickness="from-font"
            marginLeft="4rem"
            color="white"
          >
            {" "}
            Detalle de tu compra{" "}
          </Text>
          <br />

          {carro.map((cart, index) => (
            <Box
              key={index}
              border="solid 5px darkRed"
              borderRadius="10px"
              padding="20px"
            >
              <Flex justifyContent="space-between">
                <Text fontSize="16px" fontWeight="bold" color="white">
                  {cart.Nombre}
                </Text>
                <Box>
                  <Text ontSize="16px" fontWeight="bold" color="white">
                    {" "}
                    $ {cart.Efectivo}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
          <br />
          <Flex>
            <Box
              marginRight={{ base: "0", md: "12rem" }}
              justifyContent="space-between"
            >
              {isAuthenticated ? (
                <Text fontSize="16px" color="gray.600" fontWeight="bold">
                  {" "}
                  Gourmet: {user.name}{" "}
                </Text>
              ) : null}

              <Box>
                <Text fontSize="20px" fontWeight="bold" color="white">
                  {" "}
                  Total: $ {totalEfectivo}
                </Text>
                <br />

                <Box
                  paddingBlockEnd="2rem"
                  marginLeft={{ base: "0rem", md: "12rem" }}
                >
                  <Button
                    borderRadius="md"
                    colorScheme="gray"
                    _hover={{ bg: "blue.800" }}
                    fontSize={{ base: "24px", md: "26px" }}
                    paddingBottom="5px"
                    onClick={() => {
                      axios
                        .post(
                          `https://pymes-software-integration-production.up.railway.app/payment`,
                          {
                            // id:123,
                            title: "Productos",
                            description: carroNombre,
                            price: totalEfectivo,
                          }
                        )
                        .then(
                          (res) =>
                            (window.location.href =
                              res.data.response.body.init_point)
                        );
                      // Segunda solicitud
                      axios
                        .post(
                          `https://pymes-software-integration-production.up.railway.app/paymentDBLOCAL`,
                          {
                            Nombre: carroNombre.toString(),
                            Useremail: isAuthenticated
                              ? user.email
                              : "sinemail@hotmail.com",
                            Precio: totalEfectivo,
                          }
                        )
                        .then((res) => {
                          // Manejar la respuesta de la segunda solicitud
                          console.log("Pago Realizado", res.data);
                          // ...
                        })
                        .catch((error) => {
                          // Manejar el error de la segunda solicitud
                          console.error("No se completo la transacción", error);
                          // ...
                        });
                    }}
                  >
                    Pagar
                  </Button>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CheckoutMP;
