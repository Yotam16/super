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
export function printShoppingCart(cart) {
    var productListDiv = document.getElementById('productList');
    console.log('printShoppingCart was called');
    if (productListDiv) {
        var productListUl_1 = document.createElement('ul');
        productListUl_1.setAttribute('id', 'cartList');
        cart.products.forEach(function (product) {
            var productItemLi = document.createElement('li');
            productItemLi.textContent = "Name: " + product.name + ", PID: " + product.PID + ", Category: " + product.cat + ", Price: " + product.price + ", In Stock: " + product.inStock + ", Pic Path: " + product.pic_path;
            productListUl_1.appendChild(productItemLi);
        });
        productListDiv.appendChild(productListUl_1);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    console.log('event litener for printing the cart list');
    //const cart = newCart();
    //printShoppingCart(cart);
});
