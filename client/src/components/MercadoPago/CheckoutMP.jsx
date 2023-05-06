import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { BarLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";


/*
Primero crear una aplicacion en MercadoPago, luego ir a esta pagina https://www.mercadopago.com.ar/developers/panel/app;
Fijarse en credenciales de Prueba; ahi estan nuestro acces token y api key;
Poner en variables de entorno:

PUBLIC KEY
TEST-4cba5a08-8f0c-482c-8d72-23b4a3f8bb39

ACCES TOKEN
TEST-1759500393190306-050614-e2dc1d133a4d3a14a529c3e1c1352114-95879648

*/

const CheckoutMP = () => {
  const { user } = useAuth0();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers(user));
  }, [user]);

  const Usuario = user.email;

  const carro = useSelector((state) => state.cart);

  //Suma los precios de todos los productos del carrito
  const totalEfectivo = carro.reduce(
    (total, producto) => total + producto.Efectivo * producto.quantity,
    0
  );
  //Manda los nombres de los productos elegidos en el carrito en un array
  const carroNombre = carro.map((product) => product.Nombre);


  return (
  
<Box>Hola</Box>



)};

export default CheckoutMP;
