import * as Product from "./Product.model.js";
import * as Cart from "./Cart.model.js";
import * as ProductGridView from "./ProductGridView.view.js";
import * as ProductGridViewController from "./ProductGridView.controller.js";
import * as CartView from "./Cart.view.js";
function onProductsLoaded(loadedProducts) {
    Product.setProducts(loadedProducts);
    ProductGridView.renderProductsGridView(loadedProducts);
    ProductGridViewController.addOnAddToCartClickedListener(function (productId) {
        Cart.addToCartById(productId);
    });
}
function main() {
    Cart.addOnCartUpdateListener(function (cart) {
        CartView.updateCartProductsView(cart);
    });
    Cart.setCart(Cart.newCart(0));
    CartView.showCartView(Cart.getCart());
    Product.loadAllProducts(onProductsLoaded);
}
main();
