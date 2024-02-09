document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("bases").style.display = "none";


  window.onpopstate = function(event) {
      console.log(event.state.page);
      if (event.state.page == "bases") {
        document.getElementById("bases").style.display ="block";
        document.getElementById("user-busniss").style.display = "none";
      }
      else if(event.state.page == "user-busniss") {
        document.getElementById("bases").style.display ="none";
        document.getElementById("user-busniss").style.display = "block";
      }
      else if (event.state.page == "") {
        document.getElementById("bases").style.display ="none";
        document.getElementById("user-busniss").style.display = "none";
      }
  }

  document.getElementById("base").onclick = function(event) {

    document.getElementById("user-busniss").style.display = "none";
    document.getElementById("bases").style.display ="block";

    let state = {page : "bases"};
    let url = '/convert'; 
    history.pushState(state, '', url);   

}

document.getElementById("question").onsubmit = () => {
  let level = document.querySelector("strong").id;
  let radio = document.querySelector('input[name="choice"]:checked');

  if (radio === null) {
      let answer = document.getElementById("answer").value;
      fetch(`Levels/${level}`, {
          method: 'POST',
      })
      .then(response => response.json())
      .then(ex => {
          if (ex != null) {
              alert(ex);
          } else {
              alert("didn't get the ans");
          }

          if (ex.response == answer) {
              if (parseInt(level) < 3) {
                  level = parseInt(level) + 1;
                  MCQ(level);
              } else {
                  Congrats();
              }
          } else {
              MCQ(level);
          }
      });
  } else {
      alert(level);
      fetch(`Levels/${level}`)
      .then(response => response.json())
      .then(ex => {
        alert("anything");
        console.log(ex);
          if (ex != null) {
              alert(ex.response);
              alert(radio.value != null);
              alert("wow");

          } else {
              alert("didn't get the ans");
          }
          
          alert("check " + (radio ? radio.value : "No radio button checked"));
          if (ex.response == radio.value) {
              if (parseInt(level) < 3) {
                  alert("YEDY KESE7");
                  level = parseInt(level) + 1;
                  alert(level);
                  MCQ(level);
              } else {
                  Congrats();
              }
          } else {
              alert("fama progress");
              MCQ(level);
          }
      })
      .catch(error => {
          console.log("Error: ", error);
          alert(error);
      });
  }
};




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
    "Pick Two different bases to swap!";
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

  document.getElementById("level-form").onsubmit = (event) => {
    event.preventDefault();

    let level1 = document.getElementById("level1").checked;
    console.log(level1);
    let level2 = document.getElementById("level2").checked;
    let level3 = document.getElementById("level3").checked;

    console.log("none <3!")

    if (level1 == true){
      console.log("another hallilouya");
      MCQ("1");
    }
    else if (level2 == true) {
      MCQ("2");
    }
    else if(level3 == true) {
      MCQ("3");
    }
  };
  
});


function MCQ(level) {

  fetch(`Levels/${level}`)
    .then(response => response.json())
    .then(ex => {
      let qst = `<strong id="${level}">` + ex.question + `</strong>`;

      if (ex.choices.length != 0){
        //Return to me A array 
        let choices = ex.choices.split("___");

        // Shuffles these choices using Fisher-Yates algorithms
        for (let i = choices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [choices[i], choices[j]] = [choices[j], choices[i]];
        }

        // Selects the first three choice
        let selectedChoices = choices.slice(0, 3);

        

        document.getElementById("qst").innerHTML = qst + "<br>";

        // Add the radio buttons and labels to the 'qst' element
        selectedChoices.forEach(choice => {
          document.getElementById("qst").innerHTML += `<input type="radio" name="choice" value="${choice}" id="rd"><label>${choice}</label><br>`;
        });

        document.getElementById("qst").innerHTML += `<input type="radio" name="choice" id="rd"><label>None</label><br>`;
        }
      else {
          document.getElementById("qst").innerHTML =
          qst + `<br> <input type="text" name="answer" required id="answer">`;
      }

      if(level < 3){
        document.getElementById("go").innerHTML = `<button type="submit">Level ${level}</button>`;
      }
      else {
        document.getElementById("go").innerHTML = `<button type="submit">Submit</button>`;
      }
      document.getElementById("levels").style.display ="none";
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

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
