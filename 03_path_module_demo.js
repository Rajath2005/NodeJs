// Built-in 'path' module in Node.js provides utilities for working with 
// file and directory paths. It is extremely useful when combining path names.

// Require the 'path' module to start using it
const path = require('path');


// 1. path.extname()
// Gets the extension of the file from a given path (e.g., '.txt', '.js').
let ext = path.extname('D:\\Creative\\Scaler-Nodejs\\sample_text_file.txt');

// 2. path.basename()
// Gets the actual name of the file from a given path (e.g., 'sample_text_file.txt').
let basename = path.basename('D:\\Creative\\Scaler-Nodejs\\sample_text_file.txt');

// Print the extracted file extension
console.log(ext);

// Print the extracted file basename
console.log(basename);

// 3. __filename
// A built-in Node.js variable that holds the absolute path of the current file being executed.
console.log(__filename);

// 4. __dirname
// A built-in Node.js variable that holds the absolute path of the directory containing the current file.
console.log(__dirname);