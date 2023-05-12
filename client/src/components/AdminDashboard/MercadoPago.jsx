import React, {useEffect, useState} from 'react';
import { Box, Table, Tbody, Td, Th, Thead, Tr, Input} from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import Paginations from './Paginación';


//https://www.youtube.com/watch?v=eh46ZaVAT0A (video de MercadoPago)

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

//SEARCHBAR
const [search, setSearch] = useState("");
const [ingredients, setIngredients] = useState(VentasDB);

const handleOnChange = (e) => {
  e.preventDefault();
  setSearch(e.target.value);
};

useEffect(() => {
  filterByIngredients(search);
}, [VentasDB, search]);

const filterByIngredients = (value) => {
  let arrayCache = [...VentasDB];
  if (!search) setIngredients(VentasDB);
  else {
    arrayCache = arrayCache.filter((product) =>
      product.Email.toLowerCase().includes(value.toLowerCase())
    );

    setIngredients(arrayCache);
  }
};

//FIN SEARCHBAR

//PAGINADO

const [currentPage, setCurrentPage] = useState(1); //Pagina Actual seteada en 1
const [numberOfPage, setNumberOfPage] = useState(0); //Numero de Paginas seteado en 0
const [totalIngredients, setTotalIngredients] = useState(VentasDB);

const indexFirstPageIngredient = () => (currentPage - 1) * 9; // Indice del primer Elemento
const indexLastPageIngredient = () => indexFirstPageIngredient() + 9; //Indice del segundo elemento

const handlePageNumber = (number) => {
  setCurrentPage(number);
};

useEffect(() => {
  setTotalIngredients(
    ingredients.slice(indexFirstPageIngredient(), indexLastPageIngredient())
  );
  setNumberOfPage(Math.ceil(ingredients.length / 9)); // cambiando el estado local de numeros de paginas a renderiza
}, [ingredients, currentPage]);

//FIN PAGINADO

  
  
  
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
    <Box maxWidth={{ base: "70%", md: "98%" }}
    marginLeft={{ base: "-6.5rem", md: "-4rem" }}>
    <Box display="flex" alignItems="center">
    <Input
      type="text"
      placeholder="Buscar venta por Email "
      onChange={handleOnChange}
      value={search}
      autoComplete="off"
      width="30rem"
      background="white"
      margin="10px"
    />
  </Box>
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
        {totalIngredients.map((venta, index) => (
          <Tr key={index}>
            <Td wordBreak={{base:"break-all", md:"normal"}}>{venta.Email}</Td>
            <Td wordBreak={{base:"break-all", md:"normal"}}>{venta.Producto}</Td>
            <Td>{venta.Precio}</Td>
            <Td wordBreak={{base:"break-all", md:"normal"}}>{venta.Fecha}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    <Box width="100%" marginBottom="2rem">
          <br />
          {DBMERCADOPAGO && (
            <Paginations
              currentPage={currentPage}
              numberOfPage={numberOfPage}
              handlePageNumber={handlePageNumber}
            />
          )}
        </Box>
    </Box>
    
  );
};


export default MercadoPago
