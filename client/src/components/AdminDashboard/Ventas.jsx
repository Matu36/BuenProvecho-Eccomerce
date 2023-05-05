import React, { useState, useEffect } from 'react';
import Stripe from 'stripe';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text } from "@chakra-ui/react";

const stripe = new Stripe("sk_test_51N42BCBSrEQZgu90tmmqu1XosIWVVDIqXPNgr9VRjhfgEXc8oIEukd9Nzu7D7GgCXmHtp9db49YJBwDS12yF9xrB00diqyimcv");

export default function ListaDeCargos() {
  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    async function obtenerCargos() {
      const resultado = await stripe.charges.list({ limit: 100 });
      setCargos(resultado.data);
    }

    obtenerCargos();
  }, []);

  return (
    <>
    <Box>
        <Text> Ventas con Tarjeta</Text>
    </Box>
    <Table variant= "striped" colorScheme="teal" width="90%">
      <Thead>
        <Tr>
          <Th>Id Compra</Th>
          <Th>Moneda</Th>
          <Th>Precio</Th>
          <Th>Producto</Th>
        </Tr>
      </Thead>
      <Tbody>
        {cargos.map((cargo) => (
          <Tr key={cargo.id}>
            <Td>{cargo.id}</Td>
            <Td>{cargo.currency}</Td>
            <Td>{cargo.amount}</Td>
            <Td>{cargo.description}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    </>
  );
}