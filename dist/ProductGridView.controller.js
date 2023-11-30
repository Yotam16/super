import { getProductbyID } from "./Product.model.js";
var onAddToCartClickedListeners = [];
export function attachAddToCartEvent(buttons) {
    buttons.forEach(function (buttons) { return buttons.addEventListener("click", function (event) {
        var target = event.target;
        var targetProductId = target.getAttribute("data-product-id");
        if (!targetProductId)
            throw new Error("Add to cart event - Couldn't find product ID to add to cart.");
        onAddToCartClickedEvent(targetProductId);
    }); });
}
export function onAddToCartClickedEvent(productId) {
    var product = getProductbyID(productId);
    console.log("adding product to cart");
    console.log(product);
    onAddToCartClickedListeners.forEach(function (listener) { return listener(product); });
}
export function addOnAddToCartClickedListener(callback) {
    onAddToCartClickedListeners.push(callback);
}
