
import { Product, loadAllProducts } from "./product.js";


function onProductsLoaded(products: Product[]) {
    console.log("products loaded, can continue")
    console.log(products)

    // continue app 
}

function main() {

    console.log("Loading products from file...")
    loadAllProducts(onProductsLoaded);

}



main();