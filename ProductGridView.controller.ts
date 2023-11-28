import { Product, getProductbyID } from "./Product.model.js";

type AddToCartClickedListener = (product: Product) => void;
const onAddToCartClickedListeners = [] as AddToCartClickedListener[];

export function attachAddToCartEvent(buttons: NodeListOf<HTMLButtonElement>) {
    buttons.forEach(buttons => buttons.addEventListener("click", (event) => {
        const target = event.target as HTMLButtonElement;
        const targetProductId = target.getAttribute("data-product-id") as string;

        if (!targetProductId) throw new Error("Add to cart event - Couldn't find product ID to add to cart.");

        const productId = Number(targetProductId);
        if (Number.isNaN(productId)) throw new Error("Add to cart event - Product ID isnt a number")

        onAddToCartClickedEvent(productId);
    }));
}

export function onAddToCartClickedEvent(productId: number) {
    console.log(`Product id ${productId} add to cart event fired`)

    const product = getProductbyID(productId);

    onAddToCartClickedListeners.forEach((listener) => listener(product));
}

export function addOnAddToCartClickedListener(callback: AddToCartClickedListener) {
    onAddToCartClickedListeners.push(callback);
}

