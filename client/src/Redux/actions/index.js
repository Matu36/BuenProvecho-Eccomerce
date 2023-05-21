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
export const UPDATE_USER = "UPDATE_USER";
export const GET_MERCADOPAGO = "GET_MERCADOPAGO";
export const GET_OFERTAS = "GET_OFERTAS";
export const POST_OFERTAS = "POST_OFERTAS";

export const changeHomeAdminShow = (payload) => async (dispatch) => {
  return dispatch({ type: HOME_ADMIN_SHOW, payload: payload });
};
export const resetHomeAdminShow = () => async (dispatch) => {
  return dispatch({ type: RESET_ADMIN_SHOW });
};

export const getComidas = () => async (dispatch) => {
  let response = await axios.get(
    `https://pymes-software-integration-production.up.railway.app/comidas`
  );
  return dispatch({ type: GET_COMIDAS, payload: response.data });
};

export const updateComida = (comida) => {
  return (dispatch) => {
    axios
      .put(
        `https://pymes-software-integration-production.up.railway.app/comidas`,
        comida
      )
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
      .post(
        `https://pymes-software-integration-production.up.railway.app/comidas`,
        {
          Nombre,
          Efectivo,
          Categoria,
          Imagen,
          MercadoPago,
        }
      )
      .then((payload) => dispatch({ type: CREATE_COMIDA, payload }));

export const deleteComida = (id) => async (dispatch) => {
  return await axios.delete(
    `https://pymes-software-integration-production.up.railway.app/comidas`,
    { data: { id } }
  );
};

export const getUsers = (currentUser) => {
  console.log("Usuario", currentUser);

  return (dispatch) =>
    axios
      .get(
        `https://pymes-software-integration-production.up.railway.app/users`,
        { params: currentUser }
      )
      .then((response) =>
        dispatch({ type: GET_USERS, payload: response.data })
      );
};

export const updateUser = (user) => {
  return (dispatch) => {
    axios
      .put(
        `https://pymes-software-integration-production.up.railway.app/users`,
        user
      )
      .then((res) => {
        dispatch({
          type: UPDATE_USER,
          payload: { ...user },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getMensajes = () => async (dispatch) => {
  let response = await axios.get(
    `https://pymes-software-integration-production.up.railway.app/mensajes`
  );
  return dispatch({ type: GET_MENSAJES, payload: response.data });
};

export const crearMensaje = (mensaje) => async (dispatch) => {
  const { data } = await axios.post(
    `https://pymes-software-integration-production.up.railway.app/mensajes`,
    mensaje
  );
  dispatch({ type: MENSAJE_CREADO, payload: data });
};

export const getMercadoPago = () => async (dispatch) => {
  let response = await axios.get(
    `https://pymes-software-integration-production.up.railway.app/paymentDBLOCAL`
  );
  return dispatch({ type: GET_MERCADOPAGO, payload: response.data });
};

export const getOfertas = () => async (dispatch) => {
  let response = await axios.get(
    `https://pymes-software-integration-production.up.railway.app/ofertas`
  );
  return dispatch({ type: GET_OFERTAS, payload: response.data });
};

export const postOfertas =
  ({ Nombre, Efectivo, Imagen }) =>
  (dispatch) =>
    axios
      .post(
        `https://pymes-software-integration-production.up.railway.app/ofertas`,
        {
          Nombre,
          Efectivo,
          Imagen,
        }
      )
      .then((payload) => dispatch({ type: POST_OFERTAS, payload }));
