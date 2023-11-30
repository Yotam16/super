import { Product, ProductId, getProductbyID } from "./Product.model.js";

export type CartProduct = { product: Product, amount: number };
export type CartProducts = Record<ProductId, number>;


export function empty(): Record<string, number> {
    return {};
}

export function calulateTotalPrice(cartProducts: CartProducts) {
    let totalPrice = 0;

    for (const productId in cartProducts) {
        const product = getProductbyID(productId);
        const amount = cartProducts[productId];
        totalPrice += amount * product.price;
    }

    return totalPrice;
}

export function add(cartProducts: CartProducts, productToAdd: ProductId, amount: number = 1) {
    const currentAmount = getAmount(cartProducts, productToAdd);

    if (!currentAmount) {
        cartProducts[productToAdd] = 0;
    }

    cartProducts[productToAdd] += amount;
}

export function subtract(cartProducts: CartProducts, productToSubtract: ProductId, amount: number = 1) {
    const currentAmount = getAmount(cartProducts, productToSubtract);

    if (!currentAmount) throw new Error(`CartProducts subtract ${productToSubtract} not found`);

    if (currentAmount - amount <= 0) {
        remove(cartProducts, productToSubtract);
        return;
    }

    cartProducts[productToSubtract] -= amount;
}

export function remove(cartProducts: CartProducts, productToRemove: ProductId) {
    delete cartProducts[productToRemove];
}

export function clear(cartProducts: CartProducts) {
    for (const productId in cartProducts) {
        remove(cartProducts, productId);
    }
}

export function getAmount(cartProducts: CartProducts, productToCount: ProductId) {
    return cartProducts[productToCount];
}

export function toArray(cartProducts: CartProducts): CartProduct[] {
    const cartProductsArray = [] as CartProduct[];
    Object.entries(cartProducts).map((product) => {
        cartProductsArray.push({ product: getProductbyID(product[0]), amount: product[1] });
    });
    return cartProductsArray;
}
