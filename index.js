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
button.addEventListener('click' , () =>{
    console.log("Button clicked");
} ) ;
