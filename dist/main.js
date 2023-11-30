import * as Product from "./Product.model.js";
import * as Cart from "./Cart.model.js";
import * as ProductGridView from "./ProductGridView.view.js";
import * as ProductGridViewController from "./ProductGridView.controller.js";
import * as CartView from "./Cart.view.js";
function onProductsLoaded(loadedProducts) {
    Product.setProducts(loadedProducts);
    showProductsGrid(Product.getProducts());
}
function showProductsGrid(products) {
    ProductGridView.renderProductsGridView(products);
    ProductGridViewController.addOnAddToCartClickedListener(function (product) {
        Cart.addToCart(product);
    });
}
function main() {
    Cart.addOnCartUpdateListener(function (cart) {
        CartView.showCartView(cart);
    });
    Cart.setCart(Cart.newCart(0));
    Product.loadAllProducts(onProductsLoaded);
}
main();
