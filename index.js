import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
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
const shoppingList = document.getElementById("shopping-list");

addButton.addEventListener("click", function () {
  let inputValue = inputField.value;
  push(shoppingListInDB, inputValue);
  inputField.value = "";
  shoppingList.innerHTML += `<li>${inputValue}</li>`;
  clearInputField();
});

onValue(shoppingListInDB, function (snapshot) {
  let shoppingItem = Object.values(snapshot.val());

  clearShoppingList();
  for (let i = 0; i < shoppingItem.length; i++) {
    let currentItem = shoppingItem[i];
    addItem(currentItem);
  }
});

function clearShoppingList() {
  shoppingList = "";
}

function clearInputField() {
  inputField.value = "";
}

function addItem(item) {
  shoppingList.innerHTML += `<li>${item}</li>`;
}
