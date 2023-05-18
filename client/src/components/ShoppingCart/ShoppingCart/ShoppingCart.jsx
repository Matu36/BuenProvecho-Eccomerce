import React, { useEffect, useState } from "react";
import {
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
} from "../../../Redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { Box, Flex, Text, Button, Divider } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import BotonMP from "../../MercadoPago/BotonMP";
import AuthButton from "../../Auth0";
import Swal from "sweetalert2";

export default function ShoppingCart() {
  const { cart } = useSelector((state) =>
    state ? state : { comidas: [], cart: [] }
  );

  const { user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch();

  const [logueado, setLogueado] = useState();

  const sinLoguear = () => {
    if (!logueado) {
      Swal.fire({
        title: "Debes iniciar sesión para realizar pagos",
        position: "center",
      });
    }
  };

  //LOCALSTORAGE

  //En el estado global Cart, en el reducer traigo las cosas del carrito (es lo que muestro);
  //Tambien se modifico la funcion que agrega cosas en el carrito para que tambien las
  //agregue en el local storage.
  //traigo todo el carrito actualizado.

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, user, isAuthenticated]);

  //Elimino las cosas del carrito y tambien del local storage
  const delFromCart = (id, all = false) => {
    console.log(id, all);
    if (all) {
      dispatch({ type: REMOVE_ALL_FROM_CART, payload: id });
    } else {
      dispatch({ type: REMOVE_ONE_FROM_CART, payload: id });
    }
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  //Elimino todo el carrito y tambien del local storage
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
    localStorage.removeItem("cart");
  };

  //FIN LOCAL STORAGE

  const totalPrice = () => {
    const total = cart.reduce(
      (acc, item) => acc + item.Efectivo * item.quantity,
      0
    );
    return total;
  };

  const MercadoPago = totalPrice() * 1.05;

  return (
    <Box
      borderWidth="20px"
      borderLeftWidth="20px"
      borderRightWidth="20px"
      solid
      borderColor="gray.500"
    >
      <Box justifyContent="center" alignItems="center" textAlign="center">
        <Text
          fontSize="2rem"
          fontFamily="heading"
          fontWeight="bold"
          marginTop="1rem"
        >
          {" "}
          Mi carrito de Compras{" "}
        </Text>
      </Box>
      <Flex marginTop={{ base: "-5rem", md: "-3.5rem" }}>
        <Box
          marginLeft={{ base: "0rem", md: "4rem" }}
          marginTop={{ base: "6rem", md: "5rem" }}
          sx={{
            // Estilos específicos para el rango 768px - 1000px
            "@media (min-width: 768px) and (max-width: 1000px)": {
              maxWidth: "55%",
              marginTop: "3rem",
            },
            "@media (min-width: 0px) and (max-width: 410px)": {
              maxWidth: "40%",
              marginTop: "8rem",
            },
          }}
        >
          <br />
          <Box>
            {cart.map((item, index) => (
              <CartItem key={index} data={item} delFromCart={delFromCart} />
            ))}
          </Box>
          <Box>
            <Button marginTop="2rem" onClick={clearCart}>
              Limpiar el Carrito
            </Button>
          </Box>
        </Box>
        <Divider
          marginLeft={1}
          orientation="vertical"
          borderLeft="1px solid black"
          h="600px"
          marginTop="6rem"
        />
        <Box
          marginLeft={{ base: "0.5rem", md: "auto" }}
          marginRight={{ base: "0", md: "11rem" }}
          marginTop={{ base: "7rem", md: "9rem" }}
        >
          <Text fontSize="xl" fontWeight="bold">
            Detalle Total
          </Text>
          <br />
          <Box>
            <Text>Precio Total: ${totalPrice()}</Text>
            <Text>Precio MercadoPago (5%): ${MercadoPago}</Text>
          </Box>
          <br />

          <Divider border="1px solid black"></Divider>
          <br />

          <Text fontSize="20px" fontWeight="bold">
            Total: ${MercadoPago}
          </Text>
          <br />
          <br />

          {isAuthenticated ? ( 
            <Link to="/Checkout">
              <Button fontSize={{ base: "12px", md: "16px" }}>
                {" "}
                Pagar con Tarjeta{" "}
              </Button>
            </Link>
          ) : ( 
            <Button
              onClick={sinLoguear}
              fontSize={{ base: "12px", md: "16px" }}
            >
              {" "}
              Pagar con Tarjeta{" "}
            </Button>
           )} 
          <br />
          <br />

          <BotonMP />
          <br />
          <br />
          {!isAuthenticated ? (
            <>
              <Text color="gray.300" marginLeft="1rem" fontWeight="bold">
                {" "}
                Te podés loguear aca{" "}
              </Text>
              <br />
              <Box marginLeft={{ base: "2.5rem", md: "5rem" }}>
                <AuthButton />
              </Box>
            </>
          ) : null}
        </Box>
      </Flex>
    </Box>
  );
}
