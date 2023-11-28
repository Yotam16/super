import { getProductbyID } from "./Product.model.js";
var onAddToCartClickedListeners = [];
export function attachAddToCartEvent(buttons) {
    buttons.forEach(function (buttons) { return buttons.addEventListener("click", function (event) {
        var target = event.target;
        var targetProductId = target.getAttribute("data-product-id");
        if (!targetProductId)
            throw new Error("Add to cart event - Couldn't find product ID to add to cart.");
        var productId = Number(targetProductId);
        if (Number.isNaN(productId))
            throw new Error("Add to cart event - Product ID isnt a number");
        onAddToCartClickedEvent(productId);
    }); });
}
export function onAddToCartClickedEvent(productId) {
    console.log("Product id " + productId + " add to cart event fired");
    var product = getProductbyID(productId);
    onAddToCartClickedListeners.forEach(function (listener) { return listener(product); });
}
export function addOnAddToCartClickedListener(callback) {
    onAddToCartClickedListeners.push(callback);
}
