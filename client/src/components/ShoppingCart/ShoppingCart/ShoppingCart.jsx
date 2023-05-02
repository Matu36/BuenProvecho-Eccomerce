import React, { useEffect, useState } from "react";
import {
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
} from "../../../Redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { Box, Flex, Text, Button, Icon, Divider } from "@chakra-ui/react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";


export default function ShoppingCart() {
  const { cart } = useSelector((state) =>
    state ? state : { comidas: [], cart: [] }
  );
  
  const { user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch();

  //LOCALSTORAGE

  //En el estado global Cart, en el reducer traigo las cosas del carrito (es lo que muestro);
  //Tambien se modifico la funcion que agrega cosas en el carrito para que tambien las
  //agregue en el local storage.
   //traigo todo el carrito actualizado.

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
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
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
//Elimino todo el carrito y tambien del local storage
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
    localStorage.removeItem('cart');
    
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
      borderWidth="40px"
      borderLeftWidth="40px"
      borderRightWidth="40px"
      solid
      borderColor="yellow.300"
    >
      <Flex>
        <Box
          marginLeft={{ base: "1rem", md: "4rem" }}
          marginTop={{ base: "1rem", md: "3rem" }}
        >
          <Button
            as="a"
            background="none"
            _hover={{ background: "none" }}
            href="/"
            leftIcon={<Icon as={MdOutlineArrowBackIosNew} />}
            color="#0077CC"
            fontSize="20px"
            marginLeft={{ base: "0", md: "-1rem" }}
            marginTop={{ base: "-1rem", md: "-5rem" }}
            padding="5px"
            borderRadius="5px"
            bg="none"
          >
            Home
          </Button>

          <Text fontSize={{ base: "18px", md: "2xl" }} fontWeight="bold" mb={6}>
            Mi Carrito de Compras
            <Button
              display={{ base: "none", md: "flex" }}
              marginLeft={{ base: "2rem", md: "28rem" }}
              onClick={clearCart}
            >
              Limpiar el Carrito
            </Button>
          </Text>

          <Box>
            {cart.map((item, index) => (
              <CartItem key={index} data={item} delFromCart={delFromCart} />
            ))}
          </Box>
          <Box>
            <Button
              display={{ base: "flex", md: "none" }}
              marginTop="2rem"
              onClick={clearCart}
            >
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
        </Box>
      </Flex>
    </Box>
  );
}
