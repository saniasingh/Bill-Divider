const inputBillAmount = document.getElementById("inputBillAmount");
const customTipInput = document.querySelector(".custom-tip");
const numberOfPeople = document.querySelector(".number-of-people");
const generateBillBtn = document.getElementById("generateBill");
const showTipAmount = document.querySelector(".tip-amount span");
const showTotalAmount = document.querySelector(".total-amount span");
const showIndividualBill = document.querySelector(".individual-bill span");
const resetBillbtn = document.getElementById("resetBill");
const tipBtnsParent = document.getElementById("selectTip");
const buttonGridDiv = document.querySelector(".button-grid");

let selectedTipByUser = 0;

generateBillBtn.addEventListener("click", () => {
  const billAmount = parseInt(inputBillAmount.value).toFixed(1);
  const numberOfPpl = parseInt(numberOfPeople.value);
  const customTip = parseInt(customTipInput.value);

  const totalBillIncludingCustomTip = (
    (billAmount * (100 + selectedTipByUser)) /
    100
  ).toFixed(1);
  // console.log(totalBillIncludingCustomTip);
  const BillperPerson = (totalBillIncludingCustomTip / numberOfPpl).toFixed(1);

  showTipAmount.innerText = `₹${totalBillIncludingCustomTip - billAmount}`;
  showIndividualBill.innerText = `₹${BillperPerson}`;
  showTotalAmount.innerText = `₹${totalBillIncludingCustomTip}`;

  resetBillbtn.disabled = false;
});

//Event Delegation

// tipBtnsParent.addEventListener("click", (e) => {
//   if (e.target && e.target.matches("button.child")) {
//     console.log("Button Clicked!!" + e.target.textContent);
//   }
// });

tipBtnsParent.addEventListener("click", (e) => {
  if (e.target !== tipBtnsParent) {
    // first converting html collection into array by spread operator
    [...tipBtnsParent.children].forEach((child) =>
      child.classList.remove("selected")
    );
    e.target.classList.add("selected");
    selectedTipByUser = parseInt(e.target.innerText);
    customTipInput.value = "";
  }

  if (selectedTipByUser && numberOfPeople.value) {
    generateBillBtn.disabled = false;
  } else {
    generateBillBtn.disabled = true;
  }
});

customTipInput.addEventListener("input", () => {
  selectedTipByUser = parseInt(customTipInput.value);
  // console.log(selectedTipByUser);
  [...tipBtnsParent.children].forEach((child) =>
    child.classList.remove("selected")
  );

  if (numberOfPeople.value && selectedTipByUser) {
    generateBillBtn.disabled = false;
  } else {
    generateBillBtn.disabled = true;
  }
});

resetBillbtn.addEventListener("click", () => {
  numberOfPeople.value = "";
  inputBillAmount.value = "";
  customTipInput.value = "";
  [...tipBtnsParent.children].forEach((child) =>
    child.classList.remove("selected")
  );
  showTipAmount.innerText = "";
  showIndividualBill.innerText = "";
  showTotalAmount.innerText = "";
  resetBillbtn.disabled = true;
  generateBillBtn.disabled = true;

});

inputBillAmount.addEventListener("input", () => {
  if (inputBillAmount.value) {
    numberOfPeople.disabled = false;
    customTipInput.disabled = false;
    buttonGridDiv.classList.remove("disabled");
  } else {
    buttonGridDiv.classList.add("disabled");
    numberOfPeople.disabled = true;
    customTipInput.disabled = true;
  }
});

numberOfPeople.addEventListener("input", () => {
  if (selectedTipByUser && numberOfPeople.value) {
  generateBillBtn.disabled = false;
  } else {
  generateBillBtn.disabled = true;
  }
  // if (customTipInput.value && tipBtnsParent.children) {
  //   generateBillBtn.disabled = false;
  // } else {
  //   generateBillBtn.disabled = true;
  // }
});
