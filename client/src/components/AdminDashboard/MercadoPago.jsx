import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
const MercadoPagoAccesToken = process.env.REACT_APP_MERCADOPAGO_ACCESS_TOKEN;

const baseUrl = 'https://api.mercadopago.com';
const accessToken = MercadoPagoAccesToken;

const MercadoPago = () => {
  const [ventasCombinadas, setVentasCombinadas] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <Table variant="striped" colorScheme="teal" width="100%">
      <Thead>
        <Tr>
          <Th>Cliente</Th>
          <Th>Fecha</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ventasCombinadas.map((venta, index) => (
          <Tr key={index}>
            <Td>{venta.client_id}</Td>
            <Td>{venta.date_created}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};


export default MercadoPago
