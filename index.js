/* let getCiviData = () =>  {
    fetch("https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations")
    .then((resp) => resp.json())
    .then((data) => data.forEach((civi) => console.log(civi))
    )} */

// event listeners

/* element.addEventListener("click", myFunction);
function myFunction() {
  alert ("Hello World!");
}
 */
/*
let button = document.querySelector("button");
button.addEventListener("click", () => {
  console.log("Button clicked");
});
*/
/* 
// Base Requirements
As a user, I should be able to [select a civilization] // Done
As a user, I should be able to do [select a small number of units] // How Many?
As a user, I should be able to do [select a number of structures]  // How Many?
As a user, I should be able to do [select technologies]  // How Many?
As a user, I should be able to do [view the selections together]
*/

// Event Listeners

// Game Constants
const MAX_CIVZS = 1;
const MAX_UNITS = 5;
const MAX_STRUCTURES = 3;
const MAX_TECHS = 4;

const CATEGORIES = [
  { name: "civilizations", max: MAX_CIVZS },
  { name: "units", max: MAX_UNITS },
  { name: "structures", max: MAX_STRUCTURES },
  { name: "technologies", max: MAX_TECHS }
];

// categoriesIndex global variable
let categoriesIndex = 0;
/*
let button = document.querySelector("button");
button.addEventListener("click", () => {
  console.log("Button clicked");
});
*/
// API location constants
const FETCH_URL = `https://age-of-empires-2-api.herokuapp.com/api/v1/`;

function selectItems() {
  let selected = document.querySelector(
    `#selected-${CATEGORIES[categoriesIndex].name}`
  );
  let li = document.createElement("li");
  li.innerText = this.innerText;
  selected.append(li);
  let numSelected = selected.children.length;
  if (numSelected < CATEGORIES[categoriesIndex].max) {
    return;
  }

  let oldList = document.querySelector("#choices-div");
  clearList(oldList);

  categoriesIndex++;
  if (categoriesIndex < CATEGORIES.length) {
    getGroup(CATEGORIES[categoriesIndex]);
  } else {
    let p = document.createElement("p");
    p.innerText = "*********************";
    let p2 = document.createElement("p");
    p2.innerText = "Thanks for Playing";
    selected.append(p);
    selected.append(p2);
  }
}

// Other Functions
function addItemToChoices(item, wrapper) {
  let p = document.createElement("p");
  let button = document.createElement("button");
  p.innerText = item.name;
  button.addEventListener("click", selectItems);
  button.append(p);
  wrapper.append(button);
}

// not used yet
function clearList(list) {
  console.log(list.lastChild);
  while (list.lastChild !== null) {
    list.removeChild(list.lastChild);
  }
}

// Rendering Functions

function renderGroup(data, group) {
  //console.log(data[group]);
  let arr = data[group];
  let wrapper = document.querySelector(".wrapper");
  arr.forEach((item) => addItemToChoices(item, wrapper));
  //clearList(wrapper);
}

function getGroup(group) {
  fetch(`${FETCH_URL}${group.name}`)
    .then((res) => res.json())
    .then((data) => renderGroup(data, group.name))
    .catch((err) => console.log(err));
}

function startGame() {
  let choicesH1 = document.querySelector("#choices-h1");
  choicesH1.hidden = false;
  let selectedH1 = document.querySelector("#selected-h1");
  selectedH1.hidden = false;
  let selectedDiv = document.querySelector("#selected-div");
  selectedDiv.hidden = false;
  getGroup(CATEGORIES[0]);
}
document.addEventListener("DOMContentLoaded", () => {
  let startBtn = document.querySelector("#start");
  startBtn.addEventListener("click", startGame);
});
