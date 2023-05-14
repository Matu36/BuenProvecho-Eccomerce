import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Table,
  Th,
  Tbody,
  Td,
  Tr,
  Thead,
} from "@chakra-ui/react";
import Stripe from "stripe";

const STRIPE = process.env.REACT_APP_STRIPE;

const stripe = new Stripe(STRIPE);

export default function WidgetLg() {
  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    async function obtenerCargos() {
      const resultado = await stripe.charges.list({ limit: 100 });
      setCargos(resultado.data);
    }

    obtenerCargos();
  }, []);

  const VentasSlice = cargos.slice(0, 3);

  return (
    <Box
      bg="white"
      borderRadius="2%"
      boxShadow="sm"
      p="4"
      marginLeft={{ base: "2rem", md: "2rem" }}
      backgroundColor="blue.400"
      maxWidth={{ base: "85%", md: "90%" }}
    >
      <Heading
        as="h3"
        size="sm"
        mb="2"
        marginLeft={{ base: "2.5rem", md: "8rem" }}
        fontSize={{ base: "20px", md: "20px" }}
        fontWeight="bold"
        color="white"
      >
        Últimas ventas realizadas
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Precio</Th>
            <Th>Producto</Th>
          </Tr>
        </Thead>
        <Tbody>
          {VentasSlice.map((venta) => (
            <Tr key={venta.id}>
              <Td
                style={{ wordBreak: "break-all" }}
                maxWidth={{ base: "15%", md: "30%" }}
                _only={{ base: { wordBreak: "break-all" } }}
              >
                {venta.metadata.user_email}
              </Td>
              <Td>${venta.amount}</Td>
              <Td style={{ wordBreak: "break-all" }}>{venta.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
