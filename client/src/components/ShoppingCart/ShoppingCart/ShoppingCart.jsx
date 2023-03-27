import React from "react";
import {
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
} from "../../../Redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { Box, Flex, Image, Text, Button, Icon } from "@chakra-ui/react";
import Carrito from "../../../img/Carrito.jpg";
import {GiFastBackwardButton} from "react-icons/gi";

export default function ShoppingCart() {
  const { products, cart } = useSelector((state) =>
    state ? state : { products: [], cart: [] }
  );
  console.log(products);

  const dispatch = useDispatch();

  const delFromCart = (id, all = false) => {
    console.log(id, all);
    if (all) {
      dispatch({ type: REMOVE_ALL_FROM_CART, payload: id });
    } else {
      dispatch({ type: REMOVE_ONE_FROM_CART, payload: id });
    }
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const totalPrice = () => {
    const total = cart.reduce(
      (acc, item) => acc + item.Efectivo * item.quantity,
      0
    );
    return total;
  };

  return (
    
    <Box
    
      borderWidth="40px"
      borderLeftWidth="40px"
      borderRightWidth="40px"
      solid
      borderColor="yellow.300"
    >
      <Flex>
        <Box marginLeft={{base:"1rem", md:"4rem"}} marginTop={{base:"1rem", md:"4rem"}}>
        
        <Button as="a"
      href="/" leftIcon={<Icon as={GiFastBackwardButton} />}  color="#0077CC"
   fontSize="30px"
   marginLeft= {{base:"0", md:"-2rem"}}
   marginTop= {{base:"-1rem", md:"-5rem"}}
   padding="5px"
   borderRadius="5px"
   bg= "none">
                
              </Button>
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Carrito de Compras
          </Text>
          <Box>
            {cart.map((item, index) => (
              <CartItem key={index} data={item} delFromCart={delFromCart} />
            ))}
          </Box>
          <Button mt={4} onClick={clearCart}>
            Limpiar el Carrito
          </Button>
          <Text fontSize="2xl" fontWeight="bold" mt={4}>
            Precio Total: ${totalPrice()}
          </Text>
        </Box>

        <Box maxW="50%" marginTop={{base:"4rem", md:"2rem"}}>
          <Image src={Carrito} marginLeft={{base: "0rem", md: "5rem"}}></Image>
        </Box>
      </Flex>
    </Box>
  );
}
