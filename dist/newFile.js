var _a;
import { displayErrorMessage } from "./User.view";
(_a = document.getElementById("loginForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    event.preventDefault();
    var usernameInput = document.getElementById("userName").value;
    var passwordInput = document.getElementById("password").value;
    var user = users.find(function (user) { return user.userName === usernameInput && user.password === passwordInput; });
    if (user) {
        console.log("Login successful!");
        window.location.href = "index.html";
    }
    else {
        displayErrorMessage("Invalid username or password. Please try again.");
    }
});
