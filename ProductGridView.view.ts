import * as Product from "./Product.model.js";
import { attachAddToCartEvent } from "./ProductGridView.controller.js";

const gridView = document.querySelector(".products-grid") as HTMLUListElement;

export function renderProductsGridView(products: Product.Product[]) {

    gridView.innerHTML = `
        ${products.map(renderGridItem).join("\n")}
    `;

    attachAddToCartEvent(getAllAddToCartButtons());

}

function renderGridItem(product: Product.Product) {
    return `
    <li class="products-grid__item">
        <div class="product-view" >
            <img src="${product.pic_path}" alt="" class="product-view__img" width="100" height="100">
            <h4 class="product-view__title">${product.name}</h4>
            <h6 class="product-view__price">${product.price}</h6>
            <button class="product-view__add-button" data-product-id="${product.PID}">add to cart</button>
        </div>
    </li>
    `;
}

export function getAllAddToCartButtons(): NodeListOf<HTMLButtonElement> {
    return gridView.querySelectorAll(".product-view__add-button") as NodeListOf<HTMLButtonElement>;
} 