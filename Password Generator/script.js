const passwordDisplay = document.querySelector("[ data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copyMsg]");

const lengthDisplay = document.querySelector("[data-lengthNo]");

const inputSlider = document.querySelector("[ data-lengthSlider]");

const upperCheck = document.querySelector("#uppercase");

const lowerCheck = document.querySelector("#lowercase");

const numbersCheck = document.querySelector("#numbers");

const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[ data-indicator]");

const generateBtn = document.querySelector(".generate-button");

const allcheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = "'`'!@#$%^&*<>?.,';:}{][_\|"

// password
let password = "";
let passwordLength =10;
let checkCount = 0;
handleSlider();
// set strength circle color
setIndicator("#ccc")


// set password length or iska kaam itna hai yeh passwordLength ko UI par show karta hai
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;

    // formula for slider
    const max=inputSlider.max;
    const min=inputSlider.min;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%"
}

//set indicator color
function setIndicator(color){
    indicator.style.backgroundColor=color;
    // shadow diy
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}


// get random intg
function getRndInteger(max, min){
        return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber () {
    return getRndInteger(0,9);
}

function generateLowerCase () {
        return String.fromCharCode (getRndInteger(97,123));    //small alphabets sky value a=97 to z=123
}

function generateUpperCase () {
    return String.fromCharCode (getRndInteger(65,91));    //Caps alphabets sky value A=65 to Z=91
}

function generateSymbol () {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

// calculating strengh
function calcStrength () {
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSymbol=false;

    if(upperCheck.checked) hasUpper=true;
    if(lowerCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSymbol=true;

    if(hasLower && hasUpper && (hasNum || hasSymbol) && passwordLength >= 8){
        setIndicator("#0f0");
    }

    else if(
    (hasLower || hasUpper) && (hasNum || hasSymbol) && passwordLength >= 6){
        setIndicator("#ff0");
    }
    
    else{
        setIndicator("#f00");
    }
}

 async function copycontent() {
   try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText="copied";
   } 
   catch(e){
        copyMsg.innerText="failed"
   }

//    to make copy message visible
                copyMsg.classList.add("active");

        setTimeout( () => {
            copyMsg.classList.remove("active")
        },2000)
 }


 function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}



 function handleCheckBox(){
        checkCount=0;
        allcheckBox.forEach( (checkbox) =>{
            if(checkbox.checked){
                checkCount++;
            }
        });

        // Special condition

        if(passwordLength < checkCount){
            passwordLength=checkCount;
            handleSlider();
        }
 }


 allcheckBox.forEach( (checkbox) =>{
        checkbox.addEventListener('change', handleCheckBox);
 }); 



 inputSlider.addEventListener('input', (e) => {
    passwordLength=e.target.value;
    handleSlider();
 });


 copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copycontent();
 })



 generateBtn.addEventListener('click', () =>{
     
        // none of the checkbox selected case
        if(checkCount ==0) 
            return;

        //special case
        if(passwordLength < checkCount){
            passwordLength=checkCount;
            handleSlider();
        }

        // to find new password


        // remove old password
        password="";

        //let's puts the stuff mention the checkboxes
        let funcArray=[];

        if(upperCheck.checked){
            funcArray.push(generateUpperCase);
        }

        if(lowerCheck.checked){
            funcArray.push(generateLowerCase);
        }

        if(numbersCheck.checked){
            funcArray.push(generateRandomNumber);
        }

        if(symbolsCheck.checked){
            funcArray.push(generateSymbol);
        }

        //compulsary addition
        for(let i=0; i<funcArray.length; i++){
                password +=funcArray[i]();
        }

        //remaining addition
        for(let i=0; i < passwordLength-funcArray.length; i++){
            let randomIndex = getRndInteger(0,funcArray.length);
            password += funcArray[randomIndex]();
        }

        //shuffle the password
        password = shufflePassword(Array.from(password));


        //show in ui
        passwordDisplay.value=password;

        //calculate strength
        calcStrength();
 });