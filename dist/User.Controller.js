import { addUser, isEmailExists, isUserNameExists, login, saveCurrentUserToStorage } from "./User.model.js";
import { displayErrorMessage } from "./User.view.js";
export function loadLoginForm() {
    var _a;
    (_a = document.getElementById("loginForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
        event.preventDefault();
        var usernameInput = document.getElementById("userName").value;
        var passwordInput = document.getElementById("password").value;
        if (login(usernameInput, passwordInput)) {
            console.log("Login successful!");
            saveCurrentUserToStorage(usernameInput);
            saveCurrentUserToStorage(usernameInput);
            window.location.href = "store.html";
        }
        else {
            displayErrorMessage("Invalid username or password. Please try again.");
        }
    });
}
export function loadRegisterForm() {
    var _a;
    (_a = document.getElementById("signInForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
        event.preventDefault();
        var firstName = document.getElementById("firstName")
            .value;
        var lastName = document.getElementById("lastName")
            .value;
        var age = parseInt(document.getElementById("age").value, 10);
        var gender = document.getElementById("gender")
            .value;
        var email = document.getElementById("email").value;
        var userName = document.getElementById("userName")
            .value;
        var password = document.getElementById("password")
            .value;
        var passwordVerify = document.getElementById("passwordVerify").value;
        //
        if (password !== passwordVerify) {
            displayErrorMessage("Passwords do not match.");
            return;
        }
        if (isUserNameExists(userName)) {
            displayErrorMessage("Username already exists. Please choose another.");
            return;
        }
        if (isEmailExists(email)) {
            displayErrorMessage("email already in use.");
            return;
        }
        if (gender !== "male" && gender !== "female") {
            return;
        }
        var newUser = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            gender: gender,
            email: email,
            userName: userName,
            password: password,
        };
        addUser(newUser);
        window.location.href = "index.html";
        saveCurrentUserToStorage(userName);
    });
}
