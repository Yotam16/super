import { loadLoginForm } from "./User.controller.js";
import { loadCurrentUserFromStorage, loadUsersFromStorage, setUsers } from "./User.model.js";

function openApp() {
    window.location.href = "store.html";
}

function main() {

    setUsers(loadUsersFromStorage());
    const currentUser = loadCurrentUserFromStorage();

    if (currentUser) openApp();

    if (!currentUser) {
        loadLoginForm();
    }

}

main();
