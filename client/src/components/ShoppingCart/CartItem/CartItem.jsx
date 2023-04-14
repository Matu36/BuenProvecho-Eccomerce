import React from "react";
import { Button, Text, Box, Image, Flex, Divider } from "@chakra-ui/react";
import {AiOutlineCloseCircle, AiOutlineMinusCircle, AiFillPlusCircle} from "react-icons/ai";
import { ADD_TO_CART } from "../../../Redux/actions";
import { useDispatch } from "react-redux";
 
export default function CartItem({data, delFromCart}) {

    const dispatch = useDispatch ();

    const addToCartHandler = () => {
        dispatch({ type: ADD_TO_CART, payload: id });
    }

let {id, Imagen, Nombre, Efectivo, quantity} = data;

return (


<Box>
    
    <Flex backgroundColor= "gray.100">
    
<Box maxW= "30%" height= "150px" marginTop= "1.5rem" >
<Image boxSize="150px" objectFit="cover" src={Imagen} />
  
</Box>
<Box>
    <Box>
    <Button marginLeft= "25rem" onClick={()=> delFromCart(id, true)} background= "none" 
    _hover={{background: "none", color: "white"}}  fontSize= "24px" > <AiOutlineCloseCircle /> </Button>
    </Box>
    <Box marginTop="-1rem">
<Text fontSize="1xl" fontWeight="bold" mb={1} mx={7}> {Nombre} </Text>
<br />
<br />
<Box display="flex" mx={2}>
<Text fontSize="1xl" fontWeight="bold" mx={5} > S/. ${Efectivo}</Text>
<Text fontSize="1xl" fontWeight="bold" mx={5} > Cantidad: {quantity} </Text>
<Text fontSize="1xl" fontWeight="bold" mx={5} > Sub total:  ${Efectivo * quantity}.00 </Text>
</Box>
</Box>
<Box marginLeft={135}>
<Button onClick={()=> delFromCart(id)}> <AiOutlineMinusCircle /> </Button>
<Button onClick={addToCartHandler}> <AiFillPlusCircle /> </Button>

</Box>
<Divider my={1} borderBottom="1px solid black" ml={4} />
</Box>

</Flex>

</Box>

)

}