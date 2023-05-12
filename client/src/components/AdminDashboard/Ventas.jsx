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

const STRIPE = process.env.REACT_APP_STRIPE;

const stripe = new Stripe(
  STRIPE
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
      <Box marginLeft= {{base:"-6rem", md:"-2rem"}}>
      <Table variant="striped" colorScheme="teal" maxWidth={{base:"97%", md:"90%"}}>
        <Thead>
          <Tr padding={{ base: "2px", md: "2px" }}>
            <Th style={{ paddingBottom: "0.5rem" }}>Id Compra</Th>
            <Th style={{ paddingBottom: "0.5rem", paddingLeft: "0.5rem" }}>
              Email
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
              style={{ wordBreak: "break-all" }}
            >
              <Td>{cargo.id} </Td>
              <Td paddingLeft="0.5rem">{cargo.metadata.user_email}</Td>
              
              <Td paddingLeft="0.5rem">${cargo.amount}</Td>
              <Td paddingLeft="0.5rem">{cargo.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </Box>
      <Box width="100%" marginBottom="2rem" marginLeft={{base:"-5rem", md:"5rem"}}>
          <br />
      <Box mt="4">
        
      <HStack spacing={{base:0, md:2}} mt={{base:0, md:4}}>
          
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
          
        </HStack>
      </Box>
      </Box>
    </>
  );
}
