import { GET_ORDERS, ADD_ORDER, REMOVE_ORDER, CLEAR_ALL } from "./Types";

export default (state, action) => {
    const {payload, type} = action;

    switch (type) {
        case ADD_ORDER:
            return [...state, payload];
        case REMOVE_ORDER:
            const copy = [...state];
            copy.splice(payload, 1);
            return copy;
        case CLEAR_ALL:
            return [];
        default:
            return state;
    }
}