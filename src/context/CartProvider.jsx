import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
    items: [],
    itemCount: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            
            let newItems;
            if (existingItem) {
                newItems = state.items.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            } else {
                newItems = [...state.items, newItem];
            }

            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return {
                ...state,
                items: newItems,
                itemCount
            };
        }
        case 'REMOVE_ITEM': {
            const newItems = state.items.filter(item => item.id !== action.payload);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
            return {
                ...state,
                items: newItems,
                itemCount
            };
        }
        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
                itemCount: 0
            };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addItem = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{ cart: state, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};