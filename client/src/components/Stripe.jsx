import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Tarjetas from "../img/Tarjetas2.jpg";
import axios from "axios";
import { BarLoader } from "react-spinners";
import "./styles.css";
import { Box, Button, FormControl, Text, Flex, Image } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import SliderDBTarjetas from "../utils/DBIMGTARJETAS";

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

  const { user } = useAuth0();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(user));
  }, [user]);

  const Usuario = user.email;
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
          "http://localhost:3001/api/checkout",
          {
            id,
            amount: totalEfectivo, //aca va el precio de la sumatoria del carrito (fijarse tema centavos, dolares)
            Producto: carroNombre, //esta es la description
            metadata: {
              user: {
                email: Usuario,
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
      borderWidth="0px"
      borderBottomWidth="10px"
      borderLeftWidth="10px"
      borderRightWidth="10px"
      borderTopWidth="10px"
      borderRadius="5%"
      solid
      backgroundColor={{ base: "blue.700", md: "none" }}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      height="100vh"
      backgroundImage={{
        base: "none",
        md: `linear-gradient(to bottom, rgba(0,0,0,0) 40%,rgba(0,0,0,0) 90%,rgba(1,0,5,3) 100%), url(${Tarjetas})`,
      }}
>  <Text display={{base:"flex", md:"none"}} fontSize="2rem"
marginTop="4rem" justifyContent="center" color="white"> 
Gracias por elegirnos </Text>
    
      <Box
        p="6"
        maxW={{ base: "80%", md: "50%" }}
        mx="auto"
        height={{ base: "35%", md: "50%" }}
        borderRadius={{ base: "5%", md: "none" }}
        Box
        marginTop={{ base: "4rem", md: "8rem" }}
        backgroundColor={{ base: "blue.400", md: "white" }}
        marginLeft={{ base: "2.5rem", md: "1rem" }}
      >
        <Flex fontWeight="bold" fontSize={{ base: "12px", md: "18px" }}>
          <Box marginLeft={{ base: "1rem", md: "3rem" }}>
            <Text>{user.name}</Text>
          </Box>

          <Box marginLeft="3rem">
            <Text> Total a Pagar: ${totalEfectivo} </Text>
          </Box>
        </Flex>

        <form onSubmit={handleSubmit}>
          <FormControl marginTop="3rem">
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
            colorScheme="green"
            disabled={!stripe}
            marginLeft={{ base: "2rem", md: "4rem" }}
            marginTop="3rem"
            width={{ base: "200px", md: "400px" }}
          >
            {loading ? <BarLoader /> : <Text>Comprar</Text>}
          </Button>
        </form>
      </Box>
      <SliderDBTarjetas />
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
