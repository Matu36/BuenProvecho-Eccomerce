import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import tarjeta from "../img/tarjeta1.png";

import axios from "axios";
import { BarLoader } from "react-spinners";
import "./styles.css";
import { Box, Button, FormControl, Text, Flex } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

import { Player } from "@lottiefiles/react-lottie-player";

/* Ir a la pagina de stripe, crear cuenta;  ir de la pestaña desarroladres, claves Api (Esto
es para la fase de desarrollo; para la fase de producción hay que activar cuenta)
Importo loadStripe y dentro le pego la clave publica (esta no hay problema que se vea)
*/

const stripePromise = loadStripe(
  "pk_test_51N42BCBSrEQZgu909e12RVN7jfLO9KNtlVbEA50SN0BZbnaS0TWw48pfNfJLvNd4w0gLKY20IGfwE3do0LTRBQoH00LkYQjYUU"
);

const CheckoutForm = () => {
  const stripe = useStripe(); //Llamos a la conexion de stripe
  const Elements = useElements(); //con esto manipulamos lo que viene de strip
  const [loading, setLoading] = useState(false);

  const { user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(user));
  }, [user]);

  //   const Usuarios = useSelector (state => state.users);

  const carro = useSelector((state) => state.cart);

  //Suma los precios de todos los productos del carrito
  const totalEfectivo = carro.reduce(
    (total, producto) => total + producto.Efectivo * producto.quantity,
    0
  );
  //Manda los nombres de los productos elegidos en el carrito en un array
  const carroNombre = carro.map((product) => product.Nombre);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: Elements.getElement(CardElement),
    });
    setLoading(true);
    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post(
          `https://pymes-software-integration-production.up.railway.app/api/checkout`,
          {
            id,
            amount: totalEfectivo, //aca va el precio de la sumatoria del carrito (fijarse tema centavos, dolares)
            Producto: carroNombre, //esta es la description
            metadata: {
              user: {
                email: user.email,
              },
            },
          }
        );

        Swal.fire({
          title: "El pago ha sido realizado con éxito",
          position: "center",
          icon: "success",
          confirmButtonText: "Ok",
        });

        console.log(data); //el data se envia al backend

        Elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
        if (
          error.response &&
          (error.response.status === 400 || error.response.status === 500)
        ) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "El pago ha sido rechazado",
            showConfirmButton: true,
          });
        }
      }
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        backgroundImage: `url(${tarjeta})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width={{ base: "90%", md: "50%" }}
      >
        <Flex fontWeight="bold" fontSize={{ base: "15px", md: "18px" }}>
          <Box alignItems="center" justifyContent="center">
            {isAuthenticated ? <Text> {user.name} </Text> : null}
          </Box>

          <Box
            margin="auto"
            padding="1rem"
            backgroundColor="rgba(255, 255, 255, 0.8)"
            borderRadius="10px"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
            border="solid 4px darkRed"
          >
            <Text fontSize={{ base: "18px", md: "20px" }} fontWeight="bold">
              Total a Pagar: ${totalEfectivo}
            </Text>
          </Box>
        </Flex>

        <form onSubmit={handleSubmit}>
          <FormControl
            marginTop="3rem"
            border="solid 4px darkRed"
            marginBottom="2rem"
          >
            <CardElement
              options={{
                style: {
                  base: { fontSize: "14px", fontWeight: "bold" },
                  md: { fontSize: "20px", fontWeight: "bold" },
                },
              }}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="orange"
            disabled={!stripe}
            marginTop={{ base: "5rem", md: "8rem" }}
            display="flex"
            justifyContent="center"
            margin="auto"
            width="50%"
          >
            {loading ? <BarLoader /> : <Text>Comprar</Text>}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

const Stripe = () => {
  return (
    <Elements stripe={stripePromise}>
      <Box>
        <CheckoutForm />
      </Box>
    </Elements>
  );
};

export default Stripe;
