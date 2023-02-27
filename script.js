
var cardDetailsArray = [{
    "name": "Erafi Ahonaf",
    "email": "erafi@gmail.com",
    "number": "01875510966",
    "btnClass": "btn-success",
    "type": "Professional",
    "imageSource": "pic2.png",
}, {
    "name": "Ishan Sarkar",
    "email": "ishan@gmail.com",
    "number": "01719058105",
    "btnClass": "btn-primary",
    "type": "Personal",
    "imageSource": "pic1.png",
}, {
    "name": "John Doe",
    "email": "jdoe@gmail.com",
    "number": "01875510966",
    "btnClass": "btn-success",
    "type": "Professional",
    "imageSource": "pic3.png",
}]

var error

function addContact() {


    var mainDiv = document.getElementById('main');
    document.getElementById('success').style.display = "none"
    mainDiv.innerHTML = []


    for (element of cardDetailsArray) {
        let cardDesign = setCardDetails(element)
        //append card to main div
        mainDiv.innerHTML += cardDesign
    }

    let details = getDetails()

    if (details == 'error')
        return

    cardDetailsArray.push(details)

    let cardDesign = setCardDetails(details)
    //append card to main div
    mainDiv.innerHTML += cardDesign

    document.getElementById('success').style.display = "block"
    document.getElementById('success').innerHTML = "Successfully Added"
}

function getDetails() {
    //get values from input fields
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var number = document.getElementById('number').value;

    if (!isValidName(name) || !isValidEmail(email) || !isValidNumber(number)) {
        document.getElementById('error').style.display = "block"
        document.getElementById('error').innerHTML = error
        return 'error'
    }
    document.getElementById('error').style.display = "none"


    document.getElementById('error').innerHTML = error
    var imageSource = document.getElementById('file').files[0];

    // radio button checked
    var isProfessional = document.getElementById('inlineRadio2').checked;

    //value based on radio button type
    if (isProfessional) {
        type = "Professional"
        btnClass = "btn-success"
    } else {
        type = "Personal"
        btnClass = "btn-primary"
    }

    details = {
        "name": name,
        "email": email,
        "number": number,
        "btnClass": btnClass,
        "type": type,
        "imageSource": imageSource.name,
    }

    return details
}

function setCardDetails(details) {
    return "<div class='card bg-light mt-3 mb-3'><div class='card-body'><div class='row'>" +
        "<div class='col-10 col-md-10 col-lg-10'>" +
        "<h3 class='text-primary'>" + details.name + "</h3>" +
        "<span><i class='fa fa-envelope-o' aria-hidden='true'></i> " + details.email + "</span><br />" +
        " <span><i class='fa fa-phone' aria-hidden='true'></i> " + details.number + "</span><br />" +
        " <button type='button' class='btn btn-dark'>Edit</button>" +
        " <button type='button' class='btn btn-danger'>Delete</button>" +
        "</div><div class='col-2 col-md-2 col-lg-2'>" +
        "<button type='button' class='btn " + details.btnClass + " float-right mb-2'>" + details.type + "</button>" +
        "<img class='float-right' src='" + details.imageSource + "' width='100' height='100' />" +
        " </div></div></div></div>"


}

isValidName = (name) => {
    //only alphabets
    reg = /^[a-zA-Z\s]*$/
    if (reg.test(name))
        return true

    error = "Invalid Name"
    return false
}

isValidEmail = (email) => {
    //any alphabets numbers speccial chat with @ any number alphabets .com
    reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+.(com)*$/
    if (reg.test(email))
        return true

    error = "Invalid Email"
    return false
}

isValidNumber = (number) => {

    reg = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
    if (reg.test(number))
        return true

    error = "Invalid Number"
    return false

}