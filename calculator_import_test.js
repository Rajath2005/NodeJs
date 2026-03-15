// This file demonstrates how to import and use a custom module (our calculator).

// We use the 'require' function with a relative path ('./calculator_module') to import 
// the module we made. We store its exported object in the constant 'calculator'.
const calculator = require('./calculator_module');

// Below are commented-out basic JavaScript console logs and function examples:
// console.log('Iam learning Node js with Scaler');

// function helloscaler(){
//     console.log("I Rajath!");
// }
// helloscaler();

// 'global' is a built-in object in Node.js (like the 'window' object in browsers).
// console.log(global);

// Variables declared with 'let', 'const', or 'var' are NOT automatically added to the global object in Node.js.
// let name="Rajath";
// console.log(global.name);

// Now we use the functions we imported from our 'calculator' module:

// Calls the 'addition' function from our module, passing 10 and 20. It prints 30.
calculator.addition(10, 20);

// Calls the 'subtraction' function from our module, passing 23 and 2. It prints 21.
calculator.subtraction(23, 2);

// Calls the 'multiplication' function from our module, passing 12 and 13. It prints 156.
calculator.multiplication(12, 13);

// Calls the 'division' function from our module, passing 10 and 2. It prints 5.
calculator.division(10, 2);