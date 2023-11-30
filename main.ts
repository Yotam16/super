
import * as Product from "./Product.model.js";
import * as Cart from "./Cart.model.js";
import * as ProductGridView from "./ProductGridView.view.js"
import * as ProductGridViewController from "./ProductGridView.controller.js"
import { SOUND_ADDTOCART, playSound } from "./sounds.js";
import * as CartView from "./Cart.view.js";
import { toArray } from "./CartProducts.js";

function onProductsLoaded(loadedProducts: Product.Product[]) {
    console.log(`${loadedProducts.length} products loaded.`);
    Product.setProducts(loadedProducts);
}

function showProductsGrid(products: Product.Product[]) {
    ProductGridView.renderProductsGridView(products);
    ProductGridViewController.addOnAddToCartClickedListener((product) => {

        // COMMENT OUT FOR RECORD TYPE CONVERSION
        // Cart.addToCart(product, currentCart);
        // console.log(`Added product ${product.name} to cart:`)
        // console.log(currentCart);
        // playSound(SOUND_ADDTOCART);

    });
}


function main() {

    Product.addOnProductsChangedListener((products) => {
        showProductsGrid(products);
        console.log(`cart:`)

        Cart.addToCart(products[0]);
        Cart.addToCart(products[1]);
        Cart.addToCart(products[1]);
        Cart.addToCart(products[1]);
        Cart.addToCart(products[1]);
        Cart.addToCart(products[2]);
        Cart.addToCart(products[2]);
        Cart.addToCart(products[3]);
        Cart.addToCart(products[3]);
        Cart.addToCart(products[3]);

        console.log(Cart.getCart());
        CartView.showCartView(Cart.getCart());

    });

    Product.loadAllProducts(onProductsLoaded);

}

main();