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
        Cart.setCart(Cart.newCart());
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
function showPayedDialog(payedCart) {
    var payDialog = document.createElement("dialog");
    payDialog.classList.add("payed-dialog");
    payDialog.innerHTML = "\n        <h2 class=\"payed-dialog__text\">Thanks, " + User.getCurrentUser().firstName + " for paying " + payedCart.total.toFixed(2).toString() + "$</h2>\n        <form method=\"dialog\" class=\"payed-dialog__actions\">\n            <button class=\"payed-dialog__button\">OK</button>\n        </form>\n";
    var dialogOkButton = payDialog.querySelector(".payed-dialog__button");
    dialogOkButton.addEventListener("click", function (event) {
        payDialog.close();
        payDialog.remove();
    });
    document.body.append(payDialog);
    payDialog.showModal();
}
function showCart() {
    CartView.showCartView(User.getCurrentUser().firstName, Cart.getCart());
    Cart.addOnCartUpdateListener(function (cart) {
        CartView.updateCartProductsView(cart);
    });
    CartController.addOnCartSaveListener(function (cart) {
        User.setSavedCartToUser(User.getCurrentUser().userName, cart);
    });
    CartController.addOnCartPayListener(function () {
        if (Cart.isCartEmpty())
            return;
        var payedCart = Cart.pay();
        var currentUsername = User.getCurrentUser().userName;
        User.addCartToUser(currentUsername, payedCart);
        User.clearSavedCartOfUser(currentUsername);
        showPayedDialog(payedCart);
    });
}
function loadLogoutButton() {
    var logoutButtonView = document.querySelector(".navbar__logout");
    logoutButtonView.addEventListener("click", function (event) {
        User.setSavedCartToUser(User.getCurrentUser().userName, Cart.getCart());
        User.deleteCurrentUserFromStorage();
        navigateToLogin();
    });
}
function showCategories() {
    CategoriesView.showCategoriesView();
    CategoriesViewController.addOnCategorySelectedListener(function (category) {
        if (category === "All") {
            showProductsGrid(Product.getProducts());
            return;
        }
        showProductsGrid(Product.getProductsByCategory(category));
    });
}
function main() {
    loadCurrentUser();
    Product.loadAllProducts(onProductsLoaded);
    showCart();
    loadLogoutButton();
}
main();
