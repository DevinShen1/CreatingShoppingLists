import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
  databaseURL:
    "https://shoppinglist-6f808-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(appSetting);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "ShoppingList");
const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");

addButton.addEventListener("click", function () {
  let inputValue = inputField.value;
  push(shoppingListInDB, inputValue);
  console.log("it works");
});
