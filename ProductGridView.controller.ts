import * as Product from "./Product.model.js";

export function attachAddToCartEvent(buttons: NodeListOf<HTMLButtonElement>) {
    buttons.forEach(buttons => buttons.addEventListener("click", (event) => {
        const target = event.target as HTMLButtonElement;
        const productId = target.getAttribute("data-product-id") as string;

        if (!productId) throw new Error("Add to cart event - Couldn't find product ID to add to cart.");

        const convertedId = Number(productId);
        if (Number.isNaN(convertedId)) throw new Error("Add to cart event - Product ID isnt a number")

        onAddToCartEvent(convertedId);
    }));
}

export function onAddToCartEvent(productId: number) {
    console.log(productId);
    console.log(`Product id ${productId} add to cart event fired`)
    // const product = Product.getProductbyID(productId);
}
