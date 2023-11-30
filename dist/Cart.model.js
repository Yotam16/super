var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as CartProducts from "./CartProducts.js";
import { getProductbyID } from "./Product.model.js";
var cart = newCart(0);
export function newCart(uid) {
    var cart = { userID: uid, products: CartProducts.empty(), total: 0 };
    return cart;
}
export function setCart(cart) {
    cart = __assign({}, cart);
    onUpdate();
}
export function getCart() {
    return __assign({}, cart);
}
export function updateCartTotal() {
    cart.total = CartProducts.calulateTotalPrice(cart.products);
}
export function addToCartById(productId, amount) {
    if (amount === void 0) { amount = 1; }
    CartProducts.add(getCart().products, productId, amount);
    updateCartTotal();
    onUpdate();
}
export function subtractFromCartById(productId, amount) {
    if (amount === void 0) { amount = 1; }
    CartProducts.subtract(getCart().products, productId, amount);
    updateCartTotal();
    onUpdate();
}
export function removeFromCartById(productId) {
    CartProducts.remove(getCart().products, productId);
    updateCartTotal();
    onUpdate();
}
export function setProductAmountById(productId, amount) {
    CartProducts.setAmount(getCart().products, productId, amount);
    updateCartTotal();
    onUpdate();
}
export function calculatePriceByProductId(productId) {
    var product = getProductbyID(productId);
    return CartProducts.calculateSingleProduct(getCart().products, product.PID, product.price);
}
export function clearCart() {
    CartProducts.clear(getCart().products);
    updateCartTotal();
    onUpdate();
}
// stub
export function pay() {
    console.log("Cart pay: " + cart.total);
}
export var onCartUpdateListener = [];
export function addOnCartUpdateListener(callback) {
    onCartUpdateListener.push(callback);
}
function onUpdate() {
    onCartUpdateListener.forEach(function (listener) { return listener(getCart()); });
}
// comment out for Record list conversion
// export function removeFromCart(product: Product, cart: Cart, quantity: number): Cart {
//     const pid = product.PID;
//     for (let i = 0; i < cart.products.length; i++) {
//         if (pid === cart.products[i].PID) {
//             cart.products.splice(i, 1);
//             quantity -= 1;
//             if (0 === quantity) {
//                 console.log('removeFromCart: success');
//                 return cart;
//             }
//         }
//     }
//     console.log('removeFromCart: item(S) not found; returning the best cart possible');
//     return cart;
// }
// export function addToCart(product: Product, cart: Cart): Cart {
//     if (product.inStock) {
//         cart.products.push(product);
//         cart.total += product.price;
//     } else {
//         console.log(`Product ${product.name} is not in stock.`);
//     }
//     console.log(`item ${product.name} removed from cart.`);
//     return cart;
// }
// View logic
// export function printShoppingCart(cart: Cart) {
//     const productListDiv = document.getElementById('productList');
//     console.log('printShoppingCart was called');
//     if (productListDiv) {
//         const productListUl = document.createElement('ul');
//         productListUl.setAttribute('id', 'cartList');
//         cart.products.forEach((product) => {
//             const productItemLi = document.createElement('li');
//             productItemLi.textContent = `Name: ${product.name}, PID: ${product.PID}, Category: ${product.cat}, Price: ${product.price}, In Stock: ${product.inStock}, Pic Path: ${product.pic_path}`;
//             productListUl.appendChild(productItemLi);
//         });
//         productListDiv.appendChild(productListUl);
//     }
// }
// document.addEventListener('DOMContentLoaded', function () {
//     console.log('event litener for printing the cart list');
//     //const cart = newCart();
//     //printShoppingCart(cart);
// });
