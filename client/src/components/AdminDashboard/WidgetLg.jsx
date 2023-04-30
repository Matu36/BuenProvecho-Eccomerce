import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function WidgetLg () {
    /*const [state, setState] = useState({ orders: null, orderActive: null });
    const user = JSON.parse(localStorage.getItem("MANGIARE_user"));
  
    useEffect(() => {
      fetch(
        `${REACT_APP_BACK_URL}/orders?id=${user.id}&email=${user.email}${
          props.all ? "&all=true" : ""
        }`
      )
        .then((resp) => resp.json())
        .then((data) => {
          setState({ ...state, orders: data });
        });
    }, []);
  
    const handlePay = (preferenceId) => {
      window.open(
        `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`,
        "_self"
      );
    };
  
    const handleStatus = async (status, orderId) => {
      fetch(`${REACT_APP_BACK_URL}/orders`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, orderId, userId: user.id }),
      })
        .then((resp) => resp.json())
        .then((order) => {
          console.log(order);
          setState({
            ...state,
            orders: state.orders.map((el) =>
              el.id === order.id ? { ...el, status: order.status } : el
            ),
          });
        });
    };

*/
    return (
<Box shadow="md" p={6}>
      <Box fontSize="xl" fontWeight="semibold" mb={4}>
        Últimas Transacciones
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            {/* {props.all ?  */}
            <Th>Email</Th> : null
            {/* } */}
            <Th>Precio</Th>
            <Th>Producto</Th>
            <Th>Fecha</Th>
            
          </Tr>
        </Thead>
        <Tbody>
          {/* {state.orders?.slice(-6).map((el, idx) => ( */}
            <React.Fragment 
            // key= {idx}
            >
              {/* <Tr
                className={
                  el.id === state.orderActive ||
                  (!state.orderActive && el.id == props.order_id)
                    ? "orderItem"
                    : idx % 2
                    ? ""
                    : "par"
                }
              >
                {props.all ? <Td>{el.User.email}</Td> : null}
                <Td>{el.id}</Td>
                <Td>{el.createdAt}</Td>
                <Td>{el.Order_details.length}</Td>
                <Td>
                  {el.status === 0
                    ? "Payment pending"
                    : el.status === 1
                    ? "Stock pending"
                    : el.status === 2
                    ? "In preparation"
                    : el.status === 3
                    ? "Sent"
                    : "Canceled"}
                </Td>
                <Td>
                  {!el.status ||
                  (el.status === 1 && user.role !== null && props.all) ? (
                    <button onClick={() => handleStatus(4, el.id)}>Cancel</button>
                  ) : null}

                  {!el.status && user.id == el.userId ? (
                    <button onClick={() => handlePay(el.preferenceId)}>
                      Pay
                    </button>
                  ) : null}

                  {el.status === 2 && user.role !== null && props.all ? (
                    <button onClick={() => handleStatus(3, el.id)}>Send</button>
                  ) : null}
                </Td>
              </Tr>
              {state.orderActive === el.id ||
              (!state.orderActive && el.id == props.order_id) ? (
                <Tr className="orderItem">
                  <Td colSpan={props.all ? 6 : 5} py={4}>
                    <IngredientsList
                      items={el.Order_details.map(
                        ({ IngredientId, amount, unit, price, Ingredient }) => ({
                          id: IngredientId,
                          amount,
                          unit,
                          price,
                          name: Ingredient.name,
                        })
                      )}
                      orderDetail={true}
                    />
                  </Td>
                </Tr>
              ) : null} */}
            {/* </React.Fragment>
          ))} */}
          </React.Fragment>
        </Tbody>
      </Table>
    </Box>
  );
}
  