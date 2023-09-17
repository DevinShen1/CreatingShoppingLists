import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
  clearInputField();
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let shoppingItem = Object.entries(snapshot.val());
    clearShoppingList();
    for (let i = 0; i < shoppingItem.length; i++) {
      let currentItem = shoppingItem[i];
      addItem(currentItem);
    }
  } else {
    shoppingList.innerHTML = "No item";
  }
});

function clearShoppingList() {
  shoppingList.innerHTML = "";
}

function clearInputField() {
  inputField.value = "";
}

function addItem(item) {
  let newItem = document.createElement("li");
  newItem.textContent = item[1];

  newItem.addEventListener("dblclick", function () {
    let itemLocation = ref(database, `ShoppingList/${item[0]}`);
    remove(itemLocation);
  });
  shoppingList.append(newItem);
}
