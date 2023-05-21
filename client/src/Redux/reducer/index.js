import {
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  TOTAL_PRICE,
  GET_COMIDAS,
  HOME_ADMIN_SHOW,
  RESET_ADMIN_SHOW,
  UPDATE_COMIDA,
  CREATE_COMIDA,
  GET_USERS,
  GET_MENSAJES,
  MENSAJE_CREADO,
  REMOVE_ONE_FROM_MESSAGE,
  UPDATE_USER,
  GET_MERCADOPAGO,
  GET_OFERTAS,
  POST_OFERTAS
} from "../actions/index";


const InitialState = {
 
 
  comidas: [],

  cart: JSON.parse(localStorage.getItem('cart')) || [],

  totalPrice: 0,

  homeShow: "Home",

  users: [],

  mensajes: [],

  mensajesnoleidos: JSON.parse(localStorage.getItem("MensajesNoLeidos")) || [],

  mercadopago: [],

  ofertas: [],
};



function rootReducer(state = InitialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      let newItem = state.comidas.find(
        (product) => product.id === action.payload
      );

      let itemInCart = state.cart.find((item) => item.id === newItem.id);

      const updatedCart = itemInCart
        ? state.cart.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...newItem, quantity: 1 }];

      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Guardar en localStorage

      return { ...state, cart: updatedCart };
    }

    case REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);
      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
    }

    case REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }

    case CLEAR_CART:
  return {
    ...state,
    cart: [],
  };


    case TOTAL_PRICE: {
      let priceTotal = state.cart.reduce((acc, item) => {
        return acc + item.quantity * item.Efectivo;
      }, 0);

      return {
        ...state,
        totalPrice: priceTotal,
      };
    }
    case GET_COMIDAS:
      return { ...state, comidas: action.payload };

    case HOME_ADMIN_SHOW:
      return {
        ...state,
        homeShow: action.payload,
      };
    case RESET_ADMIN_SHOW:
      return {
        ...state,
        homeShow: InitialState.homeShow,
      };

    case UPDATE_COMIDA:
      const updatedComidas = state.comidas.map((comida) => {
        if (comida.id === action.payload.id) {
          return { ...comida, ...action.payload };
        }
        return comida;
      });

      return { ...state, comidas: updatedComidas };

    case CREATE_COMIDA:
      return { ...state, comidas: [...state.comidas, action.payload] };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

      case UPDATE_USER:
      const updatedUser = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return { ...user, ...action.payload };
        }
        return user;
      });

      return { ...state, users: updatedUser };

    case GET_MENSAJES:
      return {
        ...state,
        mensajes: action.payload,
        mensajesnoleidos: action.payload,
      };

    case MENSAJE_CREADO:
      return { ...state, mensajes: [...state.mensajes, action.payload] };

    case REMOVE_ONE_FROM_MESSAGE:
      return {
        ...state,
        mensajesnoleidos: state.mensajesnoleidos.filter(
          (objeto) => objeto.id !== action.payload
        ),
      };

      case GET_MERCADOPAGO:
      return { ...state, mercadopago: action.payload };

      case GET_OFERTAS:
        return { ...state, ofertas: action.payload };

        case POST_OFERTAS:
      return { ...state, ofertas: [...state.ofertas, action.payload] };

    default:
      return state;
  }
}

export default rootReducer;
