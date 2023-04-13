import React from "react";
import {
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
} from "../../../Redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { Box, Flex, Text, Button, Icon, Divider } from "@chakra-ui/react";
import {GiFastBackwardButton} from "react-icons/gi";

export default function ShoppingCart() {
  const { products, cart } = useSelector((state) =>
    state ? state : { products: [], cart: [] }
  );

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
            Mi Carrito de Compras 
            <Button marginLeft= "13rem" onClick={clearCart}>
            Limpiar el Carrito
          </Button>
          </Text>
          
          <Box>
            {cart.map((item, index) => (
              <CartItem key={index} data={item} delFromCart={delFromCart} />
            ))}
          </Box>
          <Box>
         
          </Box>
          
          
        </Box>
        <Divider marginLeft={2} orientation="vertical" borderLeft="1px solid black" h="400px" marginTop= "6rem" />
        <Box marginLeft="auto" marginRight={{ base: "1rem", md: "11rem" }} marginTop={{ base: "1rem", md: "9rem" }}>
        
          <Text fontSize="xl" fontWeight="bold">Detalle Total</Text>
          <br />

          <Text>Precio Total: ${totalPrice()}</Text>
          <Text>Precio MercadoPago (5%): ${MercadoPago}</Text>
          <br />

          <Divider border= "1px solid black"></Divider>
          <br />

          <Text fontSize= "20px" fontWeight= "bold">Total: ${MercadoPago}</Text>
          

        </Box>

        
      </Flex>
      
    </Box>
  );
}
