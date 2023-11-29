import { loadUsersFromStorage, setUsers } from "./User.model.js";
function main() {
    setUsers(loadUsersFromStorage());
}
