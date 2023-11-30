import * as Product from "./Product.model.js";
import * as Cart from "./Cart.model.js";
import * as ProductGridView from "./ProductGridView.view.js";
import * as ProductGridViewController from "./ProductGridView.controller.js";
import * as CartView from "./Cart.view.js";
import * as CartController from "./Cart.controller.js";
import * as User from "./User.model.js";
import * as CategoriesView from "./CategoriesView.view.js";
import * as CategoriesViewController from "./CategoriesView.controller.js";
function onProductsLoaded(loadedProducts) {
    Product.setProducts(loadedProducts);
    showProductsGrid(loadedProducts);
    showCurrentUserSavedCart();
    showCategories();
}
function loadCurrentUser() {
    try {
        User.setUsers(User.loadUsersFromStorage());
        User.setCurrentUser(User.loadCurrentUserFromStorage());
    }
    catch (_a) {
        navigateToLogin();
    }
}
function showCurrentUserSavedCart() {
    var currentUser = User.getCurrentUser();
    try {
        var savedCart = User.getUserSavedCart(currentUser.userName);
        Cart.setCart(savedCart);
    }
    catch (_a) {
        Cart.setCart(Cart.newCart(0));
    }
}
function navigateToLogin() {
    window.location.href = "index.html";
}
function showProductsGrid(products) {
    ProductGridView.renderProductsGridView(products);
    ProductGridViewController.addOnAddToCartClickedListener(function (productId) {
        Cart.addToCartById(productId);
    });
}
function showCart() {
    CartView.showCartView(User.getCurrentUser().firstName, Cart.getCart());
    Cart.addOnCartUpdateListener(function (cart) {
        CartView.updateCartProductsView(cart);
    });
    CartController.addOnCartSaveListener(function (cart) {
        User.setSavedCartToUser(User.getCurrentUser().userName, cart);
    });
}
function showCategories() {
    CategoriesView.showCategoriesView();
    CategoriesViewController.addOnCategorySelectedListener(function (category) {
        showProductsGrid(Product.getProductsByCategory(category));
    });
}
function main() {
    loadCurrentUser();
    Product.loadAllProducts(onProductsLoaded);
    showCart();
}
main();
