document.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault();
    

  
});

function get_question (event) {

  let level = document.querySelector("strong").id;
  let radio = document.querySelector('input[name="choice"]:checked');

  if (radio === null) {
      let answer = document.getElementById("answer").value;
      fetch(`Levels/${level}`, {
          method: 'POST',
      })
      .then(response => response.json())
      .then(ex => {
          if (ex.response == answer) {
            if (parseInt(level) < 3) {
              level = parseInt(level) + 1;
              MCQ(level);  // Trigger the next level
            }else {
              Congrats();
            }
          }
          else {
              MCQ(level);
          }
      });
      return false;
  } else {
      fetch(`Levels/${level}`)
      .then(response => response.json())
      .then(ex => {

        const nonebutton = document.querySelector('input[name="choice"][value="none"]');
        if(nonebutton.checked){
          
          const otherbuttons = document.querySelectorAll('input[name="choice"]:not([value="none"])');

          for(const radiobutton of otherbuttons){
            if(radiobutton.value === ex.response){
              MCQ(level);
            }
          }
          if(parseInt(level) < 3){
            level = parseInt(level) + 1;
            MCQ(level);
          }
          else {
            Congrats();
            return false;
          }
        }

        if (ex.response == radio.value) {
            if (parseInt(level) < 3) {
              level = parseInt(level) + 1;
              MCQ(level);  // Trigger the next level
            } else {
              Congrats();
              return false;
            }
          } else {
              MCQ(level);
          }
      })
      .catch(error => {
          console.log("Error: ", error);
          alert(error);
      });
      
  }
  return false;
}




  function swap_it (event) {
    select1 = document.getElementById("from");
    select2 = document.getElementById("to");
    event.preventDefault();


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

    return false;
  }


  function convert_it (event) {
    event.preventDefault();

    alert(event.target.id);

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

    return false;
}



  
  


function Congrats() {
    document.getElementById("qcm").style.display = 'none';
    document.getElementById("congrats").style.display = 'block';
}


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

        document.getElementById("qst").innerHTML += `<input type="radio" value="none" name="choice" id="rd"><label>None</label><br>`;
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
      return;
    })
    .catch(error => {
      console.log(error);
      alert(error)
    });

    return;
}

function levelsforms (event){
      event.preventDefault();
    
      if(event.target.id === "level-form"){
      let level1 = document.getElementById("level1").checked;
      let level2 = document.getElementById("level2").checked;
      let level3 = document.getElementById("level3").checked;


      if (level1 == true){
        MCQ("1");
      }
      else if (level2 == true) {
        MCQ("2");
      }
      else if(level3 == true) {
        MCQ("3");
      }}
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
