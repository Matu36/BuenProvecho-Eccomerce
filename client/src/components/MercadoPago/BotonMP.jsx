import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'


const BotonMP = () => {
  return (

   <Box>
    <Link to= "/CheckoutMP">
<Button
     fontSize={{base:"9px", md:"18px"}}
     backgroundColor="#009ee3"
     color="#fff"
     _hover={{ backgroundColor: "#0077b3" }}
     
   >
     Pagar con MercadoPago
   </Button>
   </Link>
   </Box>
   
  )
}

export default BotonMP
