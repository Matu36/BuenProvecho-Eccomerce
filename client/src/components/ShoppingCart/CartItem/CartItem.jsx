import React from "react";
import { Button, Text, Box, Image, Flex, Divider } from "@chakra-ui/react";
import {AiOutlineCloseCircle, AiOutlineMinusCircle, AiFillPlusCircle} from "react-icons/ai";
import { ADD_TO_CART } from "../../../Redux/actions";
import { useDispatch } from "react-redux";
 
export default function CartItem({data, delFromCart, clearCart}) {

    const dispatch = useDispatch ();

    const addToCartHandler = () => {
        dispatch({ type: ADD_TO_CART, payload: id });
    }

let {id, Imagen, Nombre, Efectivo, quantity} = data;

return (


<Box marginTop={{base:"-1rem", md:"0"}}>
    
    <Flex backgroundColor= "gray.100">
    
<Box maxW= {{base:"30%", md:"30%" }} height= {{base:"50px", md:"150px"}} marginTop={{base: "1rem", md:"1.5rem"}} 
>
<Image marginLeft={{base:"1rem", md:"0"}} boxSize={{base:"70px", md:"150px"}} objectFit="cover" src={Imagen} />
  
</Box>
<Box width={{ base: '70%', md: 'auto' }}
  maxWidth={{ base: '100%', md: '600px' }}>
    <Box>
    <Button marginLeft= {{base:"5rem", md:"25rem"}} marginTop={{base:"0rem", md:"0"}} onClick={()=> delFromCart(id, true)} background= "none" 
    _hover={{background: "none", color: "white"}}  fontSize= "24px" > <AiOutlineCloseCircle /> </Button>
    </Box>
    <Box marginTop="-1rem">
<Text fontSize="1xl" fontWeight="bold" mb={1} mx={7}> {Nombre} </Text>
<br />
<br />
<Box display={{base: "block", md: "flex"}} mx={{base: 0, md: 2}} ml={{base: -70, md: 4}}mt={{base:-8, md:0}}>
<Text fontSize="1xl" fontWeight="bold" mx={5} > S/. ${Efectivo}</Text>
<Text fontSize="1xl" fontWeight="bold" mx={5} > Cantidad: {quantity} </Text>
<Text fontSize="1xl" fontWeight="bold" mx={5} > Sub total:  ${Efectivo * quantity}.00 </Text>
</Box>
</Box>
<Box marginLeft={{base:10, md:135}} display={{base:"flex"}} >
<Button marginTop={{base:"-3.5rem", md:"0"}} onClick={()=> delFromCart(id)}> <AiOutlineMinusCircle /> </Button>
<Button marginTop={{base:"-3.5rem", md:"0"}} onClick={addToCartHandler}> <AiFillPlusCircle /> </Button>

</Box>
<Divider my={{base: 3, md: 1}} borderBottom="1px solid black" ml={{base: -7, md: 0}} />

</Box>

</Flex>

</Box>

)

}