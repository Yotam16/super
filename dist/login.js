import { loadLoginForm } from "./User.controller.js";
import { loadCurrentUserFromStorage, loadUsersFromStorage, setUsers } from "./User.model.js";
function openApp() {
    window.location.href = "store.html";
}
function main() {
    setUsers(loadUsersFromStorage());
    try {
        loadCurrentUserFromStorage();
        openApp();
    }
    catch (_a) {
        loadLoginForm();
    }
}
main();
