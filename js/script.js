//console.log("Test lol")

//
//
//The Name Field
//
//

document.addEventListener('DOMContentLoaded', function(){
    let focusedName = document.querySelector('input#name')
    focusedName.focus()
})


//
//
// The Job Role section
//
//

let otherJobRole = document.querySelector('#other-job-role')
otherJobRole.style.visibility = "hidden"

let jobRoleDropDown = document.getElementById('title')
jobRoleDropDown.addEventListener('change', function() {
    let selectedOption = jobRoleDropDown.options[jobRoleDropDown.selectedIndex]

    if(selectedOption.value === "other"){
        otherJobRole.style.visibility = "visible"
    }
    else {
        otherJobRole.style.visibility = "hidden"
    }
})

//
//
//Tshirt info section
//
//

let color = document.querySelector('#color')
//console.log(color)
color.disabled = true

let design = document.querySelector('#design')

design.addEventListener('change', function(){
    color.disabled = false
    let selectedTheme = design.options[design.selectedIndex]

    for (let option of color.options) {
        let optionTheme = option.getAttribute('data-theme')
        if (optionTheme === selectedTheme.value) {
            option.disabled = false
        }
        else {
            option.disabled = true
        }
    }
})


//
//
//Register for Activities Section
//
//

let registerForActivities = document.querySelector('#activities')

registerForActivities.addEventListener('change', function(){
    let total = 0
    let activities = document.querySelectorAll('input[type=checkbox]')

    for(let i = 0; i < activities.length; i++){
        if(activities[i].checked == true){
            total += parseInt(activities[i].getAttribute('data-cost'))
        }
    }
    
    let activitiesCost = document.querySelector('p#activities-cost')
    activitiesCost.innerHTML = '$' + total
})

//
//
// 7. Payment Info Section
//
//

let payWith = document.querySelector('#payment')
payWith.value = 'credit-card'

let creditCard = document.querySelector('#credit-card')
let paypal = document.querySelector('#paypal')
let bitcoin = document.querySelector('#bitcoin')
paypal.style.display = 'none'
bitcoin.style.display = 'none'

payWith.addEventListener("change", function(){
    let selectedOption = payWith.options[payWith.selectedIndex]
    let paymentMethods = [creditCard, paypal, bitcoin]

    for(let i = 0; i < paymentMethods.length; i++){
        if(paymentMethods[i].id === selectedOption.value) {
            paymentMethods[i].style.display = 'block'
        }
        else {
            paymentMethods[i].style.display = 'none'
        }
    }
})

//
//
// 8. Form Validation
//
//

let nameCheck = /^[A-Za-z]+$/

let emailCheck = /^[A-Za-z90-9]+@[A-Za-z0-9]+\.com$/

let creditCardCheck = /^[0-9]{13,16}$/

let zipCodeCheck = /^[0-9]{5}$/

let cvvCheck = /^[0-9]{3}$/

function validate(selector, validatorRegex) {
    let inputElement = document.querySelector(selector)
    let hintElement = inputElement.parentElement.lastElementChild
    if (validatorRegex.test(inputElement.value)){
        inputElement.parentElement.classList.add('valid')
        inputElement.parentElement.classList.remove('not-valid')
        hintElement.style.display = "none"
        return true
    }
    else {
        inputElement.parentElement.classList.add('not-valid')
        inputElement.parentElement.classList.remove('valid')
        hintElement.style.display = "block"
        return false
    }
}

function validateActivities() {
    let activities = document.querySelectorAll('input[type=checkbox]')
    let activitiesHint = document.querySelector('#activities-hint')

    let activitiesFieldset = document.querySelector('#activities')

    let totalActivities = 0;
    for(let i = 0; i < activities.length; i++){
        if(activities[i].checked){
            totalActivities++
        }
    }

    if (totalActivities > 0){
        activitiesFieldset.classList.add('valid')
        activitiesFieldset.classList.remove('not-valid')
        activitiesHint.style.display = "none"
        return true
    }
    else {
        activitiesFieldset.classList.add('not-valid')
        activitiesFieldset.classList.remove('valid')
        activitiesHint.style.display = "block"
        return false
    }
}

let formElement = document.querySelector('form')

formElement.addEventListener("submit", function(e){
    let nameValid = validate("#name", nameCheck)
    let emailValid = validate("#email", emailCheck)
    let activitiesValid = validateActivities()

    let payWith = document.querySelector('#payment')
    let creditCardValid = true
    if (payWith.value === 'credit-card') {
        let creditCardNumberValid = validate("#cc-num", creditCardCheck)
        let zipCodeValid = validate("#zip", zipCodeCheck)
        let cvvValid = validate("#cvv", cvvCheck)
        creditCardValid = creditCardNumberValid && zipCodeValid && cvvValid
    }

    let formValid = nameValid && emailValid && activitiesValid && creditCardValid
    if (!formValid) {
        e.preventDefault()
    }
})


//
//
// 9. Accessibility
//
//


let allCheckboxes = document.querySelectorAll('input[type = checkbox]')

allCheckboxes.forEach(checkbox => {

    checkbox.addEventListener('focus', function(){
        checkbox.parentElement.classList.add('focus')
    } )
    
    
    checkbox.addEventListener('blur', function(){
        checkbox.parentElement.classList.remove('focus')

    } )
})



//
//
// 1. Prevent users from registering for conflicting activities
//
//

let registerForActivities2 = document.querySelector('#activities')

registerForActivities2.addEventListener('change', function(e){
    let activities = document.querySelectorAll('input[type=checkbox]')
    let eventTime = e.target.getAttribute('data-day-and-time')
    let eventSelected = e.target.checked

    for(let i = 0; i < activities.length; i++){
        let otherEventTime = activities[i].getAttribute('data-day-and-time')
        if (eventTime === otherEventTime && activities[i] !== e.target){
            if(eventSelected){
                activities[i].parentElement.classList.add('disabled')
                activities[i].disabled = true
            }
            else {
                activities[i].parentElement.classList.remove('disabled')
                activities[i].disabled = false
            }
        }
    }
})


//
//
// 2. Real-time error message
//
//

let nameInput = document.querySelector('#name')
let emailInput = document.querySelector('#email')


nameInput.addEventListener('keyup', function(){
    validate('#name', nameCheck)
})


emailInput.addEventListener('keyup', function(){
    validate('#email', emailCheck)
})

//
//
// 3. Conditional error message
//
//
let emailHint = document.querySelector('#email-hint')
let emailInput2 = document.querySelector('#email')
emailInput2.addEventListener('keyup', function(){
    if(!emailInput2.value.endsWith('.com')){
        emailHint.innerHTML = "Email address must end in .com"
    }
    else if(!emailInput2.value.includes('@') ){
        emailHint.innerHTML = "Email address must include an @ symbol"
    }
    else{
        emailHint.innerHTML = 'Email address must be formatted correctly'
    }
})
