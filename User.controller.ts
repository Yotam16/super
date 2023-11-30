import { User, addUser, getUsers, isEmailExists, isUserNameExists, login, saveCurrentUserToStorage } from "./User.model.js";
import { displayErrorMessage } from "./User.view.js";


export function loadLoginForm() {
  document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const usernameInput = (
      document.getElementById("userName") as HTMLInputElement
    ).value;
    const passwordInput = (
      document.getElementById("password") as HTMLInputElement
    ).value;

    if (login(usernameInput, passwordInput)) {
      console.log("Login successful!");
      saveCurrentUserToStorage(usernameInput);


      saveCurrentUserToStorage(usernameInput);
      window.location.href = "store.html";

    } else {
      displayErrorMessage("Invalid username or password. Please try again.");
    }
  });
}

export function loadRegisterForm() {
  document.getElementById("signInForm")?.addEventListener("submit", function (event) {
    event.preventDefault();


    const firstName = (document.getElementById("firstName") as HTMLInputElement)
      .value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement)
      .value;
    const age = parseInt(
      (document.getElementById("age") as HTMLInputElement).value,
      10
    );

    const gender = (document.getElementById("gender") as HTMLSelectElement)
      .value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const userName = (document.getElementById("userName") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const passwordVerify = (
      document.getElementById("passwordVerify") as HTMLInputElement
    ).value;
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

    const newUser: User = {
      firstName,
      lastName,
      age,
      gender,
      email,
      userName,
      password,
    };

    addUser(newUser);

    window.location.href = "index.html";

    saveCurrentUserToStorage(userName);
  });
}
