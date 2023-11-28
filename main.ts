
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
        ${products.map(renderGridItem).join("\n")}
    `;

    const addButtons = gridView.querySelectorAll(".product-view__add-button") as NodeListOf<HTMLButtonElement>;
    attachAddToCartEvent(addButtons);
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

// controller
function attachAddToCartEvent(buttons: NodeListOf<HTMLButtonElement>) {
    buttons.forEach(buttons => buttons.addEventListener("click", (event) => {
        const target = event.target as HTMLButtonElement;
        const productId = target.getAttribute("data-product-id") as string;

        if (!productId) throw new Error("Add to cart event - Couldn't find product ID to add to cart.");

        const convertedId = Number(productId);
        if (Number.isNaN(convertedId)) throw new Error("Add to cart event - Product ID isnt a number")

        onAddToCartEvent(convertedId);
    }));
}























// contoller
function onAddToCartEvent(productId: number) {

    console.log(productId);

    const product = Product.getProductbyID(productId);
}


















function main() {

    console.log("Loading products from file...")
    Product.loadAllProducts(onProductsLoaded);

}

main();

