import * as Cart from "./Cart.model.js";
import { emptyButtonView } from "./Cart.view.js";


export function attachEmptyCartEvent() {
    emptyButtonView.addEventListener("click", (event) => {
        console.log("cleart cart fired")
        Cart.clearCart();
    });
}