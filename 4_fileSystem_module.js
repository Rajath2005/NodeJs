// Built-in 'fs' (File System) module in Node.js provides methods to
// interact with the file system — read, write, append, delete, and more.

// Require the 'fs' module to start using it
const fs = require('fs');

// 1. fs.readFileSync()
// Reads the entire contents of a file SYNCHRONOUSLY (blocks execution until done).
// Returns a Buffer object by default; when concatenated with a string, it auto-converts to text.
let fileContent = fs.readFileSync('f2.txt');

// Print the contents we just read from 'f2.txt'
console.log("data of file 1--> " + fileContent);

// 2. fs.writeFileSync()
// Writes data to a file SYNCHRONOUSLY. If the file already exists, it OVERWRITES all existing content.
// If the file doesn't exist, it creates a new one.
fs.writeFileSync('f2.txt', "Writing content to f2 .....");

// Confirm that the write operation completed
console.log("f2 file has been written");

// 3. fs.appendFileSync()
// Appends (adds to the end of) data to an existing file SYNCHRONOUSLY.
// Unlike writeFileSync, this does NOT overwrite — it adds to what's already there.
fs.appendFileSync('f2.txt', "This is appended text");

// Confirm that the append operation completed
console.log("file has been appended");

// 4. fs.unlinkSync()
// Deletes (removes) a file from the file system SYNCHRONOUSLY.
// 'unlink' is the traditional Unix term for deleting a file.
fs.unlinkSync('f2.txt');

// Confirm that the file has been deleted
console.log("file has been deleted");