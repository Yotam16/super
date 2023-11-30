import { onEmptyCartEvent, onPayCartEvent, onProductAddAmount, onProductAmountChanged, onProductAmountUpdate, onProductRemoveEvenet, onProductSbutractAmount } from "./Cart.controller.js";
import { calculatePriceByProductId } from "./Cart.model.js";
import * as CartProducts from "./CartProducts.js";
var BEM_CART_PEFIX = ".cart__";
var DATA_PRODUCTID_PEFIX = "data-product-id";
var cartView = document.querySelector(".cart");
var titleView = cartView.querySelector(BEM_CART_PEFIX + "title");
export var saveButtonView = cartView.querySelector(BEM_CART_PEFIX + "button-save");
export var emptyButtonView = cartView.querySelector(BEM_CART_PEFIX + "button-empty");
var totalPriceView = cartView.querySelector(BEM_CART_PEFIX + "total-price");
export var payButtonView = cartView.querySelector(BEM_CART_PEFIX + "button-pay");
var cartProductsListView = cartView.querySelector(".cart-list");
export function showCartView(cart) {
    setTitle("Vlad's Cart");
    setTotalPrice(0);
    updateCartProductsView(cart);
    emptyButtonView.addEventListener("click", onEmptyCartEvent);
    payButtonView.addEventListener("click", onPayCartEvent);
}
function setTitle(title) {
    titleView.innerText = title;
}
function setTotalPrice(price) {
    totalPriceView.innerText = price.toFixed(2).toString();
}
export function updateCartProductsView(cart) {
    renderCartProductsView(cart.products);
    setTotalPrice(cart.total);
}
function renderCartProductsView(cartProducts) {
    var products = CartProducts.toArray(cartProducts);
    cartProductsListView.innerHTML = "\n        " + products.map(renderProductView).join("\n") + "\n    ";
    var productActions = cartProductsListView.querySelectorAll(".cart-list__actions");
    productActions.forEach(function (productActionsView) {
        var targetProduct = productActionsView.getAttribute(DATA_PRODUCTID_PEFIX);
        if (!targetProduct)
            throw new Error("CartProductsRender - Couldnt find product id in product actions");
        var amountView = productActionsView.querySelector(".cart-list__input-amount");
        var addAmountView = productActionsView.querySelector(".cart-list__action-add");
        var subtractAmountView = productActionsView.querySelector(".cart-list__button-subtract");
        var updateAmountView = productActionsView.querySelector(".cart-list__action-update");
        amountView.addEventListener("change", onProductAmountChanged);
        addAmountView.addEventListener("click", function (event) {
            onProductAddAmount(amountView);
        });
        subtractAmountView.addEventListener("click", function (event) {
            onProductSbutractAmount(amountView);
        });
        updateAmountView.addEventListener("click", function (event) {
            onProductAmountUpdate(targetProduct, Number(amountView.value));
        });
    });
    var productRemoveButtons = cartProductsListView.querySelectorAll(".cart-list__action-remove");
    productRemoveButtons.forEach(function (removeProductView) {
        var targetProduct = removeProductView.getAttribute(DATA_PRODUCTID_PEFIX);
        if (!targetProduct)
            throw new Error("CartProductsRender - Couldnt find product id for remove button");
        removeProductView.addEventListener("click", function (event) {
            onProductRemoveEvenet(targetProduct);
        });
    });
}
function renderProductView(cartProduct) {
    return "\n    <li class=\"cart-list__item\">\n        <img src=\"" + cartProduct.product.pic_path + "\"\n            alt=\"\" class=\"cart-list__image\">\n        <div class=\"cart-list__body\">\n            <div class=\"cart-list__name\">" + cartProduct.product.name + "</div>\n            <div class=\"cart-list__price\">" + calculatePriceByProductId(cartProduct.product.PID).toFixed(2) + "$</div>\n            <div class=\"cart-list__quantity\"><span>Amount: </span>" + cartProduct.amount + "</div>\n            <div class=\"cart-list__actions\" " + DATA_PRODUCTID_PEFIX + "=\"" + cartProduct.product.PID + "\">\n                <button class=\"cart-list__button cart-list__action-update\" > Update </button>\n                <button class=\"cart-list__button cart-list__button-subtract\" >-</button>\n                <input type= \"number\" name =\"cart-list__amount\" class=\"cart-list__input-amount\" value=" + cartProduct.amount + " min=\"0\">\n                <button class=\"cart-list__button cart-list__action-add\" >+</button>\n            </div>\n            </div>\n            <div class=\"cart-list__action-remove\" " + DATA_PRODUCTID_PEFIX + "=\"" + cartProduct.product.PID + "\"> <svg fill=\"#000000\" height = \"1rem\" width = \"1rem\"\n    version = \"1.1\" id = \"Capa_1\" xmlns = \"http://www.w3.org/2000/svg\"\n    xmlns: xlink = \"http://www.w3.org/1999/xlink\" viewBox = \"0 0 460.775 460.775\"\n    xml: space = \"preserve\" >\n        <g id=\"SVGRepo_bgCarrier\" stroke - width=\"0\" > </g>\n            < g id = \"SVGRepo_tracerCarrier\" stroke - linecap=\"round\" stroke - linejoin=\"round\" > </g>\n                < g id = \"SVGRepo_iconCarrier\" >\n                    <path\n                        d=\"M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z\" >\n        </path>\n        < /g>\n        < /svg>\n        < /div>\n        < /li>\n            ";
}
