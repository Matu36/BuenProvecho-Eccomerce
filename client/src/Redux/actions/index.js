import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const TOTAL_PRICE = "TOTAL_PRICE";
export const GET_COMIDAS = "GET_COMIDAS";
export const HOME_ADMIN_SHOW = "HOME_ADMIN_SHOW";
export const RESET_ADMIN_SHOW = "RESET_ADMIN_SHOW";

export const changeHomeAdminShow = (payload) => async (dispatch) => {
  return dispatch({ type: HOME_ADMIN_SHOW, payload: payload });
};
export const resetHomeAdminShow = () => async (dispatch) => {
  return dispatch({ type: RESET_ADMIN_SHOW });
};

export const getComidas = () => async (dispatch) => {
    let response = await axios.get('http://localhost:3001/comidas');
    return dispatch({ type: GET_COMIDAS, payload: response.data });
    
  };
