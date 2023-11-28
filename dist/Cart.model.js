export function newCart(uid) {
    var cart = { userID: uid, products: [], total: 0 };
    return cart;
}
export function removeFromCart(product, cart, quantity) {
    var pid = product.PID;
    for (var i = 0; i < cart.products.length; i++) {
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
export function addToCart(product, cart) {
    if (product.inStock) {
        cart.products.push(product);
        cart.total += product.price;
    }
    else {
        console.log("Product " + product.name + " is not in stock.");
    }
    console.log("item " + product.name + " removed from cart.");
    return cart;
}
export function reloadCart(cart) {
    return cart;
}
