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
const DEFAULT_NAME = "Anonymous";

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
const GET_API_URL = `https://age-of-empires-2-api.herokuapp.com/api/v1/`;
const GET_SURVEY_URL = `http://localhost:3000/responses`;
const POST_URL = `http://localhost:3000/responses`;

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

function displayEnding(data) {
  // This alert is intentional. It is an alternative to putting a message on the DOM
  let nameInput = document.querySelector("#name-input").value;
  alert(
    `Thanks, ${nameInput}, for taking the survey. You can take it again if you choose.`
  );
  /*
  let endMessage = document.createElement("p");
  endMessage.innerText =
    "Thanks for taking the survey. Your response has been saved.";
  document.body.append(endMessage);
  */
}

function isValidName(name) {
  return typeof name === "string" && name.length > 0;
}

function buildSurveyList(surveys) {
  console.log(surveys);
  let surveyNamesUl = document.querySelector("#survey-names");
  surveys.forEach((survey) => {
    let li = document.createElement("li");
    let name = isValidName(survey.name) ? survey.name : DEFAULT_NAME;
    li.textContent = name;
    surveyNamesUl.appendChild(li);
  });
}

function showSurveyList() {
  fetch(GET_SURVEY_URL)
    .then((res) => res.json())
    .then((surveys) => buildSurveyList(surveys))
    .catch((err) => console.log(err));
}

function toArray(list) {
  let array = [];
  list.forEach((item) => array.push(item.innerText));

  return array;
}

function sendSurveyResponse() {
  let nameInput = document.querySelector("#name-input").value;
  let civilizations = document.querySelectorAll("#selected-civilizations > li");
  let civArray = toArray(civilizations);
  let units = document.querySelectorAll("#selected-units > li");
  let unitArray = toArray(units);
  let structures = document.querySelectorAll("#selected-structures > li");
  let structureArray = toArray(structures);
  let technologies = document.querySelectorAll("#selected-technologies > li");
  let techArray = toArray(technologies);

  fetch(POST_URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      name: nameInput,
      civilizations: civArray,
      units: unitArray,
      structures: structureArray,
      technologies: techArray
    })
  })
    .then((res) => res.json())
    .then((data) => displayEnding(data))
    .catch((err) => console.log(err));
}

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
    let choicesH1 = document.querySelector("#choices-h1");
    clearList(choicesH1);
    let p = document.createElement("p");
    p.innerText = "*********************";
    let p2 = document.createElement("p");
    p2.innerText = "Thanks for taking the survey";
    selected.append(p);
    selected.append(p2);
    sendSurveyResponse();
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
  while (list.lastChild !== null) {
    list.removeChild(list.lastChild);
  }
}

// Rendering Functions

function renderGroup(data, group) {
  let arr = data[group];
  let wrapper = document.querySelector(".wrapper");
  let choicesH1 = document.querySelector("#choices-h1");
  clearList(choicesH1);
  let p = document.createElement("p");
  p.innerText = `Select ${CATEGORIES[categoriesIndex].max} from the following`;
  choicesH1.appendChild(p);
  arr.forEach((item) => addItemToChoices(item, wrapper));
}

function getGroup(group) {
  fetch(`${GET_API_URL}${group.name}`)
    .then((res) => res.json())
    .then((data) => renderGroup(data, group.name))
    .catch((err) => console.log(err));
}

function startGame(event) {
  event.preventDefault();
  let nameInput = document.querySelector("#name-input");
  nameInput.disabled = true;
  let startBtn = document.querySelector("#start-btn");
  startBtn.disabled = true;
  let choicesH1 = document.querySelector("#choices-h1");
  choicesH1.hidden = false;
  let selectedH1 = document.querySelector("#selected-h1");
  selectedH1.hidden = false;
  let selectedDiv = document.querySelector("#selected-div");
  selectedDiv.hidden = false;
  getGroup(CATEGORIES[0]);
}
document.addEventListener("DOMContentLoaded", () => {
  let startBtn = document.querySelector("#start-btn");
  startBtn.addEventListener("click", startGame);
  let showSurveyListBtn = document.querySelector("#show-survey-list-btn");
  showSurveyListBtn.addEventListener("click", showSurveyList);
});
