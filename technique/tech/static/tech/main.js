document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("form1").onsubmit = function (event) {
    event.preventDefault();
    let base = document.getElementById("from").selectedIndex;
    let to = document.getElementById("to").selectedIndex;
    let options = document.getElementById("from").options;
    let number = document.getElementById("number").value;

    if (options[to].text == "Decimal (Base 10)") {
      toDecimal(number, base);
    } else if (options[to].text == "Binary (Base 2)") {
      toBinary(number, "2");
    } else if (options[to].text == "Octal (Base 8)") {
      toOctal(number, base);
    } else if (options[to].text == "Hexadecimal (Base 16)") {
      toHexa(number, base);
    }
  };
});

function toDecimal(nb, b) {
  if (parseInt(b) < 10) {
    nb = parseInt(nb);
    let s = 0;
    for (let i = 0; i < String(nb).length; i++) {
      s = s * parseInt(b) + parseInt(String(nb).charAt(i));
    }

    document.getElementById("converted").innerHTML =
      "The number " + nb + " is :  " + s + " in decimal.";
  } else if (parseInt(b) > 10) {
    nb = String(nb).toUpperCase();
    let s = 0;
    for (let i = 0; i < String(nb).length; i++) {
      if ("A" <= nb.charAt(i) && nb.charAt(i) <= "F") {
        s = s * parseInt(b) + (nb.charCodeAt(i) - 55);
      } else if ("0" <= nb.charAt(i) <= "9") {
        s = s * parseInt(b) + parseInt(nb.charAt(i));
      }
    }
    document.getElementById("converted").innerHTML =
      "The number :  " + s + " is in decimal.";
  }
}

function toBinary(nb, b) {
  let ch = "";
  nb = parseInt(nb);
  do {
    let rest = nb % parseInt(b);
    nb = Math.floor(nb / parseInt(b)); // Use Math.floor to discard the fractional part
    if (rest < 10) {
      ch = String.fromCharCode(rest + 48) + ch;
    } else {
      ch = String.fromCharCode(rest + 55) + ch;
    }
  } while (nb > 0);
  document.getElementById("converted").innerHTML =
    "The number: " + ch + " is in Binary.";
}

function toOctal(nb, b) {
    b = parseInt(b);
    nb = nb.toString();  // Convert nb to a string in case it's not already
  
    if (b > 8) {
      let binary = parseInt(nb, 16).toString(2);
  
      // Step 2: Pad the binary string with leading zeros to make groups of three
      while (binary.length % 3 !== 0) {
        binary = "0" + binary;
      }
  
      // Step 3: Convert each group of three binary digits to octal
      let octal = "";
      for (let i = 0; i < binary.length; i += 3) {
        const group = binary.substr(i, 3);
        const octalDigit = parseInt(group, 2).toString(8);
        octal += octalDigit;
      }
  
      console.log(octal);
      document.getElementById("converted").innerHTML =
        "The number: " + octal + " is in Octal.";
    } else {
      let s = 0;
      for (let i = 0; i < nb.length; i++) {
        s = s * b + parseInt(nb.charAt(i), b);
      }
      document.getElementById("converted").innerHTML =
        "The number: " + s.toString(8) + " is in Octal.";
    }
}