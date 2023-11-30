
import * as Product from "./Product.model.js";
import * as Cart from "./Cart.model.js";
import * as ProductGridView from "./ProductGridView.view.js"
import * as ProductGridViewController from "./ProductGridView.controller.js"
import * as CartView from "./Cart.view.js";
import * as CartController from "./Cart.controller.js";
import * as User from "./User.model.js";
import * as CategoriesView from "./CategoriesView.view.js";
import * as CategoriesViewController from "./CategoriesView.controller.js";

function onProductsLoaded(loadedProducts: Product.Product[]) {
    Product.setProducts(loadedProducts);

    showProductsGrid(loadedProducts);
    showCurrentUserSavedCart();
    showCategories();
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
        Cart.setCart(Cart.newCart());
    }
}

function navigateToLogin() {
    window.location.href = "index.html";
}

function showProductsGrid(products: Product.Product[]) {
    ProductGridView.renderProductsGridView(products);
    ProductGridViewController.addOnAddToCartClickedListener((productId) => {
        Cart.addToCartById(productId);
    });
}

function showPayedDialog(payedCart: Cart.Cart) {
    const payDialog = document.createElement("dialog");
    payDialog.classList.add("payed-dialog");
    payDialog.innerHTML = `
        <h2 class="payed-dialog__text">Thanks, ${User.getCurrentUser().firstName} for paying ${payedCart.total}$</h2>
        <form method="dialog" class="payed-dialog__actions">
            <button class="payed-dialog__button">OK</button>
        </form>
`;
    const dialogOkButton = payDialog.querySelector(".payed-dialog__button") as HTMLButtonElement;
    dialogOkButton.addEventListener("click", (event) => {

        payDialog.close();
        payDialog.remove();

    })
    document.body.append(payDialog);
    payDialog.showModal();
}

function showCart() {
    CartView.showCartView(User.getCurrentUser().firstName, Cart.getCart());

    Cart.addOnCartUpdateListener((cart) => {
        CartView.updateCartProductsView(cart);
    });

    CartController.addOnCartSaveListener((cart) => {
        User.setSavedCartToUser(User.getCurrentUser().userName, cart);
    });

    CartController.addOnCartPayListener(() => {
        const payedCart = Cart.pay();
        const currentUsername = User.getCurrentUser().userName;
        User.addCartToUser(currentUsername, payedCart);
        User.clearSavedCartOfUser(currentUsername);
        showPayedDialog(payedCart);
    });
}

function showCategories() {
    CategoriesView.showCategoriesView();
    CategoriesViewController.addOnCategorySelectedListener((category) => {
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

}

main();
