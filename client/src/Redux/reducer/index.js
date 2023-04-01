import {ADD_TO_CART, REMOVE_ONE_FROM_CART, REMOVE_ALL_FROM_CART, CLEAR_CART, TOTAL_PRICE,
GET_COMIDAS, HOME_ADMIN_SHOW, RESET_ADMIN_SHOW, UPDATE_COMIDA, CREATE_COMIDA}
from "../actions/index";

const InitialState = {

    comidas: [],

    cart: [],

    totalPrice: 0,

    homeShow: "Home",
}

function rootReducer (state=InitialState, action) {

    switch (action.type) {
        case ADD_TO_CART: {

            let newItem = state.comidas.find(product => product.id === action.payload);
            //console.log (newItem);

            let itemInCart = state.cart.find(item => item.id === newItem.id)
            
            return itemInCart? {
                ...state, 
                cart: state.cart.map((item) => 
                item.id === newItem.id
                ?{...item, quantity: item.quantity + 1}
                :item
                ),
            } : {...state, 
                cart: [...state.cart, {...newItem, quantity:1}]
            };
 
            }

        case REMOVE_ONE_FROM_CART: {
            let itemToDelete = state.cart.find (item => item.id === action.payload)
            return itemToDelete.quantity > 1? {
                ...state,
                cart: state.cart.map((item) => 
                item.id === action.payload
                ? {...item, quantity: item.quantity - 1}:item 
                )
            }: {
                ...state,
                cart: state.cart.filter ((item) => item.id !== action.payload)
            };
            
        }

        case REMOVE_ALL_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter ((item) => item.id !== action.payload)
            };
            
            
        }

        case CLEAR_CART: {
            return InitialState;
            
        }

        case TOTAL_PRICE: {

            let priceTotal = state.cart.reduce((acc, item) => {
               return acc + (item.quantity * item.Efectivo)
                },0)

            return {
               ...state,
                totalPrice: priceTotal,
                            }

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

        default:
            return state;
    }


    }

    export default rootReducer;