var mainDiv = document.getElementById('main');
var usersArray = []
var data
// on document load,fetch users
document.addEventListener('DOMContentLoaded', fetchUsers())

//create
function addContact() {

    let details = getDetails()

    if (details == 'error')
        return

    document.getElementById("load").classList.remove('d-none')

    fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: details.firstName,
            lastName: details.lastName,
            email: details.email,
            phone: details.phone,
            gender: details.gender,
            image: details.image,
            /* other user data */
        })
    })
        .then(res => res.json())
        .then(data => { usersArray.push(data), addCard(data), removeLoader() })
        .catch((error) => {
            showError(error)
        })


}

//read
function fetchUsers() {
    document.getElementById("load").classList.remove('d-none')

    // fetchUsers API call 
    fetch('https://dummyjson.com/users/?limit=3&select=id,firstName,lastName,email,phone,gender,image,isDeleted')
        // after getting users, parse to json 
        .then(res => res.json())
        // after parsing result, call set card details function
        .then(data => {
            setCardDetails(data.users);
        }).catch((error) => {
            showError(error)
        });
}

//update
function editUser(id) {

    //get modal values
    var fName = document.getElementById('editFName' + id).value
    var lName = document.getElementById('editLName' + id).value
    var email = document.getElementById('editEmail' + id).value
    var number = document.getElementById('editNumber' + id).value

    //validation
    if (!isValidName(fName) || !isValidName(lName) || !isValidEmail(email) || !isValidNumber(number)) {
        document.getElementById('error').style.display = "block"
        document.getElementById('error').innerHTML = error
        return 'error'
    }

    document.getElementById('error').style.display = "none"
    document.getElementById("load").classList.remove('d-none')

    if (id > 100) {
        data = {
            "id":id,
            "firstName": fName,
            "lastName": lName,
            "email": email,
            "phone": number,
            "gender": "female",
            "image": "https://robohash.org/consequunturautconsequatur.png"
        }
        update(data)
        return
    }
    //edit API
    fetch('https://dummyjson.com/users/' + id, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: fName,
            lastName: lName,
            email: email,
            phone: number
        })
    })
        .then(res => res.json())
        .then(data => update(data))
        .catch((error) => {
            showError(error);
        });
}

//delete
function deleteUser(id) {

    if (id > 100) {
        removeDiv(id)
        return
    }

    document.getElementById("load").classList.remove("d-none")

    fetch('https://dummyjson.com/users/' + id + '/?limit=3&select=id', {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(user => removeDiv(user.id))
        .catch((error) => {
            showError(error)
        });
}

//array of users to make cards
function setCardDetails(users) {
    usersArray = users
    //we have array of users
    usersArray.forEach(user => {
        addCard(user)
    });

    removeLoader()
}

//get details from input fields
function getDetails() {
    //get values from input fields
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var number = document.getElementById('number').value;

    if (!isValidFullName(name) || !isValidEmail(email) || !isValidNumber(number)) {
        showError(error)
        return 'error'
    }

    name = name.split(' ')

    if (name.length != 2) {
        error = "Enter Full Name"
        showError(error)
        return 'error'
    }

    document.getElementById('error').style.display = "none"

    firstname = name[0]
    lastname = name[1]

    var gender = ""
    document.getElementById('male').checked ? gender = "male" : gender = "female"

    details = {
        "firstName": firstname,
        "lastName": lastname,
        "email": email,
        "phone": number,
        "gender": gender,
        "image": "https://robohash.org/consequunturautconsequatur.png"
    }

    return details
}

//card design template
function addCard(user) {

    //deleted user's id is set to 0
    if (user.id == 0)
        return


    console.log(user.gender)
    var button = ""
    user.gender == "male" ? button = "btn-warning" : button = "btn-info"

    //card design
    var cardDesign = "<div id=" + user.id + " class='card bg-light mt-3 mb-3'><div class='card-body'><div class='row'>" +
        "<div class='col-10 col-md-10 col-lg-10'>" +
        "<h3 class='text-primary'>" + user.firstName +" "+ user.lastName + "</h3>" +
        "<span><i class='fa fa-envelope-o' aria-hidden='true'></i> " + user.email + "</span><br />" +
        " <span><i class='fa fa-phone' aria-hidden='true'></i> " + user.phone + "</span><br />" +
        " <button type='button'  data-toggle='modal' data-target='#exampleModal" + user.id + "' class='btn btn-dark'>Edit</button>" +
        " <button type='button' onclick= deleteUser(" + user.id + ") class='btn btn-danger'>Delete</button>" +
        "</div><div class='col-2 col-md-2 col-lg-2'>" +
        "<button  type='button' class='btn " + button + " float-right mb-2'>" + user.gender + "</button>" +
        "<img class='float-right' src='" + user.image + "' width='100' height='100' />" +
        " </div></div></div></div>"


    // edit modal 
    var editModal = '<div class="modal fade" id="exampleModal' + user.id + '" tabindex="-1" role="dialog"  aria-hidden="true">' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        ' <div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">Edit Modal</h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body">' +
        ' <input type="text" class="form-control mt-1" value=' + user.firstName + ' id=editFName' + user.id + '>' +
        ' <input type="text" class="form-control mt-1" value=' + user.lastName + ' id=editLName' + user.id + '>' +
        ' <input type="text" class="form-control mt-1"  value=' + user.email + ' id=editEmail' + user.id + '>' +
        ' <input type="tel" class="form-control mt-1"  value="' + user.phone + '" id=editNumber' + user.id + '>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
        '<button type="button" onclick=editUser(' + user.id + ') data-dismiss="modal" class="btn btn-primary">Update</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'

    //add card to main div
    mainDiv.innerHTML += cardDesign
    //add edit modal to main div
    mainDiv.innerHTML += editModal
}

//update array data and change card
function update(data) {

    if(data.id > 100)
    data.id = data.id - 97

    //array starts from 0 but db rows starts from 1
    index = data.id - 1
    console.log(usersArray[index])

    usersArray[index] = data
    mainDiv.innerHTML = ""
    setCardDetails(usersArray)
    removeLoader()
}

//change id of deleted row to 0
function removeDiv(id) {

    document.getElementById(id).classList.add("d-none")

    //our array index is 1,2,3,4 ....... 
    //we have 3 indexes from db
    if (id > 100)
        id = id - 97

    index = id - 1
    data = usersArray[index]
    data.id = 0
    usersArray[index] = data

    document.getElementById("load").classList.add("d-none")
}

//hide loader
function removeLoader() {
    document.getElementById("load").classList.add('d-none')
}

function showError(error) {
    document.getElementById('error').style.display = "block"
    document.getElementById('error').innerHTML = error
}

//Validations : 

isValidFullName = (name) => {
    //only alphabets
    reg = /^[a-zA-Z\s]*$/

    if (reg.test(name))
        return true

    error = "Invalid Name"
    return false
}

isValidName = (name) => {
    //only alphabets
    reg = /^[a-zA-Z]*$/

    if (reg.test(name))
        return true

    error = "Invalid Name"
    return false
}

isValidEmail = (email) => {
    //any alphabets numbers speccial chat with @ any number alphabets .com
    reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+.[a-zA-Z]*$/
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