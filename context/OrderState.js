import { useReducer } from "react";
import OrderReducer from './OrderReducer';
import OrderContext from "./OrderContext";
import { ADD_ORDER, REMOVE_ORDER, CLEAR_ALL } from "./Types";


const OrderState = ({ children }) => {
    const initialOrders = []
    const [state, dispatch] = useReducer(OrderReducer, initialOrders);

    // Action creators
    const addOrder = (orderObject) => {
        // console.log(orderObject);
        dispatch({ type: ADD_ORDER, payload: orderObject });
    }

    const removeOrder = (index) => {
        dispatch({ type: REMOVE_ORDER, payload: index });
    }

    const clearAll = () => {
        dispatch({ type: CLEAR_ALL });
    }

    return (
        <OrderContext.Provider
            value={{
                orders: state,
                addOrder,
                removeOrder,
                clearAll
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export default OrderState;
