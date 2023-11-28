
import * as Product from "./Product.model.js";


function onProductsLoaded(products: Product.Product[]) {
    console.log("products loaded, can continue")
    console.log(products)

    // continue app 

}

function main() {

    console.log("Loading products from file...")
    Product.loadAllProducts(onProductsLoaded);

}



main();