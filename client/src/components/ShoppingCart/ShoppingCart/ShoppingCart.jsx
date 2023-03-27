import React from "react";
import {CLEAR_CART, REMOVE_ALL_FROM_CART, REMOVE_ONE_FROM_CART } from "../../../Redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import Carrito from "../../../img/Carrito.jpg"


export default function ShoppingCart () {

const { products, cart } = 
useSelector((state) => state ? state : { products: [], cart: [] });
console.log (products)

const dispatch = useDispatch();


const delFromCart = (id, all = false) => {
    console.log (id, all);
    if (all) {
        dispatch ({type: REMOVE_ALL_FROM_CART, payload:id})
    } else {
        dispatch ({type: REMOVE_ONE_FROM_CART, payload:id})
    }
};

const clearCart = () => {
    dispatch ({type: CLEAR_CART})
};


const totalPrice = () => {
    const total = cart.reduce((acc, item) => acc + (item.Efectivo * item.quantity), 0);
    return total;
}

return (
    <Box borderWidth="40px" borderLeftWidth="40px" borderRightWidth="40px" solid
    borderColor= "yellow.300">
<Flex>



<Box marginLeft= "4rem" marginTop= "4rem">
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
      <Text fontSize="2xl" fontWeight="bold" mt={4}>Precio Total: ${totalPrice()}</Text>

</Box>

<Box maxW="50%" marginTop= "6rem">
<Image src= {Carrito} marginLeft="5rem"></Image>
</Box>
</Flex>
    </Box>
)

}