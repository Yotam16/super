import { loadUsersFromStorage, setUsers } from "./User.model";
function main() {
    setUsers(loadUsersFromStorage());
}
