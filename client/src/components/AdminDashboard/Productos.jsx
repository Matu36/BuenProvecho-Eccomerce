import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginacion from "./Paginación";
import { BiEditAlt, BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { updateComida, deleteComida } from "../../Redux/actions/index";
import { Button, Input } from "@chakra-ui/react";
import FormProduct from "./FormProduct";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { CgCloseO } from "react-icons/cg";
import { DeleteIcon } from "@chakra-ui/icons";
import "./Styles.css";

export default function Productos() {
  let dispatch = useDispatch();
  const productos = useSelector((state) => state.comidas);

  const sortedProductos = [...productos].sort((a, b) => a.id - b.id);

  const rows = sortedProductos.map((product) => {
    return {
      id: product.id,
      Nombre: product.Nombre,
      Efectivo: product.Efectivo,
      Categoria: product.Categoria,
      Imagen: product.Imagen,
      MercadoPago: product.MercadoPago,
    };
  });

  //MOSTRANDO EL FORMULARIO DE CREACION //

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  function handleMostrarFormulario() {
    setMostrarFormulario(true);
  }

  function handleCerrarFormulario() {
    setMostrarFormulario(false);
  }

  //SEARCHBAR
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState(rows);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    filterByIngredients(search);
  }, [rows, search]);

  const filterByIngredients = (value) => {
    let arrayCache = [...rows];
    if (!search) setIngredients(rows);
    else {
      arrayCache = arrayCache.filter((product) =>
        product.Nombre.toLowerCase().includes(value.toLowerCase())
      );

      setIngredients(arrayCache);
    }
  };

  //FIN SEARCHBAR

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta comida?")) {
      dispatch(deleteComida(id));
      window.location.reload();
    }
  };

  //PAGINADO

  const [currentPage, setCurrentPage] = useState(1); //Pagina Actual seteada en 1
  const [numberOfPage, setNumberOfPage] = useState(0); //Numero de Paginas seteado en 0
  const [totalIngredients, setTotalIngredients] = useState(rows);

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

  //EDITAR PRECIO

  const [editIndex, setEditIndex] = useState(null);
  const [editPrice, setEditPrice] = useState(null);

  const handleEdit = (id, Efectivo) => {
    setEditIndex(id);
    setEditPrice(Efectivo);
  };

  const handlePriceChange = (Efectivo) => {
    setEditPrice(Efectivo);
  };

  const handleSave = (id) => {
    const updatedComida = {
      id: id,
      Efectivo: editPrice,
    };
    dispatch(updateComida(updatedComida));
    setEditIndex(null);
    setEditPrice(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditPrice(null);
  };

  //FIN EDITAR PRECIO

  const columns = [
    { field: "id", headerName: "id", width: 5 },
    { field: "Nombre", headerName: "Nombre", width: 130 },
    { field: "Efectivo", headerName: "Efectivo", width: 130 },
    { field: "Categoria", headerName: "Categoria", width: 130 },
    {
      field: "Acciones",
      headerName: "Acciones",
      width: 130,
      renderCell: (id) => (
        <button onClick={() => handleDelete(id)}>Eliminar</button>
      ),
    },
  ];

  return (
    <Box
      maxWidth={{ base: "90%", md: "none" }}
      marginLeft={{ base: "-5rem", md: "0" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Input
          type="text"
          placeholder="Buscar Comida "
          onChange={handleOnChange}
          value={search}
          autoComplete="off"
          width="30rem"
          background="white"
          margin="10px"
        />
      </div>
      <Button
        marginLeft={{ base: "12rem", md: "35em" }}
        onClick={handleMostrarFormulario}
      >
        Agregar Comida
      </Button>
      <h1 className="titleIngredients">Productos</h1>
      {mostrarFormulario && (
        <div
          style={{
            position: "fixed",
            top: "45%",
            left: "45%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "10px",
            zIndex: "999",
          }}
        >
          <button fontSize="2rem" onClick={handleCerrarFormulario}>
            <CgCloseO />
          </button>
          <FormProduct />
        </div>
      )}

      <Box maxW="120%">
        <Table variant="striped" colorScheme="teal" width="100%">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th padding={{ base: "5px", md: "10px" }} key={column.field}>
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
                    padding={{ base: "8px", md: "10px" }}
                    width="20%"
                    id={row.id}
                    key={`${row.id}-${column.field}`}
                  >
                    {column.field === "Efectivo" &&
                    editPrice !== null &&
                    editIndex === row.id ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Input
                          type="number"
                          value={column.field === "Efectivo" ? editPrice : null}
                          onChange={(e) =>
                            column.field === "Efectivo"
                              ? handlePriceChange(e.target.value)
                              : null
                          }
                        />

                        <button
                          type="button"
                          style={{ fontSize: "24px" }}
                          onClick={() =>
                            column.field === "Efectivo"
                              ? handleSave(row.id)
                              : null
                          }
                          title="Guardar"
                        >
                          <BiSave />
                        </button>

                        <button
                          type="button"
                          style={{ fontSize: "24px" }}
                          onClick={
                            column.field === "Efectivo" ? handleCancel : null
                          }
                          title="Cancelar"
                        >
                          <MdCancel />
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>{row[column.field]}</div>
                        {column.field === "Efectivo" && (
                          <Box ml="auto">
                            <button
                              style={{ fontSize: "24px" }}
                              onClick={() =>
                                column.field === "Efectivo"
                                  ? handleEdit(row.id, row.Efectivo)
                                  : null
                              }
                            >
                              <BiEditAlt />
                            </button>
                          </Box>
                        )}

                        {column.field === "Acciones" && (
                          <Box ml="auto">
                            <button
                              className="btn"
                              // style={{ fontSize: "24px", marginLeft: "-7rem" }}
                              onClick={() => handleDelete(row.id)} // aquí se pasa el ID
                            >
                              <DeleteIcon />
                            </button>
                          </Box>
                        )}
                      </div>
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box width="100%" marginBottom="2rem">
          <br />
          {productos && (
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
