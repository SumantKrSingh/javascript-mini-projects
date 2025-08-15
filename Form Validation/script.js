
let myForm = document.getElementById("myForm");
document.getElementById("submitBtn")?.addEventListener("click", (e) => {
    e.preventDefault()

    if (nameValidate() && emailValidate() && passwordValidate() && confirmPasswordValidate()) {
        alert("Form Successfully Submitted");
        myForm.reset(); // reseting form 
        clearEventUi();
    }
});


// Checking for name
function nameValidate() {
    let nameError = document.getElementById("nameError");
    let name = document.getElementById("name").value.trim();
    if (name.length == 0) {
        nameError.innerHTML = "Name is required*"
        nameError.nextElementSibling.classList.add("fa-xmark")
        return false;
    }

    else if (!name.match(/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/)) {
        nameError.innerHTML = "Write your full name*"
        nameError.nextElementSibling.classList.add("fa-xmark")
        return false;
    } else {
        nameError.innerHTML = '';
        nameError.nextElementSibling.classList.add("fa-check");
        nameError.nextElementSibling.style.color = "green";
        return true;
    }
}

// Checking mail
function emailValidate() {
    let nameError = document.getElementById("emailError");
    let email = document.getElementById("email").value;
    if (email.length == 0) {
        emailError.innerHTML = "Email is required*"
        emailError.nextElementSibling.classList.add("fa-xmark")
        return false;
    }

    else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        emailError.innerHTML = "Write a valid e-mail*"
        emailError.nextElementSibling.classList.add("fa-xmark")
        return false;
    } else {
        emailError.innerHTML = '';
        emailError.nextElementSibling.classList.add("fa-check");
        emailError.nextElementSibling.style.color = "green";
        return true;
    }
}

// Checking password
function passwordValidate() {
    let nameError = document.getElementById("passwordError");
    let password = document.getElementById("password").value.trim();
    if (password.length == 0) {
        passwordError.innerHTML = "Password is required*"
        passwordError.nextElementSibling.classList.add("fa-xmark")
        return false;
    }

    else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
        passwordError.innerHTML = "Password must be minimum 8 characters, at least one digit and one letter *"
        passwordError.nextElementSibling.classList.add("fa-xmark")
        return false;
    } else {
        passwordError.innerHTML = '';
        passwordError.nextElementSibling.classList.add("fa-check");
        passwordError.nextElementSibling.style.color = "green";
        return true;
    }
}

// password is same or not
function confirmPasswordValidate() {
    let confirmPassword = document.getElementById("confirmPassword").value;
    let confirmError = document.getElementById("confirmError");
    let password = document.getElementById("password").value.trim();

    if (confirmPassword.length == 0) {
        return false
    }

    else if (confirmPassword !== password) {
        confirmError.innerHTML = "Password doesn't match!"
        confirmError.nextElementSibling.classList.add("fa-xmark");
        return false;
    } else {
        confirmError.innerHTML = "";
        confirmError.nextElementSibling.classList.add("fa-check");
        confirmError.nextElementSibling.style.color = "green";
        return true;
    }
}



// Clear icons after the form submit succesfully
function clearEventUi() {
    document.querySelectorAll("i.fa-solid").forEach(icon => {
        icon.className = "fa-solid";
        icon.style.color = ""
    })
}