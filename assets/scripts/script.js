function validateInput() {

    var inputValid = true;
    var formInput = document.getElementById("passGenForm");
    var charCountStr = formInput[0].value;
    var hasLowercase = formInput[1].checked;
    var hasUppercase = formInput[2].checked;
    var hasNumbers = formInput[3].checked;
    var hasSpecialChars = formInput[4].checked;

    document.getElementById("passHeading").setAttribute("class", "text-dusk no-show"); //hide password heading
    document.getElementById("passwordOutput").setAttribute("class", "w-100 no-show"); //hide password output field
    document.getElementById("passwordOutput").innerHTML = ""; //reset password output field
    document.getElementById("copyButton").setAttribute("class", "btn rounded-0 text-white bg-dusk my-3 no-show"); //hide copy button

    var charCountNum = Number(charCountStr);

    if(Number.isSafeInteger(charCountNum) === false) {
        inputValid = false;
        document.getElementById("charCountHelpBlock").innerHTML = "Please enter a valid integer";
    }
    else if (charCountNum < 8 || charCountNum > 128){
        inputValid = false;
        document.getElementById("charCountHelpBlock").innerHTML = "Please choose a value between 8 and 128";
    }
    else {
        document.getElementById("charCountHelpBlock").innerHTML = "";
    }
    
    if (hasLowercase === false && hasUppercase === false && hasNumbers === false && hasSpecialChars === false){
        inputValid = false;
        document.getElementById("checkboxHelpBlock").innerHTML = "Please choose at least one";
    }
    else {
        document.getElementById("checkboxHelpBlock").innerHTML = "";
    }

    if(inputValid) {

        generatePassword(charCountNum, hasLowercase, hasUppercase, hasNumbers, hasSpecialChars);
    }
}

function generatePassword(passLength, hasLower, hasUpper, hasNums, hasSpecials) {
    
    const lowercase = "abcdefghijklmnopqrstuvwxyz".split("");
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const numbers = "0123456789".split("");
    const specialChars = "!@#$%^&*()-_".split("");

    var password = "";
        
    //build an array that contains all 

    var validSet = [];

    if(hasLower){
        validSet = validSet.concat(lowercase);
        password += lowercase[Math.floor(Math.random() * lowercase.length)];  //add a lowercase char
    }
    if(hasUpper){
        validSet = validSet.concat(uppercase);
        password += uppercase[Math.floor(Math.random() * uppercase.length)];  //add an uppercase char
    }
    if(hasNums){
        validSet = validSet.concat(numbers);
        password += numbers[Math.floor(Math.random() * numbers.length)];  //add a number char
    }
    if(hasSpecials){
        validSet = validSet.concat(specialChars);
        password += specialChars[Math.floor(Math.random() * specialChars.length)];  //add a special char
    }

    //build rest of password to requested length using characters in validSet array

    for (var i = password.length; i < passLength; i++) {
        password += validSet[Math.floor(Math.random() * validSet.length)];
    }


    var passwordArr = password.split("");  //convert password to array
    passwordArr.sort(function(a, b){return 0.5 - Math.random()});  //randomize char positions within password
    password = passwordArr.join("");  //convert back to string

    document.getElementById("passHeading").setAttribute("class", "text-dusk");  //display element
    document.getElementById("passwordOutput").innerHTML = password;
    document.getElementById("passwordOutput").setAttribute("class", "w-100");  //display element
    document.getElementById("copyButton").setAttribute("class", "btn rounded-0 text-white bg-dusk my-3"); //display element

}

function copyPassword() {

    var passEl = document.getElementById("passwordOutput");

    passEl.select();
    passEl.setSelectionRange(0, 99999);
    document.execCommand("copy");

}