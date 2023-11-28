type Gender = "male" | "female";

type User = {
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  email: string;
  userName: string;
  password: string;
};

type Users = User[];

const users: Users = JSON.parse(localStorage.getItem("users") || "[]");

document
  .getElementById("loginForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    const usernameInput = (
      document.getElementById("userName") as HTMLInputElement
    ).value;
    const passwordInput = (
      document.getElementById("password") as HTMLInputElement
    ).value;

    const user = users.find(
      (user) =>
        user.userName === usernameInput && user.password === passwordInput
    );

    if (user) {
      console.log("Login successful!");

      window.location.href = "index.html";
    } else {
      displayErrorMessage("Invalid username or password. Please try again.");
    }
  });

document
  .getElementById("signInForm")
  ?.addEventListener("submit", function (event) {
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
  });

function addUser(newUser: User): void {
  users.push(newUser);
  updateLocalStorage();
}

function updateLocalStorage(): void {
  localStorage.setItem("users", JSON.stringify(users));
}

function isUserNameExists(username: string): boolean {
  return users.some((user) => user.userName === username);
}

function isEmailExists(email: string): boolean {
  return users.some((user) => user.email === email);
}

function displayErrorMessage(message: string, color: string = "red"): void {
  const errorMessage = document.getElementById("errorMessage");

  errorMessage!.textContent = message;
  errorMessage!.style.color = color;
}
