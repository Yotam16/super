import { Product, ProductId, getProductbyID } from "./Product.model.js";

type AddToCartClickedListener = (product: Product) => void;
const onAddToCartClickedListeners = [] as AddToCartClickedListener[];

export function attachAddToCartEvent(buttons: NodeListOf<HTMLButtonElement>) {
    buttons.forEach(buttons => buttons.addEventListener("click", (event) => {
        const target = event.target as HTMLButtonElement;
        const targetProductId = target.getAttribute("data-product-id") as string;

        if (!targetProductId) throw new Error("Add to cart event - Couldn't find product ID to add to cart.");

        onAddToCartClickedEvent(targetProductId);
    }));
}

export function onAddToCartClickedEvent(productId: ProductId) {
    const product = getProductbyID(productId);
    console.log("adding product to cart")
    console.log(product)
    onAddToCartClickedListeners.forEach((listener) => listener(product));
}

export function addOnAddToCartClickedListener(callback: AddToCartClickedListener) {
    onAddToCartClickedListeners.push(callback);
}

