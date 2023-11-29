var users = [];
export function loadUsersFromStorage() {
    var loadedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (!loadedUsers) {
        throw new Error("loadUsersFromStorage function - no users found in storage");
    }
    return loadedUsers;
}
export function getUsers() {
    return users.slice();
}
export function setUsers(newUsers) {
    newUsers.forEach(function (user) { return users.push(user); });
}
export function addUser(newUser) {
    users.push(newUser);
    saveUsersToStorage();
}
export function saveUsersToStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}
export function isUserNameExists(username) {
    return users.some(function (user) { return user.userName === username; });
}
export function isEmailExists(email) {
    return users.some(function (user) { return user.email === email; });
}
// TODO - Safe login function
export function login(username, password) {
    return users.some(function (user) { return user.userName === username && user.password === password; });
}
// TODO - a function that loads current user from storage
export function loadCurrentUserFromStorage() {
    var currentUserName = localStorage.getItem("currentUserName");
    if (currentUserName) {
        var user = users.find(function (user) { return user.userName === currentUserName; });
        if (user) {
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                gender: user.gender,
                email: user.email,
                userName: user.userName,
                password: user.password
            };
        }
        return undefined;
    }
}
// TODO - a function that saves current user to storage
export function saveCurrentUserToStorage(username) {
    localStorage.setItem("currentUserName", username);
}
// TODO - a function that deletes current user from storage
export function deleteCurrentUserFromStorage() {
    localStorage.removeItem("currentUserName");
}
