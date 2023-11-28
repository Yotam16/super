import { Product } from "./Product.model.js";

export type Cart = {

    userID: number;
    products: Product[];
    total: number;
}

export function newCart(uid: number): Cart {

    const cart: Cart = { userID: uid, products: [], total: 0 };
    return cart;
}

export function removeFromCart(product: Product, cart: Cart, quantity: number): Cart {

    const pid = product.PID;

    for (let i = 0; i < cart.products.length; i++) {

        if (pid === cart.products[i].PID) {

            cart.products.splice(i, 1);
            quantity -= 1;

            if (0 === quantity) {

                console.log('removeFromCart: success');
                return cart;
            }
        }
    }

    console.log('removeFromCart: item(S) not found; returning the best cart possible');
    return cart;
}

export function addToCart(product: Product, cart: Cart): Cart {

    if (product.inStock) {

        cart.products.push(product);
        cart.total += product.price;
    } else {

        console.log(`Product ${product.name} is not in stock.`);
    }

    console.log(`item ${product.name} removed from cart.`);
    return cart;
}

export function reloadCart(cart: Cart) { //????

    return cart;
}

