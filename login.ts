import { loadLoginForm } from "./User.controller.js";
import { loadUsersFromStorage, setUsers } from "./User.model.js";

function main() {
    setUsers(loadUsersFromStorage());
    loadLoginForm();
}

main();