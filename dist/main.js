import * as Product from "./Product.model.js";
var gridView = document.querySelector(".products-grid");
function onProductsLoaded(products) {
    console.log("products loaded, can continue");
    console.log(products);
    // continue app 
    // TODO - update global products array with loaded products
    renderProductsGridView(products);
}
function renderProductsGridView(products) {
    gridView.innerHTML = "\n        " + products.map(renderGridItem).join("\n") + "\n    ";
    var addButtons = gridView.querySelectorAll(".product-view__add-button");
    attachAddToCartEvent(addButtons);
}
function renderGridItem(product) {
    return "\n    <li class=\"products-grid__item\">\n        <div class=\"product-view\" >\n            <img src=\"" + product.pic_path + "\" alt=\"\" class=\"product-view__img\" width=\"100\" height=\"100\">\n            <h4 class=\"product-view__title\">" + product.name + "</h4>\n            <h6 class=\"product-view__price\">" + product.price + "</h6>\n            <button class=\"product-view__add-button\" data-product-id=\"" + product.PID + "\">add to cart</button>\n        </div>\n    </li>\n    ";
}
// controller
function attachAddToCartEvent(buttons) {
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
// contoller
function onAddToCartEvent(productId) {
    console.log(productId);
    var product = Product.getProductbyID(productId);
}
function main() {
    console.log("Loading products from file...");
    Product.loadAllProducts(onProductsLoaded);
}
main();
