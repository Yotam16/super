var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var STORAGE_USERS = "users";
var STORAGE_CURRENTUSER = "current_user";
var users = [];
var currentUser = "InvalidUserName";
export function getUserByUsername(username) {
    var searchedUser = getUsers().find(function (user) { return user.userName === username; });
    if (!searchedUser)
        throw new Error("getUsers - username " + username + " not found in users.");
    return searchedUser;
}
export function loadUsersFromStorage() {
    var loadedUsers = JSON.parse(localStorage.getItem(STORAGE_USERS) || "[]");
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
    var user = __assign(__assign({}, newUser), { carts: new Array(), savedCart: undefined });
    users.push(user);
    saveUsersToStorage();
}
export function setSavedCartToUser(username, cart) {
    var user = getUserByUsername(username);
    user.savedCart = cart;
    saveUsersToStorage();
}
export function addCartToUser(username, cart) {
    var user = getUserByUsername(username);
    user.carts.push(cart);
    saveUsersToStorage();
}
export function clearSavedCartOfUser(username) {
    var user = getUserByUsername(username);
    user.savedCart = undefined;
    saveUsersToStorage();
}
export function getUserSavedCart(username) {
    var savedCart = getUserByUsername(username).savedCart;
    if (!savedCart)
        throw new Error("GetUserSavedCart - " + username + " has no saved cart");
    return savedCart;
}
export function saveUsersToStorage() {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}
export function clearUsersFromStorage() {
    localStorage.removeItem(STORAGE_USERS);
}
export function isUserNameExists(username) {
    return users.some(function (user) { return user.userName === username; });
}
export function isEmailExists(email) {
    return users.some(function (user) { return user.email === email; });
}
export function login(username, password) {
    return users.some(function (user) { return user.userName === username && user.password === password; });
}
export function setCurrentUser(username) {
    currentUser = username;
}
export function getCurrentUser() {
    if (currentUser === "InvalidUserName")
        throw new Error("getCurrentUser - no current user.");
    return getUserByUsername(currentUser);
}
export function loadCurrentUserFromStorage() {
    var loadedCurrentUser = localStorage.getItem(STORAGE_CURRENTUSER);
    if (!loadedCurrentUser)
        throw new Error("LoadCurrentUser - no current user in storage");
    var user = getUserByUsername(loadedCurrentUser);
    if (!user)
        throw new Error("LoadCurrentUser - current user from storage is not a user in database");
    return user.userName;
}
export function saveCurrentUserToStorage(username) {
    localStorage.setItem(STORAGE_CURRENTUSER, username);
}
export function deleteCurrentUserFromStorage() {
    localStorage.removeItem(STORAGE_CURRENTUSER);
}
