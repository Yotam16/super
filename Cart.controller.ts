import * as Cart from "./Cart.model.js";
import { ProductId } from "./Product.model.js";


type OnCartSaveListener = (cart: Cart.Cart) => void;
const onCartSaveListeners = [] as OnCartSaveListener[];
export function addOnCartSaveListener(callback: OnCartSaveListener) {
    onCartSaveListeners.push(callback);
}
export function onCartSave(cart: Cart.Cart) {
    onCartSaveListeners.forEach((listener) => listener(cart));
}

export function onSaveCartEvent(event: MouseEvent) {
    console.log("save cart fired");
    onCartSave(Cart.getCart());
}

export function onEmptyCartEvent(event: MouseEvent) {
    Cart.clearCart();
}

export function onProductRemoveEvenet(productId: ProductId) {
    Cart.removeFromCartById(productId);
}

export function onPayCartEvent(event: MouseEvent) {
    Cart.pay();
}

export function onProductAddAmount(amountView: HTMLInputElement) {
    let amount = Number(amountView.value);
    amountView.value = `${amount + 1}`;
}

export function onProductSbutractAmount(amountView: HTMLInputElement) {
    let amount = Number(amountView.value);

    if (amount <= 0) {
        amountView.value = `0`;
        return;
    }

    amountView.value = `${amount - 1}`;
}

export function onProductAmountChanged(event: Event) {
    const amountView = event.target as HTMLInputElement;
    let amount = Number(amountView.value);
    if (amount <= 0) {
        amountView.value = `0`;
    }
}

export function onProductAmountUpdate(productId: ProductId, amount: number) {
    Cart.setProductAmountById(productId, amount);
}
