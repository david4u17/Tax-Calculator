// Function to calculate tax and overall income based on the provided parameters

function calculateTaxAndIncome(grossIncome, extraIncome, age, deductions) {
    let totalIncome = grossIncome + extraIncome - deductions;
    let taxRate = 0;

    if (totalIncome > 800000) {
        if (age === "<40") {
            taxRate = 0.3;
        } else if (age === "40-59") {
            taxRate = 0.4;
        } else if (age === "≥60") {
            taxRate = 0.1;
        }
    }

    let tax = taxRate * (totalIncome - 800000);
    let overallIncome = totalIncome - tax;

    return {
        tax: tax,
        overallIncome: overallIncome
    };
}

// Function to validate form fields and calculate tax
function validateAndCalculateTax(event) {
    event.preventDefault();

    let grossIncome = parseFloat(document.getElementById("grossIncome").value);
    let extraIncome = parseFloat(document.getElementById("extraIncome").value);
    let deductions = parseFloat(document.getElementById("deductions").value);
    let age = document.getElementById("age").value;

    let inputs = document.querySelectorAll('input[type="text"]');

    let isValid = true;

    inputs.forEach(function (input) {
        let inputValue = input.value.trim();

        // Check if the input value is empty or contains only numeric characters
        if (inputValue === "" || !/^\d+(\.\d+)?$/.test(inputValue)) {

            let errorIcon = input.nextElementSibling;
            errorIcon.style.display = "inline";
            isValid = false;
        } else {

            let errorIcon = input.nextElementSibling;
            errorIcon.style.display = "none";
        }
    });

    // Validate age
    if (age === "") {
        isValid = false;
        showErrorMessage(document.getElementById("age"));
    } else {
        hideErrorMessage(document.getElementById("age"));
    }


    // Prevent form submission if any input field is invalid
    if (!isValid) {
        event.preventDefault();
    }


    // If all inputs are valid, calculate tax and show result
    if (isValid) {

        let taxAndIncome = calculateTaxAndIncome(grossIncome, extraIncome, age, deductions);
        let taxAmount = taxAndIncome.tax;
        let postTaxIncome = taxAndIncome.overallIncome;

        document.getElementById("taxResult").innerText = "Tax Amount = ₹ " + taxAmount.toFixed(2);
        document.getElementById("taxResult2").innerText = " Your overall income will be = ₹ " + postTaxIncome.toFixed(2) + " (after tax deductions) ";

        // Modal
        let modal = new bootstrap.Modal(document.getElementById("taxResultModal"));
        modal.show();
    }
}

// Show error icon and tooltip 
function showErrorMessage(inputElement) {
    let errorIcon = inputElement.nextElementSibling;
    errorIcon.style.display = "inline";
}

// Hide error icon and tooltip 
function hideErrorMessage(inputElement) {
    let errorIcon = inputElement.nextElementSibling;
    errorIcon.style.display = "none";
}

// Function to validate input and display error icon
function validateInput(event) {
    let inputElement = event.target;
    let inputValue = inputElement.value.trim();

    // Check if the input value contains only numeric characters, or if it's an age dropdown with a selected option
    if (inputElement.id === 'age' && inputElement.value !== "") {
        hideErrorMessage(inputElement);
    } else if (!/^\d+(\.\d+)?$/.test(inputValue)) {
        let errorIcon = inputElement.nextElementSibling;
        errorIcon.style.display = "inline";
    } else {
        hideErrorMessage(inputElement);
    }
}


document.getElementById("grossIncome").addEventListener("input", validateInput);
document.getElementById("extraIncome").addEventListener("input", validateInput);
document.getElementById("deductions").addEventListener("input", validateInput);
document.getElementById("age").addEventListener("change", validateInput);

// event listener for form submission
document.getElementById("taxForm").addEventListener("submit", validateAndCalculateTax);

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})
