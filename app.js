const bill = document.querySelector(".bill");
const people = document.querySelector(".people");
const tipBtns = document.querySelectorAll("#tips");
const tipPerPerson = document.querySelector(".tip-per-person");
const tipTotal = document.querySelector(".total");
const inputCustom = document.querySelector(".inputCustom");
const errorMsg = document.querySelector(".error-msg");
const btnReset = document.querySelector(".btnReset");

let billValue = 0.0;
let tipValue = 0.05;
let numPeople = 1;

//? Render default values 
function init () {
  bill.value = billValue;
  people.value = numPeople;
}
init();


//?------------------ Event handlers-------------------

inputCustom.addEventListener("input", setCustomValue);
bill.addEventListener("input", setBillValue);
people.addEventListener("input", setPeopleValue);
btnReset.addEventListener("click", handleReset);

tipBtns.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

//?-----------------------------------------------------------


//? function validation
function validateFloat(value) {
  let rgx = /^[0-9]*\.?[0-9]*$/;
  return value.match(rgx);
}

//? set bill value as user inputs

function setBillValue() {
  if (bill.value.includes(",")) {
    bill.value = bill.value.replace(",", ".");
  }

  //* If value is not a number this logic code is simply deletes last word of that input which is not a number 
  //* User would feel that btn he pressed never worked as that was not a number
  if (!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }

  //* converting into an integer by avoiding other caracters
  billValue = parseFloat(bill.value);

  calculateTip();
}

//? seting number of People as user inputs

function setPeopleValue() {
  if (people.value.includes(",")) {
    people.value = people.value.replace(",", ".");
  }

  if (!validateFloat(people.value)) {
    people.value = people.value.substring(0, people.value.length - 1);
  }

  numPeople = parseFloat(people.value);

  people.style.outline = "2.5px solid #26c0ab";
  errorMsg.style.opacity = "0";

  if (numPeople === 0) {
    people.style.outline = "2.4px solid red";
    errorMsg.style.opacity = "1";

    setTimeout(function () {
      errorMsg.style.opacity = "0";
    }, 3000);
  }
  calculateTip();
}

function handleClick(e) {

  //* first delete all the active tip btns  

  tipBtns.forEach((btn) => {
    btn.classList.remove("tip-active");


    //* Check if the pressed btn is same as the one of the tipbtns if yes then add active class
    if (e.target.innerHTML === btn.innerHTML) {
      btn.classList.add("tip-active");
      tipValue = parseFloat(btn.innerHTML) / 100;

      calculateTip();

      //clear custom input
      inputCustom.value = "";
    }
  });
}

function setCustomValue() {
  if (!validateFloat(inputCustom.value)) {
    inputCustom.value = inputCustom.value.substring(
      0,
      inputCustom.value.length - 1
    );
  }

  const inpCust = parseFloat(inputCustom.value);

  //*clear active tip btn if user wants a custom tip
  if (inpCust) {
    tipBtns.forEach((btn) => {
      btn.classList.remove("tip-active");
    });
  }

  tipValue = inpCust / 100;
  calculateTip();
}

function handleReset() {

  //* Reseting initial values
  billValue = 0.0;
  tipValue = 0.05;
  numPeople = 1;

  //* Call init function
  init();

  //* Defalut tip btn
  tipBtns[2].click();

  //* Cal calculateTip() so values will be resulted as default 
  calculateTip();
}

function calculateTip() {
  const tipPerPersonValue = (billValue * tipValue) / numPeople;
  const tiptotalValue = billValue * tipValue;
  tipPerPerson.innerHTML = `$${
    tipPerPersonValue ? tipPerPersonValue.toFixed(2) : "0.00"
  }`;
  tipTotal.innerHTML = `$${tiptotalValue ? tiptotalValue.toFixed(2) : "0.00"}`;
}
