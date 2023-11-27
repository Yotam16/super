var _a, _b;
var users = JSON.parse(localStorage.getItem('users') || '[]');
(_a = document.getElementById('loginForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    var usernameInput = document.getElementById('userName').value;
    var passwordInput = document.getElementById('password').value;
    var user = users.find(function (user) { return user.userName === usernameInput && user.password === passwordInput; });
    if (user) {
        console.log('Login successful!');
        window.location.href = 'index.html';
    }
    else {
        displayErrorMessage('Invalid username or password. Please try again.');
    }
});
(_b = document.getElementById('signInForm')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (event) {
    event.preventDefault();
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var age = parseInt(document.getElementById('age').value, 10);
    var gender = document.getElementById('gender').value;
    var email = document.getElementById('email').value;
    var userName = document.getElementById('userName').value;
    var password = document.getElementById('password').value;
    var passwordVerify = document.getElementById('passwordVerify').value;
    if (password !== passwordVerify) {
        displayErrorMessage('Passwords do not match.');
        return;
    }
    if (isUserNameExists(userName)) {
        displayErrorMessage('Username already exists. Please choose another.');
        return;
    }
    if (isEmailExists(email)) {
        displayErrorMessage('email already in use.');
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
        password: password
    };
    addUser(newUser);
    window.location.href = 'index.html';
});
function addUser(newUser) {
    users.push(newUser);
    updateLocalStorage();
}
function updateLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}
function isUserNameExists(username) {
    return users.some(function (user) { return user.userName === username; });
}
function isEmailExists(email) {
    return users.some(function (user) { return user.email === email; });
}
function displayErrorMessage(message, color) {
    if (color === void 0) { color = 'red'; }
    var errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.color = color;
}
