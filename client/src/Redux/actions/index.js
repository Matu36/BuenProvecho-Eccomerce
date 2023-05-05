import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const TOTAL_PRICE = "TOTAL_PRICE";
export const GET_COMIDAS = "GET_COMIDAS";
export const HOME_ADMIN_SHOW = "HOME_ADMIN_SHOW";
export const RESET_ADMIN_SHOW = "RESET_ADMIN_SHOW";
export const UPDATE_COMIDA = "UPDATE_COMIDA";
export const CREATE_COMIDA = "CREATE_COMIDA";
export const DELETE_COMIDA_SUCCESS = "DELETE_COMIDA_SUCCESS";
export const GET_USERS = "GET_USERS";
export const GET_MENSAJES = "GET_MENSAJES";
export const MENSAJE_CREADO = "MENSAJE_CREADO";
export const REMOVE_ONE_FROM_MESSAGE = "REMOVE_ONE_FROM_MESSAGE";

export const changeHomeAdminShow = (payload) => async (dispatch) => {
  return dispatch({ type: HOME_ADMIN_SHOW, payload: payload });
};
export const resetHomeAdminShow = () => async (dispatch) => {
  return dispatch({ type: RESET_ADMIN_SHOW });
};

export const getComidas = () => async (dispatch) => {
  let response = await axios.get("http://localhost:3001/comidas");
  return dispatch({ type: GET_COMIDAS, payload: response.data });
};

export const updateComida = (comida) => {
  return (dispatch) => {
    axios
      .put("http://localhost:3001/comidas", comida)
      .then((res) => {
        dispatch({
          type: UPDATE_COMIDA,
          payload: { ...comida },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createComida =
  ({ Nombre, Efectivo, Categoria, Imagen, MercadoPago }) =>
  (dispatch) =>
    axios
      .post("http://localhost:3001/comidas", {
        Nombre,
        Efectivo,
        Categoria,
        Imagen,
        MercadoPago,
      })
      .then((payload) => dispatch({ type: CREATE_COMIDA, payload }));

export const deleteComida = (id) => async (dispatch) => {
  return await axios.delete("http://localhost:3001/comidas", { data: { id } });
};

export const getUsers = (currentUser) => {
  console.log("Usuario", currentUser);

  return (dispatch) =>
    axios
      .get("http://localhost:3001/users", { params: currentUser })
      .then((response) =>
        dispatch({ type: GET_USERS, payload: response.data })
      );
};

export const getMensajes = () => async (dispatch) => {
  let response = await axios.get("http://localhost:3001/mensajes");
  return dispatch({ type: GET_MENSAJES, payload: response.data });
};

export const crearMensaje = (mensaje) => async (dispatch) => {
  const { data } = await axios.post("http://localhost:3001/mensajes", mensaje);
  dispatch({ type: MENSAJE_CREADO, payload: data });
};

