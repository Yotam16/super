import { attachAddToCartEvent } from "./ProductGridView.controller.js";
var gridView = document.querySelector(".products-grid");
export function renderProductsGridView(products) {
    gridView.innerHTML = "\n        " + products.map(renderGridItem).join("\n") + "\n    ";
    attachAddToCartEvent(getAllAddToCartButtons());
}
function renderGridItem(product) {
    return "\n    <li class=\"products-grid__item\">\n        <div class=\"product-view\" >\n            <img src=\"" + product.pic_path + "\" alt=\"\" class=\"product-view__img\" width=\"100\" height=\"100\">\n            <h4 class=\"product-view__title\">" + product.name + "</h4>\n            <h6 class=\"product-view__price\">" + product.price + "</h6>\n            <button class=\"product-view__add-button\" data-product-id=\"" + product.PID + "\">add to cart</button>\n        </div>\n    </li>\n    ";
}
export function getAllAddToCartButtons() {
    return gridView.querySelectorAll(".product-view__add-button");
}
