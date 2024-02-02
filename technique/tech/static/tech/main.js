document.addEventListener("DOMContentLoaded", function () {
  select1 = document.getElementById("from");
  select2 = document.getElementById("to");

  document.getElementById("swap").onclick = function (event) {
    if (document.getElementById("from").selectedIndex != 0 &&
     document.getElementById("to").selectedIndex != 0 && 
     document.getElementById("from").selectedIndex != document.getElementById("to").selectedIndex
     ){
      swapOptions();
    }
    else {
      const element = document.getElementById("converted");
      element.style.display = "block";
      element.style.animationPlayState = "running";
      element.innerHTML =
    "Pick Two bases to swap!";
    }
  }

  document.getElementById("form1").onsubmit = function (event) {
    event.preventDefault();
    select1 = document.getElementById("from");
    select2 = document.getElementById("to");
    from = document.getElementById("from").selectedIndex;
    to = document.getElementById("to").selectedIndex;
    options = document.getElementById("from").options;
    
    number = document.getElementById("number").value;
    if (options[to].text == "Decimal (Base 10)") {

      convertBase(number, "10", options[from].value);

      const element = document.getElementById("converted");
      element.style.display = "block";
      element.style.animationPlayState = "running";

    } else if (options[to].text == "Binary (Base 2)") {

      convertBase(number, "2", options[from].value);

      const element = document.getElementById("converted");
      element.style.display = "block";
      element.style.animationPlayState = "running";

    } else if (options[to].text == "Octal (Base 8)") {

      convertBase(number, "8", options[from].value);

      const element = document.getElementById("converted");
      element.style.display = "block";
      element.style.animationPlayState = "running";

    } else if (options[to].text == "Hexadecimal (Base 16)") {

      convertBase(number, "16", options[from].value);

      const element = document.getElementById("converted");
      element.style.display = "block";
      element.style.animationPlayState = "running";
    }
  };

  
});

function swapOptions() {
  let indexFrom = select1.selectedIndex;
  let indexTo = select2.selectedIndex;

  // Swap the selected indices
  select1.selectedIndex = indexTo;
  select2.selectedIndex = indexFrom;
}


function convertBase(nb, b2, b1) {
  // Convert the input number to decimal

  let decimalNumber = parseInt(nb, b1);

  // Convert the decimal number to the desired base
  let result = decimalNumber.toString(b2);

  if (result == NaN) {
    document.getElementById("converted").innerHTML = "Invalid input!";
  }

  document.getElementById("converted").innerHTML =
    "The number: " + result + " is in Base (" + options[to].value + ")";
}
