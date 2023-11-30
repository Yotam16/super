import { getProductbyID } from "./Product.model.js";
export function empty() {
    return {};
}
export function calulateTotalPrice(cartProducts) {
    var totalPrice = 0;
    for (var productId in cartProducts) {
        var product = getProductbyID(productId);
        var amount = cartProducts[productId];
        totalPrice += amount * product.price;
    }
    return totalPrice;
}
export function add(cartProducts, productToAdd, amount) {
    if (amount === void 0) { amount = 1; }
    var currentAmount = getAmount(cartProducts, productToAdd);
    if (!currentAmount) {
        cartProducts[productToAdd] = 0;
    }
    cartProducts[productToAdd] += amount;
}
export function subtract(cartProducts, productToSubtract, amount) {
    if (amount === void 0) { amount = 1; }
    var currentAmount = getAmount(cartProducts, productToSubtract);
    if (!currentAmount)
        throw new Error("CartProducts subtract " + productToSubtract + " not found");
    if (currentAmount - amount <= 0) {
        remove(cartProducts, productToSubtract);
        return;
    }
    cartProducts[productToSubtract] -= amount;
}
export function remove(cartProducts, productToRemove) {
    delete cartProducts[productToRemove];
}
export function clear(cartProducts) {
    for (var productId in cartProducts) {
        remove(cartProducts, productId);
    }
}
export function getAmount(cartProducts, productToCount) {
    return cartProducts[productToCount];
}
