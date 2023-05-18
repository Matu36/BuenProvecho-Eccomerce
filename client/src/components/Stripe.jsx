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
import { Box, Button, FormControl, Text, Flex } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import SliderDBTarjetas from "../utils/DBIMGTARJETAS";
import { Player } from '@lottiefiles/react-lottie-player';

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
  borderWidth="20px"
  borderLeftWidth="20px"
  borderRightWidth="20px"
  solid
  borderColor="gray.500"
  display="flex"
  flexDirection={{ base: "column", md: "row" }}
  alignItems="center"
  justifyContent="center"
  paddingBlockEnd="1rem"
  height={{base:"none", md:"100vh"}}
  
>
  <Text 
    fontSize="2rem"
    marginTop={{base:"2rem", md:"1rem"}}
    justifyContent="center"
    color="black"
    textDecoration="underline"
    alignSelf={{base:"center", md:"flex-start" }}
    textAlign="center" 
    position={{base:"relative", md:"absolute" }}
    top="10%" 
    transform="translateY(-50%)" 
    fontFamily="sans-serif"
  >
    Check Out
  </Text>
  <Box
    p="6"
    width={{ base: "80%", md: "100%" }}
    mx="auto"
    marginTop={{ base: "1rem", md: "6rem" }}
    marginLeft={{ base: "2.5rem", md: "1rem" }}
    backgroundColor= "gray.200"
    borderRadius={{ base: "5%", md: "5%" }}
    
  >
        <Flex fontWeight="bold" fontSize={{ base: "15px", md: "18px" }}>
          <Box marginLeft={{ base: "1rem", md: "3rem" }}>
            {isAuthenticated ? <Text> {user.name} </Text> : null}
          </Box>

          <Box marginLeft={{ base: "3rem", md: "9rem" }}>
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
            colorScheme="orange"
            disabled={!stripe}
           
            marginTop={{base:"3rem", md:"8rem"}}
            width={{ base: "100%", md: "100%" }}
            
          >
            {loading ? <BarLoader /> : <Text>Comprar</Text>}
          </Button>
        </form>
        
      </Box>
      
      <Box maxWidth="40%" marginTop={{ base: "3rem", md: "0" }}>
      <Player 
        src= 'https://assets2.lottiefiles.com/packages/lf20_tsmRqX.json'
        className="player"
        loop
        autoplay
      />
      </Box>
      <Box maxWidth="40%" marginTop={{ base: "3rem", md: "0" }}>
      <Player 
        src= 'https://assets2.lottiefiles.com/packages/lf20_cdHr9R.json'
        className="player"
        loop
        autoplay
      />
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
