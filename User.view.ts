export function displayErrorMessage(message: string, color: string = "red"): void {
    const errorMessage = document.getElementById("errorMessage");

    errorMessage!.textContent = message;
    errorMessage!.style.color = color;
}