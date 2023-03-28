exports.errorLog  = (err) => {console.log("Uncaught Exception. Shutting Down");
console.log("------------------------------ERROR--------------------------------");
console.log("Error Name: " + err.name);
console.log("Error Message: " + err.message);
console.log("Error Reason: " + err.reason);
console.log("---------------------------ERROR STACK-----------------------------");
console.log("Error Stack:" + err.stack);
}; 