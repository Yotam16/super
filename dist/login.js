import { loadLoginForm } from "./User.controller.js";
import { loadCurrentUserFromStorage, loadUsersFromStorage, setUsers } from "./User.model.js";
// function openApp() {
//     window.location.href = "index.html";
// }
function main() {
    var currentUser = loadCurrentUserFromStorage();
    if (!currentUser) {
        setUsers(loadUsersFromStorage());
        loadLoginForm();
    }
    // openApp();
}
main();
