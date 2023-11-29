var _a, _b;
import { addUser, getUsers, isEmailExists, isUserNameExists } from "./User.model.js";
import { displayErrorMessage } from "./User.view.js";
(_a = document.getElementById("loginForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    event.preventDefault();
    var usernameInput = document.getElementById("userName").value;
    var passwordInput = document.getElementById("password").value;
    // 1. TODO - create a function login(username, password ) that returns true / false in UserModel
    var user = getUsers().find(function (user) {
        return user.userName === usernameInput && user.password === passwordInput;
    });
    console.log(user);
    if (user) {
        console.log("Login successful!");
        window.location.href = "index.html";
    }
    else {
        displayErrorMessage("Invalid username or password. Please try again.");
    }
});
(_b = document.getElementById("signInForm")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", function (event) {
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
