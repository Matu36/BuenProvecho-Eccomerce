import React, { useEffect } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { BarLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import mercadopagoimg from "../../img/mercpago.jpg";
import axios from "axios";


/*
Primero crear una aplicacion en MercadoPago, luego ir a esta pagina https://www.mercadopago.com.ar/developers/panel/app;
Fijarse en credenciales de Prueba; ahi estan nuestro acces token y api key;
Poner en variables de entorno:

*/

const CheckoutMP = () => {
  const { user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers(user));
  }, [user]);

  // const Usuario = user.name;

  const carro = useSelector((state) => state.cart);

  //Suma los precios de todos los productos del carrito
  const totalEfectivo = carro.reduce(
    (total, producto) => total + producto.Efectivo * producto.quantity,
    0
  );
  //Manda los nombres de los productos elegidos en el carrito en un array
  const carroNombre = carro.map((product) => product.Nombre);
  
  return (
  
<Box backgroundImage={{
        base: "none",
        md: `linear-gradient(to bottom, rgba(0,0,0,0) 40%,rgba(0,0,0,0) 90%,rgba(1,0,5,3) 100%), url(${mercadopagoimg})`,
      }}backgroundRepeat="no-repeat"
      backgroundSize="contain"
      height="100vh">

<Flex>

{isAuthenticated ? (
 <Box> {user.name} </Box> 
) : null }

<Box> Total a Pagar {totalEfectivo}</Box>


</Flex>

<Button onClick={() => {
  axios.post ('http://localhost:3001/payment', {
        
        // id:123,
        title: "Productos",
        description: carroNombre,
        price: totalEfectivo,
        
    
}).then((res) => window.location.href = res.data.response.body.init_point);
// Segunda solicitud
axios.post('http://localhost:3001/paymentDBLOCAL', {
  Nombre: carroNombre.toString(),
  Useremail: isAuthenticated ? user.email : "sinemail@hotmail.com",
  Precio:totalEfectivo
}).then((res) => {
  // Manejar la respuesta de la segunda solicitud
  console.log("Pago Realizado", res.data);
  // ...
}).catch((error) => {
  // Manejar el error de la segunda solicitud
  console.error("No se completo la transacción", error);
  // ...
});


}}>Pagar</Button>

</Box>



)};

export default CheckoutMP;
