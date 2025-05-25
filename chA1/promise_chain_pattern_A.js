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

// Pattern A: Separate error handling for the promise chain
// Outputs:
//  First task completed
//  Second task completed
//  Error: 2
//  All tasks completed, final result: 3

firstTask()
    .then(result => secondTask(result), 
        error => {
            // error handling for the first task
            console.log('Error in second task');
        })  // The anonymous function returns a promise
    .then(result => thirdTask(result), 
             error => {
                        console.log('Error in second task:', error);
                        // return a resolved promise for the next then
                        return Promise.resolve(error + 1);
    })
    .then(result => {
        console.log('The last then. final result:', result);
    }, error =>{
        console.log('Error in third task');
    })
    .catch(error => {
        console.error('Final catch:', error);
    });
