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

let button = document.querySelector("button");
button.addEventListener("click", () => {
  console.log("Button clicked");
});

// API location constants
const FETCH_URL = `https://age-of-empires-2-api.herokuapp.com/api/v1/`;

/* 

// Base Requirements

As a user, I should be able to [select a civilization]

As a user, I should be able to do [select a small number of units]

As a user, I should be able to do [select a number of structures]

As a user, I should be able to do [select technologies]

As a user, I should be able to do [view the selections together]


*/

// Event Listeners
function selectItems() {
  let selected = document.querySelector("#selected");
  let p = document.createElement("p");
  p.innerText = this.innerText;
  selected.append(p);
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
  while (list.lastChild) {
    list.removeChild(list.lastChild);
  }
}

// Rendering Functions

function renderGroup(data, group) {
  console.log(data[group]);
  let arr = data[group];
  let wrapper = document.querySelector(".wrapper");
  arr.forEach((item) => addItemToChoices(item, wrapper));
  //clearList(wrapper);
}

function getGroup(group) {
  fetch(`${FETCH_URL}${group}`)
    .then((res) => res.json())
    .then((data) => renderGroup(data, group))
    .catch((err) => console.log(err));
}

const CATEGORIES = ["civilizations", "units", "structures", "technologies"];
CATEGORIES.forEach((group) => getGroup(group));
