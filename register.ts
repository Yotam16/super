import { loadRegisterForm } from "./User.controller.js";
import { loadUsersFromStorage, setUsers } from "./User.model.js";

function main() {
    setUsers(loadUsersFromStorage());
    loadRegisterForm();
}

main();