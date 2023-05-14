import React, { useEffect } from "react";
import { Box, Button, Flex, Text, Center } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import mercadopagoimg from "../../img/mercpago.jpg";
import axios from "axios";

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
      backgroundImage={{
        base: `linear-gradient(to bottom, rgba(0,0,0,0) 40%,rgba(0,0,0,0) 90%,rgba(1,0,5,3) 100%), url(${mercadopagoimg})`,
        md: `linear-gradient(to bottom, rgba(0,0,0,0) 40%,rgba(0,0,0,0) 90%,rgba(1,0,5,3) 100%), url(${mercadopagoimg})`,
      }}
      backgroundRepeat="no-repeat"
      backgroundSize={{ base: "cover", md: "contain" }}
      height="100vh"
    >
      <Flex justifyContent="center">
        <Box>
          <Text
            fontSize={{ base: "2rem", md: "3rem" }}
            marginTop={{ base: "19rem", md: "3rem" }}
          >
            {" "}
            El detalle de tu compra{" "}
          </Text>
          <br />
          <br />

          {carro.map((cart, index) => (
            <Box
              key={index}
              background="gray.200"
              padding="15px"
              marginTop={{ base: "-2rem", md: "0" }}
            >
              <Flex justifyContent="space-between">
                <Text fontSize="16px" fontWeight="bold" color="gray.600">
                  {cart.Nombre}
                </Text>
                <Box>
                  <Text ontSize="16px" fontWeight="bold" color="gray.600">
                    {" "}
                    $ {cart.Efectivo}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      </Flex>
      <br />
      <br />
      <Flex justifyContent="center">
        <Box
          background="gray.200"
          padding={{ base: "15px", md: "15px" }}
          paddingRight={{ base: "3.5rem", md: "13.5rem" }}
        >
          {isAuthenticated ? (
            <Text fontSize="16px" color="gray.600" fontWeight="bold">
              {" "}
              Nombre del cliente: {user.name}{" "}
            </Text>
          ) : null}

          <Text fontSize="16px" fontWeight="bold" color="gray.600">
            {" "}
            Total a Pagar: $ {totalEfectivo}
          </Text>
        </Box>
      </Flex>
      <br />
      <br />

      <Center>
        <Button
          bgGradient="linear(to-r, #FF6700, #FF9900)"
          color="white"
          fontSize="30px"
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
                  (window.location.href = res.data.response.body.init_point)
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
      </Center>
    </Box>
  );
};

export default CheckoutMP;
