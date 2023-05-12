import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import { useSelector } from 'react-redux';

//TODO LO QUE ESTA COMENTADO ERA PARA TRAER LA BASE DE DATOS DIRECTAMENTE DE MERPAGO


/* const MercadoPagoAccesToken = process.env.REACT_APP_MERCADOPAGO_ACCESS_TOKEN;

const baseUrl = 'https://api.mercadopago.com';
const accessToken = MercadoPagoAccesToken; */

const MercadoPago = () => {
  // const [ventasCombinadas, setVentasCombinadas] = useState([]);

const DBMERCADOPAGO = useSelector ((state) => state.mercadopago);
  
  const VentasDB = DBMERCADOPAGO.map (db => {
    return {
      Email: db.Useremail,
      Producto: db.Nombre,
      Precio: db.Precio,
      Fecha: db.createdAt

    }
    
  })
  
  /* useEffect(() => {
    // Realizar la solicitud para obtener la información de las ventas
    axios
      .get(`${baseUrl}/checkout/preferences`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
      .then(response => {
        // Aquí puedes manejar la respuesta de la API de MercadoPago
        const ventas = response.data;
        // Procesa la información de las ventas como necesites
        console.log(ventas);

        // Obtener el valor de client_id y date_created
        const ventasCombinadas = ventas.elements.map(venta => {
          return {
            client_id: venta.client_id,
            date_created: venta.date_created
          };
        });

        setVentasCombinadas(ventasCombinadas);
      })
      .catch(error => {
        // Maneja los errores de la solicitud
        console.error(error);
      });
  }, []); */

  return (
    <Table variant="striped" colorScheme="teal" width="100%">
      <Thead>
        <Tr>
          <Th>Cliente</Th>
          <Th>Producto</Th>
          <Th>Precio</Th>
          <Th>Fecha</Th>
        </Tr>
      </Thead>
      <Tbody>
        {VentasDB.map((venta, index) => (
          <Tr key={index}>
            <Td>{venta.Email}</Td>
            <Td>{venta.Producto}</Td>
            <Td>{venta.Precio}</Td>
            <Td>{venta.Fecha}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};


export default MercadoPago
