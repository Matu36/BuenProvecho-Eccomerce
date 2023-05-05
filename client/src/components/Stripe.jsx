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
import { Box, Button, FormControl, Text } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
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

  const carro = useSelector((state) => state.cart);
  const totalEfectivo = carro.reduce((total, producto) => total + producto.Efectivo, 0);
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
            amount: totalEfectivo,  //aca va el precio de la sumatoria del carrito (fijarse tema centavos, dolares)
            Producto: carroNombre,
            
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
      solid
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      height="100vh"
      backgroundImage={`linear-gradient(to bottom, rgba(0,0,0,0) 40%,rgba(0,0,0,0) 90%,rgba(1,0,5,3) 100%), url(${Tarjetas})`}
    >
      <Box
        p="6"
        maxW="50%"
        mx="auto"
        height="50%"
        Box
        marginTop="13rem"
        backgroundColor="white"
        marginLeft="2rem"
      >
        <Text>DATOS DEL CLIENTE // DATOS DE LA COMPRA</Text>

        <form onSubmit={handleSubmit}>
          <FormControl marginTop="3rem">
            <CardElement
              options={{
                style: { base: { fontSize: "20px", fontWeight: "bold" } },
              }}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="green"
            disabled={!stripe}
            marginLeft="4rem"
            marginTop="3rem"
            width="400px"
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
