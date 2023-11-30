import { Cart } from "./Cart.model.js";
import * as CartProducts from "./CartProducts.js";
import { Product } from "./Product.model.js";

const BEM_CART_PEFIX = ".cart__";
const cartView = document.querySelector(".cart") as HTMLDivElement;
const titleView = cartView.querySelector(BEM_CART_PEFIX + "title") as HTMLHeadingElement;
const saveButtonView = cartView.querySelector(BEM_CART_PEFIX + "button-save") as HTMLButtonElement;
const emptyButtonView = cartView.querySelector(BEM_CART_PEFIX + "button-empty") as HTMLButtonElement;
const totalPriceView = cartView.querySelector(BEM_CART_PEFIX + "total-price") as HTMLSpanElement;
const payButtonView = cartView.querySelector(BEM_CART_PEFIX + "button-pay") as HTMLButtonElement;

const cartProductsListView = cartView.querySelector(".cart-list") as HTMLUListElement;

export function showCartView(cart: Cart) {
    console.log(cartView);

    setTitle("Yotam's Cart");

    renderCartProductsView(cart.products);

    setTotalPrice(CartProducts.calulateTotalPrice(cart.products));
}

function setTitle(title: string) {
    titleView.innerText = title;
}

function setTotalPrice(price: number) {
    totalPriceView.innerText = price.toString();
}

function renderCartProductsView(cartProducts: CartProducts.CartProducts) {
    const products = CartProducts.toArray(cartProducts);

    cartProductsListView.innerHTML = `
        ${products.map(renderProductView).join("\n")}
    `
}

function renderProductView(cartProduct: CartProducts.CartProduct) {
    return `
    <li class="cart-list__item">
        <img src="${cartProduct.product.pic_path}"
            alt="" class="cart-list__image">
        <div class="cart-list__body">
            <div class="cart-list__name">${cartProduct.product.name}</div>
            <div class="cart-list__price">${cartProduct.product.price}$</div>
            <div class="cart-list__quantity"><span>Amount: </span>${cartProduct.amount}</div>
            <form class="cart-list__actions">
                <button class="cart-list__button cart-list__action-update">Update</button>

                <button class="cart-list__button cart-list__button-subtract">-</button>
                <input type="number" name="cart-list__amount" id="product-amount-123"
                    class="cart-list__input-amount">
                <!-- <label for="product-amount-123">unit</label> -->
                <button class="cart-list__button cart-list__action-add">+</button>
            </form>
        </div>
        <div class="cart-list__action-remove"><svg fill="#000000" height="1rem" width="1rem"
                version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775"
                xml:space="preserve">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z">
                    </path>
                </g>
            </svg>
        </div>
    </li>
    `
}

