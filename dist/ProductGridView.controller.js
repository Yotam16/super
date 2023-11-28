export function attachAddToCartEvent(buttons) {
    buttons.forEach(function (buttons) { return buttons.addEventListener("click", function (event) {
        var target = event.target;
        var productId = target.getAttribute("data-product-id");
        if (!productId)
            throw new Error("Add to cart event - Couldn't find product ID to add to cart.");
        var convertedId = Number(productId);
        if (Number.isNaN(convertedId))
            throw new Error("Add to cart event - Product ID isnt a number");
        onAddToCartEvent(convertedId);
    }); });
}
export function onAddToCartEvent(productId) {
    console.log(productId);
    console.log("Product id " + productId + " add to cart event fired");
    // const product = Product.getProductbyID(productId);
}
