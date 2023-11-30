import * as CartProducts from "./CartProducts.js";
import { Product, ProductId, getProductbyID } from "./Product.model.js";
import { addCartToUser } from "./User.model.js";


export type Cart = {
    products: CartProducts.CartProducts;
    total: number;
}
const cart: Cart = newCart();


export function newCart(): Cart {
    const cart: Cart = { products: CartProducts.empty(), total: 0 };
    return cart;
}

export function setCart(newCart: Cart) {
    cart.products = newCart.products;
    cart.total = newCart.total;
    updateCartTotal();
    onUpdate();
}

export function getCart(): Cart {
    return { ...cart };
}

export function updateCartTotal() {
    cart.total = CartProducts.calulateTotalPrice(cart.products);
}

export function addToCartById(productId: ProductId, amount: number = 1) {
    CartProducts.add(getCart().products, productId, amount);
    updateCartTotal();
    onUpdate();
}

export function subtractFromCartById(productId: ProductId, amount: number = 1) {
    CartProducts.subtract(getCart().products, productId, amount);
    updateCartTotal();
    onUpdate();
}

export function removeFromCartById(productId: ProductId) {
    CartProducts.remove(getCart().products, productId);
    updateCartTotal();
    onUpdate();
}

export function setProductAmountById(productId: ProductId, amount: number) {
    CartProducts.setAmount(getCart().products, productId, amount);
    updateCartTotal();
    onUpdate();
}

export function calculatePriceByProductId(productId: ProductId) {
    const product = getProductbyID(productId);
    return CartProducts.calculateSingleProduct(getCart().products, product.PID, product.price);
}

export function clearCart() {
    CartProducts.clear(getCart().products);
    updateCartTotal();
    onUpdate();
}

export function pay(): Cart {
    console.log("Cart payed: " + cart.total);
    const payedCart = getCart();
    setCart(newCart());

    return payedCart;
}

type OnCartUpdateListener = (cart: Cart) => void;
export const onCartUpdateListener = [] as OnCartUpdateListener[];

export function addOnCartUpdateListener(callback: OnCartUpdateListener) {
    onCartUpdateListener.push(callback);
}

function onUpdate() {
    onCartUpdateListener.forEach((listener) => listener(getCart()));
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