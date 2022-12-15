let pizza, markup;
let currentSort = "name";
const heatImg = 
  "<img src=" +
  "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-chili-fruits-and-vegetables-kiranshastry-lineal-color-kiranshastry.png" +
  "/>";

const displayMenu = function (sortBy, arr) {
  let markup = "";
  if (arr === null) return "";

  if (sortBy === "name") {
    arr.sort((a, b) => {
      let na = a.name.toLowerCase();
      let nb = b.name.toLowerCase();
      if (na < nb) return -1;
      if (na > nb) return 1;
      return 0;
    });
  }
  if (sortBy === "price") {
    arr.sort((a, b) => {
      return a.price - b.price;
    });
  }
  if (sortBy === "heat") {
    arr.sort((a, b) => {
      return a.heat - b.heat;
    });
  }
  for (let i = 0; i < arr.length; i++) {
    markup += `<li>
  <div class="pizza ${i}">
    <img src="${arr[i].photo}.webp" alt="${arr[i].photo}" />
    <div class = "info">
    <span class="name">Name: ${arr[i].name} ${heatImg.repeat(
      arr[i].heat
    )}</span>
    <span class="price">Price: ${arr[i].price} €</span>
    <span class="toppings">Toppings: ${arr[i].toppings}</span>
    </div>
    <div>
    <button onclick = deleteItem(${i}) class="delete ${i}">Delete</button>
    </div>
  </div>
</li>`;
  }
  return markup;
};
const sorting = function () {};
document.getElementById("sort").addEventListener("click", () => {
  currentSort = document.getElementById("menuSort").value;
  document.querySelector(".menu").innerHTML = displayMenu(
    currentSort,
    menuArray
  );
});
let menu;
document
  .querySelector(".add-topping")
  .addEventListener("click", () =>
    document
      .getElementById("toppings-inputs")
      .insertAdjacentHTML(
        "beforeend",
        '<input type="text" name="toppings[]" id="toppings" />'
      )
  );
const toppings = function (toppings) {
  let k = [];
  let input = toppings;
  for (let i = 0; i < input.length; i++) {
    k[i] = input[i].value;
  }
  return k.join(", ");
};
const checkName = function (name) {
  for (let i = 0; i < menu.length; i++) {
    console.log(menu[i].name, name);
    if (menu[i].name.toLowerCase() === name.toLowerCase()) {
      alert("This pizza name is already taken");
      return false;
    }
  }
};
document.getElementById("add-new-pizza").onsubmit = function (e) {
  e.preventDefault();
  if (checkName(document.getElementById("uniqueName").value) === false) {
    return;
  }
  pizza = {
    name: document.getElementById("uniqueName").value,
    price: document.getElementById("price").value,
    heat: document.getElementById("heat").value,
    toppings: toppings(document.getElementsByName("toppings[]")),
    photo: document.getElementById("photo").value,
  };
  menu.push(pizza);
  window.sessionStorage.setItem("pizza", JSON.stringify(menu));
  document.getElementById("add-new-pizza").reset();
  document.querySelector(".menu").innerHTML = displayMenu(
    currentSort,
    menuArray
  );
  document.getElementById("toppings-inputs").innerHTML =
    '<input type="text" required name="toppings[]" id="toppings" />' +
    '<input type="text" required name="toppings[]" id="toppings" />';
  alert("Pizza Added");
};

menu = JSON.parse(sessionStorage.getItem("pizza") === null)
  ? []
  : JSON.parse(sessionStorage.getItem("pizza"));

let menuArray = Object.create(menu);
// console.log(typeof menuArray);
document.querySelector(".menu").innerHTML = displayMenu(currentSort, menuArray);
let deleteButtons = document.querySelectorAll(".delete");
const deleteItem = function (btn) {
  if (confirm("Delete this pizza?") === true) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].name === menuArray[btn].name) {
        menu.splice(i, 1);
      }
    }
    sessionStorage.setItem("pizza", JSON.stringify(menu));
    menu = JSON.parse(sessionStorage.getItem("pizza"));
    menuArray = Object.create(menu);
    document.querySelector(".menu").innerHTML = displayMenu(
      currentSort,
      menuArray
    );
  }
};
