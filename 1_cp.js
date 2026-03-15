// Built-in 'child_process' module in Node.js allows us to execute 
// system commands or other scripts right from our JavaScript code.

// Require the 'child_process' module and store it in the constant 'cp'
const cp = require('child_process');

// The line below is commented out. If uncommented, it uses the 'execSync' method 
// to open a new tab in the Chrome browser with the specified URL.
// cp.execSync('start chrome https://rajathkiran.netlify.app/')

// We use 'execSync' to run another Node.js script ('node test.js') synchronously.
// It waits for 'test.js' to finish, captures its output, and prints it here.
console.log('output ' + cp.execSync('node test.js'));