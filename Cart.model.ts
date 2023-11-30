import * as CartProducts from "./CartProducts.js";
import { Product } from "./Product.model.js";


export type Cart = {

    userID: number;
    products: CartProducts.CartProducts;
    total: number;
}

const cart: Cart = newCart(0);


export function newCart(uid: number): Cart {

    const cart: Cart = { userID: uid, products: CartProducts.empty(), total: 0 };
    return cart;
}

export function setCart(cart: Cart) {
    cart = { ...cart };
}

export function getCart(): Cart {
    return { ...cart };
}

export function addToCart(product: Product, amount: number = 1) {
    CartProducts.add(getCart().products, product.PID, amount);
}

export function subtractFromCart(product: Product, amount: number = 1) {
    CartProducts.subtract(getCart().products, product.PID, amount)
}

export function removeFromCart(product: Product) {
    CartProducts.remove(getCart().products, product.PID)
}

export function clearCart() {
    CartProducts.clear(getCart().products);
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