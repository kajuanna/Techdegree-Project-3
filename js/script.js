let name = document.getElementById("name"); //This variable allows the first field to have focus when page is loaded.
name.focus();

let jobRole = document.getElementById("title");
let otherJobRole = document.getElementById("other-job-role");

otherJobRole.style.display = "none";

jobRole.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    otherJobRole.style.display = "block";
  } else {
    otherJobRole.style.display = "none";
  }
});

let design = document.getElementById("design");
let color = document.getElementById("color");
let colorOption = document.getElementById("color").children;
let shirtColorsDiv = document.getElementById("shirt-colors");

shirtColorsDiv.style.display = "none";

design.addEventListener("change", (e) => {
  shirtColorsDiv.style.display = "";

  for (let i = 1; i < colorOption.length; i++) {
    let value = e.target.value;
    let shirtTheme = document
      .getElementById("color")
      [i].getAttribute("data-theme");

    if (value === shirtTheme) {
      color[i].removeAttribute("hidden");
    } else {
      color[i].setAttribute("hidden", "hidden");
      color.selectedIndex = 0;
    }
  }
});
let registerForActivites = document.getElementById("activities");
let registerForActivitesBox = document.getElementById("activities-box");
let activitiesCost = document.getElementById("activities-cost");
let totalCost = 0;

registerForActivites.addEventListener("change", (e) => {
  let data_cost = e.target.getAttribute("data-cost");
  data_cost = +data_cost;

  if (e.target.checked) {
    totalCost = totalCost + data_cost;
  } else {
    totalCost = totalCost - data_cost;
  }

  activitiesCost.innerHTML = `Total: $${totalCost}`;
});

let paymentMethod = document.getElementById("payment");
let creditCard = document.getElementById("credit-card");
let paypal = document.getElementById("paypal");
let bitcoin = document.getElementById("bitcoin");
let secondChild = paymentMethod.children[1];

paypal.style.display = "none";
bitcoin.style.display = "none";

secondChild.setAttribute("selected", "selected");

paymentMethod.addEventListener("change", (e) => {
  if (e.target.value === "credit-card") {
    creditCard.style.display = "block";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
  } else if (e.target.value === "paypal") {
    paypal.style.display = "block";
    creditCard.style.display = "none";
    bitcoin.style.display = "none";
  } else if (e.target.value === "bitcoin") {
    bitcoin.style.display = "block";
    creditCard.style.display = "none";
    paypal.style.display = "none";
  }
});

let email = document.getElementById("email");
let cardNumber = document.getElementById("cc-num");
let zipCode = document.getElementById("zip");
let cvv = document.getElementById("cvv");
let form = document.querySelector("form");
let activities = registerForActivitesBox.getElementsByTagName("input");
form.addEventListener("submit", (e) => {
  let nameValue = name.value;
  let nameTest = /^[a-zA-Z,.-]+$/i.test(nameValue);

  let emailValue = email.value;
  let emailTest = /^[a-zA-Z0-9, !#$%&'*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:|.[a-zA-Z0-9]+)$/i.test(
    emailValue
  );

  let cardNumberValue = cardNumber.value;
  let cardNumberTest = /^\b\d{13,16}\b$/.test(cardNumberValue);

  let zipCodeValue = zipCode.value;
  let zipCodeTest = /^\d{5}$/.test(zipCodeValue);

  let cvvValue = cvv.value;
  let cvvTest = /^\d{3}$/.test(cvvValue);

  if (name.value !== "") {
    validInput(name);
  } else {
    e.preventDefault();
    invalidInput(name);
  }

  let numberChecked = 0;

  for (let i = 0; i < activities.length; i++) {
    if (activities[i].checked === true) {
      numberChecked += 1;
    }
  }
  if (numberChecked === 0) {
    e.preventDefault();
    invalidInput(registerForActivitesBox);
  } else {
    validInput(registerForActivitesBox);
  }
  let emailErrorSpan = document.getElementById("email-hint");

  if (emailTest) {
    validInput(email);
  } else {
    e.preventDefault();
    invalidInput(email);
  }

  if (secondChild.selected === true) {
    if (cardNumberTest) {
      validInput(cardNumber);
    } else {
      e.preventDefault();
      invalidInput(cardNumber);
    }

    if (zipCodeTest) {
      validInput(zipCode);
    } else {
      e.preventDefault();
      invalidInput(zipCode);
    }
    if (cvvTest) {
      validInput(cvv);
    } else {
      e.preventDefault();
      invalidInput(cvv);
    }
  }
});

function validInput(element) {
  element.parentElement.classList.remove("not-valid");
  element.parentElement.classList.add("valid");
  element.parentElement.lastElementChild.classList.remove("hint-display");
}
function invalidInput(element) {
  element.parentElement.classList.add("not-valid");
  element.parentElement.classList.remove("valid");
  element.parentElement.lastElementChild.classList.add("hint-display");
}
console.log(activities);
//focus
for (let i = 0; i < activities.length; i++) {
  activities[i].addEventListener("focus", (e) => {
    e.target.parentNode.classList.add("focus");
  });
  //blur
  activities[i].addEventListener("blur", (e) => {
    e.target.parentNode.classList.remove("focus");
  });
}
