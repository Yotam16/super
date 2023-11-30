import { Cart, newCart } from "./Cart.model";

const STORAGE_USERS = "users";
const STORAGE_CURRENTUSER = "current_user";

type InvalidCurrentUser = "InvalidUserName";

type Gender = "male" | "female";

type Username = string;

export type User = {
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  email: string;
  userName: Username;
  password: string;
  carts: Cart[];
  savedCart: Cart | undefined;
};

type Users = User[];
const users: Users = [];

let currentUser: Username = "InvalidUserName";


export function getUserByUsername(username: Username) {
  const searchedUser = getUsers().find((user) => user.userName === username);

  if (!searchedUser) throw new Error(`getUsers - username ${username} not found in users.`);

  return searchedUser;
}

export function loadUsersFromStorage() {
  const loadedUsers: Users = JSON.parse(localStorage.getItem(STORAGE_USERS) || "[]");

  if (!loadedUsers) {
    throw new Error("loadUsersFromStorage function - no users found in storage");
  }

  return loadedUsers;
}

export function getUsers() {
  return users.slice();
}

export function setUsers(newUsers: Users) {
  newUsers.forEach((user) => users.push(user));
}

export function addUser(newUser: Omit<User, "carts" | "savedCart">): void {
  const user: User = {
    ...newUser,
    carts: new Array<Cart>(),
    savedCart: undefined
  }
  users.push(user);
  saveUsersToStorage();
}

export function setSavedCartToUser(username: Username, cart: Cart) {
  const user = getUserByUsername(username);
  user.savedCart = cart;
  saveUsersToStorage();
}

export function addCartToUser(username: Username, cart: Cart) {
  const user = getUserByUsername(username);
  user.carts.push(cart);
  saveUsersToStorage();
}

export function clearSavedCartOfUser(username: Username) {
  const user = getUserByUsername(username);
  user.savedCart = undefined;
  saveUsersToStorage();
}
export function getUserSavedCart(username: Username): Cart {
  const savedCart = getUserByUsername(username).savedCart;
  if (!savedCart) throw new Error(`GetUserSavedCart - ${username} has no saved cart`)

  return savedCart;
}

export function saveUsersToStorage(): void {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

export function clearUsersFromStorage() {
  localStorage.removeItem(STORAGE_USERS);
}

export function isUserNameExists(username: string): boolean {
  return users.some((user) => user.userName === username);
}

export function isEmailExists(email: string): boolean {
  return users.some((user) => user.email === email);
}

export function login(username: string, password: string): boolean {
  return users.some(user => user.userName === username && user.password === password);
}

export function setCurrentUser(username: Username) {
  currentUser = username;
}

export function getCurrentUser() {
  if (currentUser === "InvalidUserName") throw new Error(`getCurrentUser - no current user.`);
  return getUserByUsername(currentUser);
}

export function loadCurrentUserFromStorage(): Username {
  const loadedCurrentUser = localStorage.getItem(STORAGE_CURRENTUSER);

  if (!loadedCurrentUser) throw new Error("LoadCurrentUser - no current user in storage")

  const user = getUserByUsername(loadedCurrentUser);

  if (!user) throw new Error("LoadCurrentUser - current user from storage is not a user in database");

  return user.userName;
}

export function saveCurrentUserToStorage(username: string): void {
  localStorage.setItem(STORAGE_CURRENTUSER, username);
}

export function deleteCurrentUserFromStorage() {
  localStorage.removeItem(STORAGE_CURRENTUSER);
}