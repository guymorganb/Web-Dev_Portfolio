/**
 * .js to vlidate user input (client side)
 */
const form = document.getElementById('signup_form')
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const dobInput = document .getElementById('dob');
const zipInput = document.getElementById('zip');
const submitbtn = document.getElementById('Sign-up');
const resetBtn = document.getElementById('clear');
let msgs = [];
const displayErrorMsgs = function(msgs) {
    const ul = document.createElement('ul'); //create an element to hold our errors
    ul.classList.add('messages') // add a class to the ul
    // clear the ul before appending new messages
    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    }
    for(let msg of msgs){
        const li = document.createElement('li');
        const text = document.createTextNode(msg);
        li.appendChild(text);
        ul.appendChild(li)
    }
    const node = document.querySelector('.messages'); // select the node we just made

    if(node == null){
        form.parentNode.insertBefore(ul, form) 
    } else{
        node.parentNode.replaceChild(ul, node);
    } 
}
const clearErrors = function(){
    const elements = document.getElementsByClassName('messages')
    Array.from(elements).forEach(function(element){
        element.remove()
    });
    msgs = []; 
}
let validate = async function() {
    // reminder, these are the elements youll pass to the api call, fName, lName etc.
    const fName = firstName.value.trim()
    const lName = lastName.value.trim() 
    const email = emailInput.value.trim();
    const dob = dobInput.value.trim();
    const zip = zipInput.value.trim()
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
    const dobPattern = /\d{2}-\d{2}-\d{4}/
    const zipPattern = /\d{5}/
    
    if (fName == ""){
        msgs[msgs.length] = "Please enter a first name.";
    } else if(lName == ""){
        msgs[msgs.length] = "Please enter a last name.";
    } else if(!emailPattern.test(email)) {
        msgs[msgs.length] = "Please enter a valid email address.";
    } else if (!dobPattern.test(dob)){
        msgs[msgs.length] = "Please enter birthdate in the format DD-MM-YYYY.";
    } else if(!zipPattern.test(zip)){
        msgs[msgs.length] = "Invalid zip, please try again";
    }
    if (msgs.length == 0) {
    // Fetch API for making AJAX requests, returns a Promise
        try{
            const response = await fetch('/signup/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fName,lName, dob, email, zip })
            });
                // If login is successful, redirect to dashboard
                if (response.ok) {
                    msgs[msgs.length] = 'Thank you!'
                    displayErrorMsgs(msgs)
                    // now load a new box which will allow the user to input their username, sends a GET request
                    setTimeout(function () {window.location.href = '/signup/newuser'}, 500);
                    return;
                } else {
                    // Display error message from server
                    // you have to use await or it wont work
                    const data = await response.json();
                    console.error({message: "Server error", Error: data})
                    msgs[msgs.length] = data.message
                    displayErrorMsgs(msgs)
                    return;
                }
        }catch(err){
            console.error({message:"Server error", Error: err})
        }
    }
    displayErrorMsgs(msgs)
}
const init = () =>{
    document.addEventListener("DOMContentLoaded", function () {
        form.addEventListener("submit", function (event) {
          event.preventDefault();
          validate();
        });
        resetBtn.addEventListener("click", function () {
            firstName.value = "";
            lastName.value = "";
            dobInput.value = "";
            zipInput.value = "";
            emailInput.value = "";
            clearErrors()
        });
      });
}
init();