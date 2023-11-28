
import * as Product from "./Product.model.js";


const gridView = document.querySelector(".products-grid") as HTMLUListElement;


function onProductsLoaded(products: Product.Product[]) {
    console.log("products loaded, can continue")
    console.log(products)

    // continue app 
    // TODO - update global products array with loaded products
    renderProductsGridView(products);
}

function renderProductsGridView(products: Product.Product[]) {

    gridView.innerHTML = `
        ${products.map(renderGridItem)}
    `;
}

function renderGridItem(product: Product.Product) {
    return `
    <li class="products-grid__item">
        <div class="product-view" data-product-id="${product.PID}">
            <img src="${product.pic_path}" alt="" class="product-view__img" width="100" height="100">
            <h4 class="product-view__title">${product.name}</h4>
            <h6 class="product-view__price">${product.price}</h6>
            <button class="product-view__add-button">add to cart</button>
        </div>
    </li>
    `;
}

function main() {

    console.log("Loading products from file...")
    Product.loadAllProducts(onProductsLoaded);

}

main();

