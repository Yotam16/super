import { Category } from "./Product.model.js";


type OnCategorySelectedListener = (category: Category) => void;
const onCategorySelectedListeners = [] as OnCategorySelectedListener[];
export function addOnCategorySelectedListener(callback: OnCategorySelectedListener) {
    onCategorySelectedListeners.push(callback);
}

export function onCategoryPressed(category: Category) {
    onCategorySelectedListeners.forEach((listener) => listener(category));
}