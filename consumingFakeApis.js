// on document load,fetch users
document.addEventListener('DOMContentLoaded', fetchUsers())

function fetchUsers() {
    // fetchUsers API call 
    fetch('https://dummyjson.com/users/?limit=3&select=id,firstName,lastName,email,phone,gender,image')
        // after getting users, parse to json 
        .then(res => res.json())
        // after parsing result, call set card details function
        .then(data => {
            setCardDetails(data.users);
        });
}

function setCardDetails(users) {
    //we have array of users
    users.forEach(bla => {
        addCard(bla)
    });
}

function addCard(user) {
    //card design
    var cardDesign = "<div id=" + user.id + " class='card bg-light mt-3 mb-3'><div class='card-body'><div class='row'>" +
        "<div class='col-10 col-md-10 col-lg-10'>" +
        "<h3 class='text-primary'>" + user.firstName + user.lastName + "</h3>" +
        "<span><i class='fa fa-envelope-o' aria-hidden='true'></i> " + user.email + "</span><br />" +
        " <span><i class='fa fa-phone' aria-hidden='true'></i> " + user.phone + "</span><br />" +
        " <button type='button'  onclick= editUser(" + user.id + ") class='btn btn-dark'>Edit</button>" +
        " <button type='button' onclick= deleteUser(" + user.id + ") class='btn btn-danger'>Delete</button>" +
        "</div><div class='col-2 col-md-2 col-lg-2'>" +
        "<button  type='button' class='btn " + user.btnClass + " float-right mb-2'>" + user.gender + "</button>" +
        "<img class='float-right' src='" + user.image + "' width='100' height='100' />" +
        " </div></div></div></div>"


    var mainDiv = document.getElementById('main');
    //add card to main div
    mainDiv.innerHTML += cardDesign
}

function editUser(id){
    fetch('https://dummyjson.com/users/'+id, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lastName: 'Owais'
        })
      })
      .then(res => res.json())
      .then(console.log);
}

function deleteUser(id) {
    fetch('https://dummyjson.com/users/' + id + '/?limit=3&select=id', {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(user => removeDiv(user.id));
}

function removeDiv(id) {
    document.getElementById(id).classList.add('d-none')
}