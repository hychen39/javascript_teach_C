function firstTask() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('First task: resolved.');
            resolve(1);
        }, 1000);
    });
}

function secondTask(result) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Second task: rejected');
            reject(result + 1); // reject the promise
        }, 1000);
    });
}

function thirdTask(result) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Third task completed');
            resolve(result + 1);
        }, 1000);
    });
}


// Pattern B: Single error handling for the promise chain
// Outputs:
//  First task completed
//  Second task completed
//  Final catch: 2

firstTask()
    .then(result => secondTask(result))
    .then(result => thirdTask(result))
    .then(result => {
        console.log('The last then. final result:', result);
    })
    .catch( error => {
        console.error('Final catch:', error);
    });
