import { addUser, getUsers, isEmailExists, isUserNameExists } from "./User.model.js";
import { displayErrorMessage } from "./User.view.js";
// TODO - When user logged in, save user as current user so main app will know what user logged in.
export function loadLoginForm() {
    var _a;
    (_a = document.getElementById("loginForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
        event.preventDefault();
        var usernameInput = document.getElementById("userName").value;
        var passwordInput = document.getElementById("password").value;
        // 1. TODO - create a function Login(username, password ) that returns true / false in UserModel
        var user = getUsers().find(function (user) {
            return user.userName === usernameInput && user.password === passwordInput;
        });
        if (user) {
            console.log("Login successful!");
            window.location.href = "index.html";
        }
        else {
            displayErrorMessage("Invalid username or password. Please try again.");
        }
    });
}
// TODO - Add verification functions for inputs
// TODO - Email verification
// TODO - Age verification
// TODO - User verification (must be more than 6 letters, must not be only numbers etc..)
// TODO - Password verification (must be 6-8 characters, must have capital and special character etc..)
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
    });
}
