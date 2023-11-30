
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

    showCurrentUserSavedCart();
}

function loadCurrentUser() {
    try {
        User.setUsers(User.loadUsersFromStorage());
        User.setCurrentUser(User.loadCurrentUserFromStorage());
    } catch {
        navigateToLogin();
    }
}

function showCurrentUserSavedCart() {
    const currentUser = User.getCurrentUser()
    try {
        const savedCart = User.getUserSavedCart(currentUser.userName);
        Cart.setCart(savedCart);
    } catch {
        Cart.setCart(Cart.newCart(0));
    }
}

function navigateToLogin() {
    window.location.href = "index.html";
}

function showCart() {
    CartView.showCartView(User.getCurrentUser().firstName, Cart.getCart());

    Cart.addOnCartUpdateListener((cart) => {
        CartView.updateCartProductsView(cart);
    });

    CartController.addOnCartSaveListener((cart) => {
        console.log("saving cart:")
        console.log(cart);
        User.setSavedCartToUser(User.getCurrentUser().userName, cart);
    });
}

function main() {

    loadCurrentUser();
    Product.loadAllProducts(onProductsLoaded);
    showCart();

}

main();