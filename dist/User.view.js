export function displayErrorMessage(message, color) {
    if (color === void 0) { color = "red"; }
    var errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorMessage.style.color = color;
}
