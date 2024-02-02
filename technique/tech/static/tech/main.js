document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("swap").onclick = function (event) {
    let indexto = from;
    let indexfrom = to;
    select1.selectedIndex = indexfrom;
    select2.selectedIndex = indexto;
  };
  document.getElementById("form1").onsubmit = function (event) {
    event.preventDefault();
    var select1 = document.getElementById("from");
    var select2 = document.getElementById("to");
    var from = document.getElementById("from").selectedIndex;
    var to = document.getElementById("to").selectedIndex;
    var options = document.getElementById("from").options;
    var number = document.getElementById("number").value;

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
