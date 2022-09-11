//console.log("Test lol")


//The Name Field

document.addEventListener('DOMContentLoaded', function(){
    let focusedName = document.querySelector('input#name')
    focusedName.focus()
})

// The Job Role section

//let other = document.getElementsByName('title')[6].value

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
let checkbox = document.getElementsByTagName("input").type == "checkbox"

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

let emailCheck = /^[A-Za-z90-9]+@[A-Za-z0-9]+\.com$/

let creditCardCheck = /^[0-9]{13,16}$/

let zipCodeCheck = /^[0-9]{5}$/

let cvvCheck = /^[0-9]{3}$/

function validateName() {
    let name = document.querySelector('#name')
    let nameHint = document.querySelector('#name-hint')
    if (name.value === ''){
        nameHint.style.display = "block"
        return false
    }
    else {
        nameHint.style.display = "none"
        return true
    }
}

function validateEmail() {
    let email = document.querySelector('#email')
    let emailHint = document.querySelector('#email-hint')
    if (!emailCheck.test(email.value)){
        emailHint.style.display = "block"
        return false
    }
    else {
        emailHint.style.display = "none"
        return true
    }
}

function validateActivities() {
    let activities = document.querySelectorAll('input[type=checkbox]')
    let activitiesHint = document.querySelector('#activities-hint')

    let totalActivities = 0;
    for(let i = 0; i < activities.length; i++){
        if(activities[i].checked){
            totalActivities++
        }
    }

    if (totalActivities === 0){
        activitiesHint.style.display = "block"
        return false
    }
    else {
        activitiesHint.style.display = "none"
        return true
    }
}

function validateCreditCardNumber() {
    let creditCardNumber = document.querySelector('#cc-num')
    let creditCardNumberHint = document.querySelector('#cc-hint')
    console.log(creditCardNumber.value, creditCardCheck.test(creditCardNumber.value))
    if (!creditCardCheck.test(creditCardNumber.value)){
        creditCardNumberHint.style.display = "block"
        return false
    }
    else {
        creditCardNumberHint.style.display = "none"
        return true
    }
}

function validateZipCode() {
    let zipCode = document.querySelector('#zip')
    let zipCodeHint = document.querySelector('#zip-hint')
    if (!zipCodeCheck.test(zipCode.value)){
        zipCodeHint.style.display = "block"
        return false
    }
    else {
        zipCodeHint.style.display = "none"
        return true
    }
}

function validateCVV() {
    let cvv = document.querySelector('#cvv')
    let cvvHint = document.querySelector('#cvv-hint')
    if (!cvvCheck.test(cvv.value)){
        cvvHint.style.display = "block"
        return false
    }
    else {
        cvvHint.style.display = "none"
        return true
    }
}

let formElement = document.querySelector('form')

formElement.addEventListener("submit", function(e){
    let nameValid = validateName()
    let emailValid = validateEmail()
    let activitiesValid = validateActivities()

    let payWith = document.querySelector('#payment')
    let creditCardValid = true
    if (payWith.value === 'credit-card') {
        let creditCardNumberValid = validateCreditCardNumber()
        let zipCodeValid = validateZipCode()
        let cvvValid = validateCVV()
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

