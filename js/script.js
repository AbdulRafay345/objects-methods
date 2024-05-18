let users = [];
const getInputFiledValue = id => document.getElementById(id).value;

// email regex
let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// random id
let randomId = Math.random().toString(36).slice(2)


//  to add user
let submitForm = () => {
    event.preventDefault();

    let firstName = getInputFiledValue("firstName");
    let lastName = getInputFiledValue("lastName");
    let email = getInputFiledValue("email");
    let dob = getInputFiledValue("dob");

    // to calculate age
    let now = new Date();
    let birthDate = new Date(dob);
    let age = now.getTime() - birthDate.getTime();
    age = Math.round(age / (1000 * 60 * 60 * 24 * 365));

    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();

    if (firstName < 3) {
        toastNotify("Please write your first name correctly!", "error");
        return;
    }
    if (!emailFormat.test(email)) {
        toastNotify("Please write your email correctly!", "error");
        return;
    }
    if (!dob || age <= -1) {
        toastNotify("Please give your date of birth correctly!", "error");
        return;
    }


    let user = { firstName, lastName, email, dob, age, randomId }
    users.push(user)
    toastNotify("User has been added successfully", "notify")
}


// to show users in console
let showConsole = () => {

    if (!users.length) {
        toastNotify("Not A singel user found!", "error");
        return;
    }
    for (i = 0; i < users.length; i++) {
        console.log("User:", i + 1);
        console.log("First Name:", users[i].firstName);
        console.log("Last Name:", users[i].lastName);
        console.log("Email:", users[i].email);
        console.log("Date of Birth:", users[i].dob);
        console.log("Age:", users[i].age);
        console.log("Random Id:", users[i].randomId);
    }
}


//  to show user in output
let showTable = () => {
    if (!users.length) {
        toastNotify("Not A singel user found!", "error");
        return;
    }
    let tableStartingCode = "<div class='table-responsive'><table class='table'>";
    let tableEndingCode = "</table></div>";
    let tableHead = '<thead><tr><th scope="col">#</th><th scope="col">First Name</th><th scope="col">Last Name</th><th scope="col">Email</th><th scope="col">D.O.B</th><th scope="col">Age</th></tr></thead>';
    let tableBody = "";
    for (i = 0; i < users.length; i++) {
        tableBody += '<tr><th scope="row">' + (i + 1) + '</th><td>' + users[i].firstName + '</td><td>' + users[i].lastName + '</td><td>' + users[i].email + '</td><td>' + users[i].dob + '</td><td>' + users[i].age + '<td></tr>';
    }
    let table = tableStartingCode + tableHead + '<tbody>' + tableBody + '</tbody>' + tableEndingCode;
    showOutput(table);
}


// to notification
function toastNotify(text, type) {
    let color;
    switch (type) {
        case "notify":
            color = "linear-gradient(to right, #a3b18a, #588157, #3a5a40)";
            break;
        case "error":
            color = "linear-gradient(to right, #e63946, #780000)";
            break;
        default:
            color = "#000";
            break;
    }
    Toastify({
        text: text,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: color,
        },
        onClick: function () { } // Callback after click
    }).showToast();
}


// to show output
function showOutput(output) {
    document.getElementById("output").innerHTML = output
}


// to clear output
function clearOutput() {
    let output = document.getElementById("output").innerHTML;
    if (!output) {
        toastNotify("Output is already cleared", "error")
        return;
    } else {
        showOutput("")
        toastNotify("Output is cleared successfully", "notify")
    }
}