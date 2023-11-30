import * as Cart from "./Cart.model.js";
var onCartSaveListeners = [];
export function addOnCartSaveListener(callback) {
    onCartSaveListeners.push(callback);
}
export function onCartSave(cart) {
    onCartSaveListeners.forEach(function (listener) { return listener(cart); });
}
var onCartPayListeners = [];
export function addOnCartPayListener(callback) {
    onCartPayListeners.push(callback);
}
export function onCartPay() {
    onCartPayListeners.forEach(function (listener) { return listener(); });
}
export function onSaveCartEvent(event) {
    console.log("save cart fired");
    onCartSave(Cart.getCart());
}
export function onEmptyCartEvent(event) {
    Cart.clearCart();
}
export function onProductRemoveEvenet(productId) {
    Cart.removeFromCartById(productId);
}
export function onPayCartEvent(event) {
    onCartPay();
}
export function onProductAddAmount(amountView) {
    var amount = Number(amountView.value);
    amountView.value = "" + (amount + 1);
}
export function onProductSbutractAmount(amountView) {
    var amount = Number(amountView.value);
    if (amount <= 0) {
        amountView.value = "0";
        return;
    }
    amountView.value = "" + (amount - 1);
}
export function onProductAmountChanged(event) {
    var amountView = event.target;
    var amount = Number(amountView.value);
    if (amount <= 0) {
        amountView.value = "0";
    }
}
export function onProductAmountUpdate(productId, amount) {
    Cart.setProductAmountById(productId, amount);
}
