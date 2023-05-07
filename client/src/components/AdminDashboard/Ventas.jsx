import React, { useState, useEffect } from "react";
import Stripe from "stripe";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  HStack,
  Button,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const stripe = new Stripe(
  "sk_test_51N42BCBSrEQZgu90tmmqu1XosIWVVDIqXPNgr9VRjhfgEXc8oIEukd9Nzu7D7GgCXmHtp9db49YJBwDS12yF9xrB00diqyimcv"
);

export default function ListaDeCargos() {
  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    async function obtenerCargos() {
      const resultado = await stripe.charges.list({ limit: 100 });
      setCargos(resultado.data);
    }

    obtenerCargos();
  }, []);

  
  //PAGINADO

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // número de elementos por página
  const totalPages = Math.ceil(cargos.length / itemsPerPage); // número total de páginas

  const getPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return cargos.slice(startIndex, endIndex);
  };

  // FIN PAGINADO

  return (
    <>
      <Box></Box>
      <Table variant="striped" colorScheme="teal" maxWidth="90%">
        <Thead>
          <Tr padding={{ base: "2px", md: "2px" }}>
            <Th style={{ paddingBottom: "0.5rem" }}>Id Compra</Th>
            <Th style={{ paddingBottom: "0.5rem", paddingLeft: "0.5rem" }}>
              Email
            </Th>
            <Th style={{ paddingBottom: "0.5rem", paddingLeft: "0.5rem" }}>
              Moneda
            </Th>
            <Th style={{ paddingBottom: "0.5rem", paddingLeft: "0.5rem" }}>
              Precio
            </Th>
            <Th style={{ paddingBottom: "0.5rem", paddingLeft: "0.5rem" }}>
              Producto
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {getPageItems().map((cargo) => (
            <Tr
              paddingLeft={{ base: "1px", md: "0px" }}
              key={cargo.id}
              style={{ wordBreak: "break-all", maxWidth: "40%" }}
            >
              <Td>{cargo.id} </Td>
              <Td paddingLeft="0.5rem">{cargo.metadata.user_email}</Td>
              <Td paddingLeft="0.5rem">{cargo.currency}</Td>
              <Td paddingLeft="0.5rem">{cargo.amount}</Td>
              <Td paddingLeft="0.5rem">{cargo.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt="4">
      <HStack spacing={{base:0, md:2}} mt={{base:0, md:4}}>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            leftIcon={<FaChevronLeft />}
            size="sm"
        variant="ghost"
        colorScheme="gray"
          >
            Anterior
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "solid" : "ghost"}
              colorScheme={currentPage === i + 1 ? "purple" : "gray"}
              onClick={() => setCurrentPage(i + 1)}
              size="sm"
            >
              {i + 1}
            </Button>
          ))}
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            rightIcon={<FaChevronRight />}
            size="sm"
        variant="ghost"
        colorScheme="gray"
          >
            Siguiente
          </Button>
        </HStack>
      </Box>
    </>
  );
}
