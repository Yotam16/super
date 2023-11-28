
import * as Product from "./Product.model.js";
import * as ProductGridView from "./ProductGridView.view.js"

function onProductsLoaded(products: Product.Product[]) {

    // continue app 
    // TODO - update global products array with loaded products
    ProductGridView.renderProductsGridView(products);

}

function main() {

    console.log("Loading products from file...")
    Product.loadAllProducts(onProductsLoaded);

}

main();

