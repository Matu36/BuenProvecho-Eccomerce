import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
// import { getUsers } from "../../Redux/actions";
import { Table, Thead, Tbody, Tr, Th, Td, Input } from "@chakra-ui/react";

import Paginacion from "./Paginación";
import "./Styles.css";

export default function Usuarios() {
  // const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const sortedusers = [...users].sort((a, b) => a.id - b.id);
  /* useEffect(() => {
    dispatch(getUsers({ id: 1, email: "matipineda857@gmail.com" }));
  }, []); */

  const user = sortedusers.map((u) => {
    const role = u.role === false ? "Administrador" : "Usuario";
    return {
      id: u.id,
      email: u.email,
      address: u.address,
      role: role,
      createdAt: u.createdAt,
    };
  });

  

  //SEARCHBAR
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState(user);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    filterByIngredients(search);
  }, [user, search]);

  const filterByIngredients = (value) => {
    let arrayCache = [...user];
    if (!search) setIngredients(user);
    else {
      arrayCache = arrayCache.filter((product) =>
        product.email.toLowerCase().includes(value.toLowerCase())
      );

      setIngredients(arrayCache);
    }
  };

  //FIN SEARCHBAR

  //PAGINADO

  const [currentPage, setCurrentPage] = useState(1); //Pagina Actual seteada en 1
  const [numberOfPage, setNumberOfPage] = useState(0); //Numero de Paginas seteado en 0
  const [totalIngredients, setTotalIngredients] = useState(user);

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

  const columns = [
    { field: "id", headerName: "id", width: 5 },
    { field: "email", headerName: "email", width: 130 },
    { field: "address", headerName: "Direccion", width: 130 },
    { field: "role", headerName: "Role", width: 130 },
    { field: "createdAt", headerName: "Ingreso", width: 130 },
  ];

  return (
    <Box
      marginLeft={{ base: "-5rem", md: "0" }}
      maxWidth={{ base: "90%", md: "none" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Input
          type="text"
          placeholder="Buscar Usuario "
          onChange={handleOnChange}
          value={search}
          autoComplete="off"
          width="30rem"
          background="white"
          margin="10px"
        />
      </div>
      <h1 className="titleIngredients">Usuarios</h1>
      <Box maxW={{ base: "100%", md: "100%" }}>
        <Table variant="striped" colorScheme="teal" width="100%">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th padding={{ base: "2px", md: "10px" }} key={column.field}>
                  {column.headerName}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {totalIngredients.map((row, index) => (
              <Tr width="10%" key={index}>
                {columns.map((column) => (
                  <Td
                    padding={{ base: "1px", md: "10px" }}
                    width="20%"
                    id={row.id}
                    key={`${row.id}-${column.field}`}
                    style={{
                      wordBreak: "break-all",
                      maxWidth: column.field === "email" ? "50%" : "none",
                    }}
                  >
                    {row[column.field]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box width="100%" marginBottom="2rem">
          <br />
          {users && (
            <Paginacion
              currentPage={currentPage}
              numberOfPage={numberOfPage}
              handlePageNumber={handlePageNumber}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
