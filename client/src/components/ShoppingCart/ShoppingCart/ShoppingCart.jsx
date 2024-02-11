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
import cartImage from "../../../img/cartImage.png";

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
      style={{
        backgroundImage: `url(${cartImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Box justifyContent="center" alignItems="center" textAlign="center"></Box>
      <Flex justify="space-between">
        <Box
          marginLeft={{ base: "2rem", md: "8rem" }}
          marginTop={{ base: "1rem", md: "1rem" }}
          sx={{
            // Estilos específicos para el rango 765px - 1022px
            "@media(max-width: 1022px)": {
              maxWidth: "50%",
            },
            // Estilos específicos para el rango hasta 530px
            "@media (max-width: 530px)": {
              maxWidth: "35%",
            },
          }}
        >
          <br />
          <Box>
            {cart.map((item, index) => (
              <CartItem key={index} data={item} delFromCart={delFromCart} />
            ))}
          </Box>
          {cart < 1 ? (
            <Text fontSize="30px" fontWeight="bold">
              {" "}
              El carrito esta vacio
            </Text>
          ) : (
            <Box display="flex" justifyContent="flex-end">
              <Button
                marginTop="2rem"
                onClick={clearCart}
                background="red.400"
                color="white"
                _hover={{ background: "red", color: "white" }}
                fontSize={{ base: "12px", md: "" }}
              >
                Limpiar el Carrito
              </Button>
            </Box>
          )}
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          position="fixed"
          top="14"
          right="10"
          marginRight="0"
          overflow="hidden"
        >
          <Text fontSize="xl" fontWeight="bold">
            Detalle Total
          </Text>
          <br />
          <Box>
            <Text>Precio Total: ${totalPrice()}</Text>
            <Text>Precio MercadoPago (5%):</Text>
            <Text>${MercadoPago}</Text>
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
              <Button
                fontSize={{ base: "9px", md: "18px" }}
                maxW={{ base: "55%", md: "100%" }}
              >
                {" "}
                Pagar con Tarjeta{" "}
              </Button>
            </Link>
          ) : (
            <Button
              onClick={sinLoguear}
              fontSize={{ base: "9px", md: "18px" }}
              maxW={{ base: "55%", md: "100%" }}
            >
              {" "}
              Pagar con Tarjeta{" "}
            </Button>
          )}
          <br />

          <BotonMP />
          <br />
          {!isAuthenticated ? (
            <>
              <Text color="white" marginLeft="1rem" fontWeight="bold">
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
