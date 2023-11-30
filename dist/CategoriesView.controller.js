var onCategorySelectedListeners = [];
export function addOnCategorySelectedListener(callback) {
    onCategorySelectedListeners.push(callback);
}
export function onCategoryPressed(category) {
    onCategorySelectedListeners.forEach(function (listener) { return listener(category); });
}
