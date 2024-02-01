document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("form1").onsubmit = function (event){

        console.log("it linked");
        event.preventDefault();
        let base= document.getElementById("from").selectedIndex;
        console.log(base);
        let to = document.getElementById("to").selectedIndex;
        console.log(to);
        let options = document.getElementById("from").options;
        let number = document.getElementById("number").value;



        if(options[to].text == "Decimal (Base 10)"){
            toDecimal(number,base);
        }
        else if (options[to].text == "Binary (Base 2)"){
            toBinary(number,"2");
        }
        else if(options[to].text == "Octal (Base 8)"){
            toOctal(number,base);
        }
        else if(options[to].text == "Hexadecimal (Base 16)") {
            toHexa(number,base);
        }


    };
});





function toDecimal(nb, b) {
    if(parseInt(b) < 10){
        nb = parseInt(nb);
        let s = 0;
        for(let i=0; i<String(nb).length; i++) {
            
            s = s * parseInt(b) + parseInt(String(nb).charAt(i));
            console.log(s);
        }
        
        document.getElementById("converted").innerHTML = "The number "+nb+" is :  "+s+" in decimal.";
    }else if(parseInt(b) > 10){
        nb = String(nb).toUpperCase();
        let s = 0;
        for(let i=0; i<String(nb).length; i++) {
            if("A" <= nb.charAt(i) && nb.charAt(i) <= "F") {
                s = s * parseInt(b) + (nb.charCodeAt(i) - 55);
            }
            else if("0" <= nb.charAt(i) <= "9"){
                s = s * parseInt(b) + parseInt(nb.charAt(i));  
            }
        }
        document.getElementById("converted").innerHTML = "The number :  "+s+" is in decimal.";
    }

}

function toBinary(nb, b) {
    let ch = "";
    nb = parseInt(nb);
    console.log(nb);
    do {
        let rest = nb % parseInt(b);
        nb = Math.floor(nb / parseInt(b));  // Use Math.floor to discard the fractional part
        console.log(nb);
        if (rest < 10) {
            ch = String.fromCharCode(rest + 48) + ch;
        } else {
            ch = String.fromCharCode(rest + 55) + ch;
        }
    } while (nb > 0);
    document.getElementById("converted").innerHTML = "The number: " + ch + " is in Binary.";
}


















    