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
}
