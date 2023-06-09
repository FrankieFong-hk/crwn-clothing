import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";


const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    //If found, increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem) => 
        cartItem.id === productToAdd.id
        ?{...cartItem, quantity: cartItem.quantity + 1}
        : cartItem)
    }

    //return new array with modified cartItems/ new cart item

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //check if quqntity is equal to 1, if it is remove that item from the cart
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
        // return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id?
        // {...cartItem, quantity: cartItem.quantity - 1}
        // : cartItem)
    }

    //return back cartItems with matching cart item with reduced quantity

    return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id
    ?{...cartItem, quantity: cartItem.quantity - 1}
    : cartItem)

}


const clearCartItem = (cartItems, cartItemToRemove) => 
    cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)


export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemsToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemsToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemsToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemsToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}