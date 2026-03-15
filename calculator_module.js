// This file acts as a custom module that defines some math functions.
// These functions won't be accessible to other files unless we 'export' them.

// Function to add two numbers and log the result
function add(a, b) {
    console.log(a + b); // Prints the sum
}

// Function to subtract the second number from the first and log the result
function sub(a, b) {
    console.log(a - b); // Prints the difference
}

// Function to multiply two numbers and log the result
function mul(a, b) {
    console.log(a * b); // Prints the product
}

// Function to divide the first number by the second and log the result
function div(a, b) {
    console.log(a / b); // Prints the quotient
}

// 'module.exports' is a special object used to expose functions/variables 
// so they can be 'required' (imported) by other Node.js files.
module.exports = {
    // We export our internal 'add' function under the key 'addition'
    addition: add,
    // We export our internal 'sub' function under the key 'subtraction'
    subtraction: sub,
    // We export our internal 'mul' function under the key 'multiplication'
    multiplication: mul,
    // We export our internal 'div' function under the key 'division'
    division: div
};