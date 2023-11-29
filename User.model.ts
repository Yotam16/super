type Gender = "male" | "female";

export type User = {
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  email: string;
  userName: string;
  password: string;
};

type Users = User[];
const users: Users = [];

export function loadUsersFromStorage() {
  const loadedUsers: Users = JSON.parse(localStorage.getItem("users") || "[]");

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

export function addUser(newUser: User): void {
  users.push(newUser);
  saveUsersToStorage();
}

export function saveUsersToStorage(): void {
  localStorage.setItem("users", JSON.stringify(users));
}

export function isUserNameExists(username: string): boolean {
  return users.some((user) => user.userName === username);
}

export function isEmailExists(email: string): boolean {
  return users.some((user) => user.email === email);
}

// TODO - Safe login function
export function login(username: string, password: string): boolean {
  return users.some(user => user.userName === username && user.password === password);
}

// TODO - a function that loads current user from storage
export function loadCurrentUserFromStorage(): User | undefined {
  const loadedCurrentUser = localStorage.getItem("currentUserName");
  console.log(loadedCurrentUser)

  if (!loadedCurrentUser) throw new Error("LoadCurrentUser - no current user in storage")

  const user = getUsers().find(user => user.userName === loadedCurrentUser);

  if (!user) throw new Error("LoadCurrentUser - current user from storage is not a user in database");

  return user;
}

// TODO - a function that saves current user to storage
export function saveCurrentUserToStorage(username: string): void {
  localStorage.setItem("currentUserName", username);
}

// TODO - a function that deletes current user from storage
export function deleteCurrentUserFromStorage() {
  localStorage.removeItem("currentUserName");
}