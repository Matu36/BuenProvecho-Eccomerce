import React from "react";
import { Button, Text, Box } from "@chakra-ui/react";
 
export default function CartItem({data, delFromCart}) {

let {id, Nombre, Efectivo, quantity} = data;

return (

<Box>

<Text fontSize="1xl" fontWeight="bold" mb={1}> {Nombre} </Text>
<Text fontSize="1xl" fontWeight="bold" mb={1}>$ {Efectivo}.00 x {quantity} = ${Efectivo * quantity}.00 </Text>
<Button mt={4} onClick={()=> delFromCart(id)}> Remover de a 1 </Button>
<Button mt={4} onClick={()=> delFromCart(id, true)}> Remover Todo </Button>




</Box>

)

}