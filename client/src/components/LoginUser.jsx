import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {Box, Text, Image, Flex} from "@chakra-ui/react";
import { getUsers } from "../Redux/actions";
import {useDispatch } from "react-redux";
import LOGINFONDO from "../img/LOGINFONDO.jpg";
import BuenProvecho from "../img/Provecho.png";
import LoginFondoRespons from "../img/LOGINFONDORESPONS.png";
import { BarLoader } from 'react-spinners';


export default function LoggedInPage() {
    const {user, isAuthenticated } = useAuth0();
    
const navigate = useNavigate();

  const dispatch = useDispatch();
  
  //CON ESTA FUNCION UNA VEZ LOGUEADO, SE ENVIA EL USER POR QUERY PARA MATCHEAR 
  //CON LA BASE DE DATOS.
  useEffect(() => {
    dispatch(getUsers(user));
  }, [user]);


 // Esperar 5 segundos antes de redirigir
        /*     setTimeout(() => {
          navigate('/');
        }, 4000);    */

        // Estilo de fondo para dispositivos móviles


return (
isAuthenticated && (
<Box borderTopWidth={{base:"40px", md:"0px"}} borderColor="yellow.300" borderRadius={{base:"10%", md:"0"}}
   
sx={{
    
    height: {base: "100vh", md:'100vh'},
    width: '100vw',
    backgroundImage: {base:`url(${LoginFondoRespons})`, md:`url(${LOGINFONDO})`},
    backgroundSize: {base:'170% 100%', md:'cover'},
    backgroundRepeat: 'no-repeat',
    
  }}
 
>
<Flex>
  <Box marginLeft={{base:"14rem", md:"35rem"}} marginTop={{base:"10rem", md:"11rem"}}>
    <Text fontSize= {{base:"2rem", md:"2xl"}} fontWeight="bold" mb={4} fontFamily="unset" color="black" fontStyle="italic">
       {user.name}
    </Text>
  </Box>
  <Box
  
  
>
  
</Box>
</Flex>

<Image src={BuenProvecho} boxSize="140px" display={{base:"flex", md:"none"}} 
marginTop= "6rem"  marginLeft= "15rem"/>
<Box sx={{
  position: 'fixed',
  bottom: '5rem',
  right: {base:"4rem", md:'11rem'}
}}>
  <BarLoader color={'#123abc'} loading={true}height={10}  />
</Box>
<Box display={{base:"flex", md:"none"}} marginTop= "4rem" 

>

</Box>

</Box>

)
)
}
