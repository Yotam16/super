
import * as Product from "./Product.model.js";
import * as Cart from "./Cart.model.js";
import * as ProductGridView from "./ProductGridView.view.js"
import * as ProductGridViewController from "./ProductGridView.controller.js"
import { SOUND_ADDTOCART, playSound } from "./sounds.js";
import * as CartView from "./Cart.view.js";
import { toArray } from "./CartProducts.js";

function onProductsLoaded(loadedProducts: Product.Product[]) {
    Product.setProducts(loadedProducts);
    ProductGridView.renderProductsGridView(loadedProducts);
    ProductGridViewController.addOnAddToCartClickedListener((product) => {
        Cart.addToCart(product);
    });
}

function main() {

    Cart.addOnCartUpdateListener((cart) => {
        CartView.showCartView(cart);
    });

    Cart.setCart(Cart.newCart(0));

    Product.loadAllProducts(onProductsLoaded);

}

main();