// Use the Promise to rewrite the code in Example 13-3

function startTimeouts(msg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(msg);
            // resolve with a message
            resolve();
        },  1000);
    });
}

// Call the function
startTimeouts('First timeout')
    .then(() => startTimeouts('Second timeout'))
    .then(() => startTimeouts('Third timeout')) // execute and return a promise object
    .then(() => startTimeouts('Fourth timeout'))
    .catch(error => console.error('An error occurred:', error));

console.log('Timers are on their way...');