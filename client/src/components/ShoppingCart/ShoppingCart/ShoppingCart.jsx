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
import { Link, useNavigate } from "react-router-dom";
import BotonMP from "../../MercadoPago/BotonMP";
import AuthButton from "../../Auth0";
import Swal from "sweetalert2";
import cartImage from "../../../img/cartImage.png";
import { TiArrowBack } from "react-icons/ti";

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

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
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
      <Box display="flex" justifyContent="center">
        <Text
          fontFamily="perma"
          fontSize="xx-large"
          fontWeight="bold"
          marginBottom={{ base: "0", md: "1rem" }}
          marginTop={{ base: "3rem", md: "0" }}
        >
          Carrito de Compras
        </Text>
      </Box>
      <Box alignItems="center" textAlign="center"></Box>
      <Flex justifyContent={{ base: "center", md: "space-around" }}>
        <Box
          display={{ base: "block", md: "flex" }}
          justifyContent={{ base: "center", md: "space-around" }}
        >
          <br />
          <Box>
            <Box>
              {cart.map((item, index) => (
                <CartItem key={index} data={item} delFromCart={delFromCart} />
              ))}
            </Box>
            {cart < 1 ? (
              <Box>
                <Text fontSize="20px" fontWeight="bold" color="darkred">
                  {" "}
                  El carrito esta vacio
                </Text>
              </Box>
            ) : (
              <Box display="flex" justifyContent="flex-end">
                <Button
                  marginTop="1rem"
                  onClick={clearCart}
                  background="red.400"
                  marginBottom="1rem"
                  color="white"
                  _hover={{ background: "red", color: "white" }}
                  // fontSize={{ base: "12px", md: "" }}
                >
                  Limpiar el Carrito
                </Button>
              </Box>
            )}
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            marginLeft="2rem"
            marginTop="1rem"
            marginBottom="1rem"
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

            {isAuthenticated ? (
              <Link to="/Checkout">
                <Button fontSize="18px" maxW={{ base: "90%", md: "90%" }}>
                  {" "}
                  Pagar con Tarjeta{" "}
                </Button>
              </Link>
            ) : (
              <Button
                onClick={sinLoguear}
                fontSize="18px"
                maxW={{ base: "90%", md: "90%" }}
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
                <Text color="black" marginLeft="1rem" fontWeight="bold">
                  {" "}
                  Te podés loguear aca{" "}
                </Text>
                <br />
                <Box marginLeft={{ base: "4.5rem", md: "5rem" }}>
                  <AuthButton />
                </Box>
              </>
            ) : null}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
