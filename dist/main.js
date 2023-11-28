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
    gridView.innerHTML = "\n        " + products.map(renderGridItem) + "\n    ";
}
function renderGridItem(product) {
    return "\n    <li class=\"products-grid__item\">\n        <div class=\"product-view\" data-product-id=\"" + product.PID + "\">\n            <img src=\"" + product.pic_path + "\" alt=\"\" class=\"product-view__img\" width=\"100\" height=\"100\">\n            <h4 class=\"product-view__title\">" + product.name + "</h4>\n            <h6 class=\"product-view__price\">" + product.price + "</h6>\n            <button class=\"product-view__add-button\">add to cart</button>\n        </div>\n    </li>\n    ";
}
function main() {
    console.log("Loading products from file...");
    Product.loadAllProducts(onProductsLoaded);
}
main();
