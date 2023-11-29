import * as Product from "./Product.model.js";
import * as Cart from "./Cart.model.js";
import * as ProductGridView from "./ProductGridView.view.js";
import * as ProductGridViewController from "./ProductGridView.controller.js";
import { SOUND_ADDTOCART, playSound } from "./sounds.js";
var currentCart = Cart.newCart(12345);
function onProductsLoaded(loadedProducts) {
    console.log(loadedProducts.length + " products loaded.");
    Product.setProducts(loadedProducts);
}
function showProductsGrid(products) {
    ProductGridView.renderProductsGridView(products);
    ProductGridViewController.addOnAddToCartClickedListener(function (product) {
        Cart.addToCart(product, currentCart);
        console.log("Added product " + product.name + " to cart:");
        console.log(currentCart);
        playSound(SOUND_ADDTOCART);
    });
}
function main() {
    console.log("Loading products from file...");
    Product.loadAllProducts(onProductsLoaded);
    Product.addOnProductsChangedListener(function (products) {
        showProductsGrid(products);
    });
}
main();
