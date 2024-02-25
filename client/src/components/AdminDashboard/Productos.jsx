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
import { GoSmiley } from "react-icons/go";
import { postOfertas } from "../../Redux/actions/index";

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

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta comida?")) {
      try {
        // Intenta eliminar la comida
        await dispatch(deleteComida(id));

        // Si la eliminación es exitosa, recarga la página
        window.location.reload();
      } catch (error) {
        // Si hay un error en la eliminación, muestra un mensaje
        console.error("Error al eliminar la comida:", error);
        alert("No se pudo eliminar la comida.");
      }
    }
  };

  //Creamos la oferta para enviarla al estado global ofertas

  const ofertas = (Nombre, Imagen, Efectivo) => {
    console.log(Nombre, Efectivo, Imagen);
    dispatch(
      postOfertas({ Nombre: Nombre, Imagen: Imagen, Efectivo: Efectivo })
    );
    alert("La oferta ha sido creada");
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

  //EDITAR COSTOS

  const [editStock, setEditStock] = useState(null);

  const handleEditStock = (index, MercadoPago) => {
    setEditIndex(index);
    setEditStock(MercadoPago);
  };

  const handleStockChange = (MercadoPago) => {
    setEditStock(MercadoPago);
  };

  const handleSaveStock = (id) => {
    const updatedCosto = {
      id: id,
      MercadoPago: editStock,
    };
    dispatch(updateComida(updatedCosto));
    setEditIndex(null);
    setEditStock(null);
  };

  const handleCancelStock = () => {
    setEditIndex(null);
    setEditStock(null);
  };

  //FIN EDITAR COSTOS

  const columns = [
    { field: "id", headerName: "id", width: 5 },
    { field: "Nombre", headerName: "Nombre", width: 130 },
    { field: "Efectivo", headerName: "Efectivo", width: 130 },
    { field: "MercadoPago", headerName: "Costos", width: 130 },
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
      maxWidth={{ base: "70%", md: "none" }}
      marginLeft={{ base: "-6.5rem", md: "-2rem" }}
    >
      <Box display="flex" alignItems="center">
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
      </Box>
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
                    {((column.field === "Efectivo" && editPrice !== null) ||
                      (column.field === "MercadoPago" && editStock !== null)) &&
                    editIndex === row.id ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Input
                          type="number"
                          value={
                            column.field === "Efectivo" ? editPrice : editStock
                          }
                          onChange={(e) =>
                            column.field === "Efectivo"
                              ? handlePriceChange(e.target.value)
                              : handleStockChange(e.target.value)
                          }
                        />

                        <button
                          type="button"
                          style={{ fontSize: "24px" }}
                          onClick={() =>
                            column.field === "Efectivo"
                              ? handleSave(row.id)
                              : handleSaveStock(row.id)
                          }
                          title="Save"
                        >
                          <BiSave />
                        </button>

                        <button
                          type="button"
                          style={{ fontSize: "24px" }}
                          onClick={
                            column.field === "Efectivo"
                              ? handleCancel
                              : handleCancelStock
                          }
                          title="Cancel"
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
                        {(column.field === "Efectivo" ||
                          column.field === "MercadoPago") && (
                          <Box ml="auto">
                            <button
                              style={{ fontSize: "24px" }}
                              onClick={() =>
                                column.field === "Efectivo"
                                  ? handleEdit(row.id, row.Efectivo)
                                  : handleEditStock(row.id, row.MercadoPago)
                              }
                            >
                              <BiEditAlt />
                            </button>
                          </Box>
                        )}

                        {column.field === "Acciones" && (
                          <Box ml={{ base: "auto" }}>
                            <button
                              style={{ marginTop: "-0.5rem" }}
                              className="btn"
                              onClick={() => handleDelete(row.id)} // aquí se pasa el ID
                            >
                              <DeleteIcon />
                            </button>
                            <div
                              style={{
                                marginLeft: "2rem",
                                marginTop: "-1.5rem",
                              }}
                            >
                              {/* <button
                                className="btn"
                                title="Agregar a Ofertas"
                                onClick={() =>
                                  ofertas(row.Nombre, row.Imagen, row.Efectivo)
                                }
                              >
                                <GoSmiley />
                              </button> */}
                            </div>
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
