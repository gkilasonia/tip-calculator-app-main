const billInput = document.getElementById("bill");
const customTip = document.getElementById("custom-tip");
const tipPerPerson = document.getElementById("tip-amount-value");
const totalPerPerson = document.getElementById("total-value");
const buttons = document.querySelectorAll(".tip-button");
const cantBeZeroLabel = document.getElementById("can’t-be-zero-label");
const numberOfPeople = document.getElementById("number-of-people");
const resetButton = document.getElementById("reset-button");

let billAmount = 0;
let numberOfPeopleValue = 0;
let tipPercentage = 0;

billInput.addEventListener("input", updateBillAmount);
customTip.addEventListener("input", updateCustomTip);
numberOfPeople.addEventListener("input", updateNumberOfPeople);
resetButton.addEventListener("click", resetCalculator);

function updateBillAmount(event) {
  billAmount = parseFloat(event.target.value) || 0;
  calculateTip();
}

function updateCustomTip(event) {
  tipPercentage = parseFloat(event.target.value) || 0;
  calculateTip();
}

function updateNumberOfPeople(event) {
  numberOfPeopleValue = parseFloat(event.target.value) || 0;
  calculateTip();
  validateNumberOfPeople();
}

function calculateTip() {
  const tipAmount = (billAmount * tipPercentage) / 100;
  const total = billAmount + tipAmount; // Correct total calculation

  if (numberOfPeopleValue > 0) {
    const totalPerPersonValue = total / numberOfPeopleValue; // Calculate per-person amount
    totalPerPerson.textContent = `$${totalPerPersonValue.toFixed(2)}`; // Set per-person amount
    tipPerPerson.textContent = `$${(tipAmount / numberOfPeopleValue).toFixed(
      2
    )}`;
  } else {
    totalPerPerson.textContent = "$0.00"; // Handle 0 people
    tipPerPerson.textContent = "$0.00";
  }
}

function validateNumberOfPeople() {
  if (numberOfPeopleValue > 0) {
    cantBeZeroLabel.style.display = "none";
    numberOfPeople.style.border = "none";
  } else {
    cantBeZeroLabel.style.display = "block";
    numberOfPeople.style.border = "2px solid hsl(13, 70%, 61%)";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    tipPercentage = parseFloat(button.id);
    customTip.value = "";
    calculateTip();
    validateNumberOfPeople();

    buttons.forEach((btn) => {
      btn.style.backgroundColor = "hsl(183, 100%, 15%)";
      btn.style.color = "white";
    });
    button.style.backgroundColor = "hsl(172, 67%, 45%)";
    button.style.color = "hsl(183, 100%, 15%)";
  });
});

function resetCalculator() {
  billInput.value = "";
  customTip.value = "";
  numberOfPeople.value = "";
  tipPerPerson.textContent = "$0.00";
  totalPerPerson.textContent = "$0.00"; // Reset per-person total
  cantBeZeroLabel.style.display = "none";
  numberOfPeople.style.border = "none";

  billAmount = 0;
  numberOfPeopleValue = 0;
  tipPercentage = 0;

  buttons.forEach((button) => {
    button.style.backgroundColor = "hsl(183, 100%, 15%)";
    button.style.color = "white";
  });
}
