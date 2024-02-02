document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("form1").onsubmit = function (event) {
    event.preventDefault();
    let from = document.getElementById("from").selectedIndex;
    let to = document.getElementById("to").selectedIndex;
    let options = document.getElementById("from").options;
    let number = document.getElementById("number").value;

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
  console.log("function entred", b2, b1);
  let decimalNumber = parseInt(nb, b1);
  console.log(decimalNumber);

  // Convert the decimal number to the desired base
  let result = decimalNumber.toString(b2);
  console.log(result);

  document.getElementById("converted").innerHTML =
    "The number: " + result + " is in Binary.";

  console.log("went to converted");
}
