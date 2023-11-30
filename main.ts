
import * as Product from "./Product.model.js";
import * as Cart from "./Cart.model.js";
import * as ProductGridView from "./ProductGridView.view.js"
import * as ProductGridViewController from "./ProductGridView.controller.js"
import * as CartView from "./Cart.view.js";
import * as CartController from "./Cart.controller.js";
import * as User from "./User.model.js";

function onProductsLoaded(loadedProducts: Product.Product[]) {
    Product.setProducts(loadedProducts);
    ProductGridView.renderProductsGridView(loadedProducts);
    ProductGridViewController.addOnAddToCartClickedListener((productId) => {
        Cart.addToCartById(productId);
    });
}

function loadCurrentUser() {
    try {
        User.setUsers(User.loadUsersFromStorage());
        const loadedCurrentUser = User.loadCurrentUserFromStorage();
        console.log(loadedCurrentUser);
    } catch {
        console.log("no current user found");
        navigateToLogin();
    }
}

function navigateToLogin() {
    window.location.href = "index.html";
}

function main() {

    loadCurrentUser();

    Cart.addOnCartUpdateListener((cart) => {
        CartView.updateCartProductsView(cart);
    });

    Cart.setCart(Cart.newCart(0));
    CartView.showCartView(Cart.getCart());


    Product.loadAllProducts(onProductsLoaded);

}

main();