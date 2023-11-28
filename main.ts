
import * as Product from "./Product.model.js";
import * as Cart from "./Cart.model.js";
import * as ProductGridView from "./ProductGridView.view.js"
import * as ProductGridViewController from "./ProductGridView.controller.js"

const currentCart = Cart.newCart(12345);

function onProductsLoaded(loadedProducts: Product.Product[]) {
    console.log(`${loadedProducts.length} products loaded.`);
    Product.populateProducts(loadedProducts);
}

function showProductsGrid(products: Product.Product[]) {
    ProductGridView.renderProductsGridView(products);
    ProductGridViewController.addOnAddToCartClickedListener((product) => {
        Cart.addToCart(product, currentCart);
        console.log(`Added product ${product.name} to cart:`)
        console.log(currentCart);
    });
}

function main() {

    console.log("Loading products from file...")
    Product.loadAllProducts(onProductsLoaded);

    Product.addOnProductsChangedListener((products) => {
        showProductsGrid(products);
    });
}

main();