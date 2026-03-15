// Built-in 'os' (Operating System) module in Node.js provides a 
// set of methods to interact with the underlying operating system.

// Require the 'os' module to start using it
const os = require('os');

// Prints the operating system CPU architecture (e.g., 'x64' for 64-bit, 'arm')
console.log(os.arch());

// Prints a string identifying the operating system platform (e.g., 'win32' for Windows)
console.log(os.platform());

// Prints an object containing details about the network interfaces (like IP addresses)
console.log(os.networkInterfaces());

// Prints an array containing information about each logical CPU core on the machine
console.log(os.cpus());

// Prints the amount of free system memory currently available in bytes
console.log(os.freemem());

// Prints the total amount of system memory (RAM) in bytes
console.log(os.totalmem());

// Prints the system uptime (how long the OS has been running) in seconds
console.log(os.uptime());

// Prints information about the currently logged-in user (username, home directory, etc.)
console.log(os.userInfo());