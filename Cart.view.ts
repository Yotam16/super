import { onEmptyCartEvent, onPayCartEvent, onProductAddAmount, onProductAmountChanged, onProductAmountUpdate, onProductRemoveEvenet, onProductSbutractAmount, onSaveCartEvent } from "./Cart.controller.js";
import { Cart, calculatePriceByProductId } from "./Cart.model.js";
import * as CartProducts from "./CartProducts.js";

const BEM_CART_PEFIX = ".cart__";
const DATA_PRODUCTID_PEFIX = "data-product-id";
const cartView = document.querySelector(".cart") as HTMLDivElement;
const titleView = cartView.querySelector(BEM_CART_PEFIX + "title") as HTMLHeadingElement;
export const saveCartButtonView = cartView.querySelector(BEM_CART_PEFIX + "button-save") as HTMLButtonElement;
export const emptyButtonView = cartView.querySelector(BEM_CART_PEFIX + "button-empty") as HTMLButtonElement;
const totalPriceView = cartView.querySelector(BEM_CART_PEFIX + "total-price") as HTMLSpanElement;
export const payButtonView = cartView.querySelector(BEM_CART_PEFIX + "button-pay") as HTMLButtonElement;

const cartProductsListView = cartView.querySelector(".cart-list") as HTMLUListElement;

export function showCartView(name: string, cart: Cart) {
    setTitle(`${name}'s Cart`);
    setTotalPrice(0);

    updateCartProductsView(cart);

    emptyButtonView.addEventListener("click", onEmptyCartEvent);
    saveCartButtonView.addEventListener("click", onSaveCartEvent);
    payButtonView.addEventListener("click", onPayCartEvent)
}

function setTitle(title: string) {
    titleView.innerText = title;
}

function setTotalPrice(price: number) {
    totalPriceView.innerText = price.toFixed(2).toString();
}

export function updateCartProductsView(cart: Cart) {
    renderCartProductsView(cart.products);
    setTotalPrice(cart.total);
}

function renderCartProductsView(cartProducts: CartProducts.CartProducts) {
    const products = CartProducts.toArray(cartProducts);

    cartProductsListView.innerHTML = `
        ${products.map(renderProductView).join("\n")}
    `;

    const productActions = cartProductsListView.querySelectorAll(".cart-list__actions");
    productActions.forEach((productActionsView) => {

        const targetProduct = productActionsView.getAttribute(DATA_PRODUCTID_PEFIX);

        if (!targetProduct) throw new Error("CartProductsRender - Couldnt find product id in product actions");

        const amountView = productActionsView.querySelector(".cart-list__input-amount") as HTMLInputElement;
        const addAmountView = productActionsView.querySelector(".cart-list__action-add") as HTMLButtonElement;
        const subtractAmountView = productActionsView.querySelector(".cart-list__button-subtract") as HTMLButtonElement;
        const updateAmountView = productActionsView.querySelector(".cart-list__action-update") as HTMLButtonElement;

        amountView.addEventListener("change", onProductAmountChanged);

        addAmountView.addEventListener("click", (event) => {
            onProductAddAmount(amountView);
        });

        subtractAmountView.addEventListener("click", (event) => {
            onProductSbutractAmount(amountView);
        });

        updateAmountView.addEventListener("click", (event) => {
            onProductAmountUpdate(targetProduct, Number(amountView.value))
        })
    });

    const productRemoveButtons = cartProductsListView.querySelectorAll(".cart-list__action-remove");
    productRemoveButtons.forEach((removeProductView) => {
        const targetProduct = removeProductView.getAttribute(DATA_PRODUCTID_PEFIX);
        if (!targetProduct) throw new Error("CartProductsRender - Couldnt find product id for remove button");

        removeProductView.addEventListener("click", (event) => {
            onProductRemoveEvenet(targetProduct);
        });
    });
}

function renderProductView(cartProduct: CartProducts.CartProduct) {
    return `
    <li class="cart-list__item">
        <img src="${cartProduct.product.pic_path}"
            alt="" class="cart-list__image">
        <div class="cart-list__body">
            <div class="cart-list__name">${cartProduct.product.name}</div>
            <div class="cart-list__price">${calculatePriceByProductId(cartProduct.product.PID).toFixed(2)}$</div>
            <div class="cart-list__quantity"><span>Amount: </span>${cartProduct.amount}</div>
            <div class="cart-list__actions" ${DATA_PRODUCTID_PEFIX}="${cartProduct.product.PID}">
                <button class="cart-list__button cart-list__action-update" > Update </button>
                <button class="cart-list__button cart-list__button-subtract" >-</button>
                <input type= "number" name ="cart-list__amount" class="cart-list__input-amount" value=${cartProduct.amount} min="0">
                <button class="cart-list__button cart-list__action-add" >+</button>
            </div>
            </div>
            <div class="cart-list__action-remove" ${DATA_PRODUCTID_PEFIX}="${cartProduct.product.PID}"> <svg fill="#000000" height = "1rem" width = "1rem"
    version = "1.1" id = "Capa_1" xmlns = "http://www.w3.org/2000/svg"
    xmlns: xlink = "http://www.w3.org/1999/xlink" viewBox = "0 0 460.775 460.775"
    xml: space = "preserve" >
        <g id="SVGRepo_bgCarrier" stroke - width="0" > </g>
            < g id = "SVGRepo_tracerCarrier" stroke - linecap="round" stroke - linejoin="round" > </g>
                < g id = "SVGRepo_iconCarrier" >
                    <path
                        d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" >
        </path>
        < /g>
        < /svg>
        < /div>
        < /li>
            `;
}

