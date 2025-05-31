function firstTask() {
    return new Promise((resolve, reject) => {
        console.log('First task running...');
        resolve(1);
    });
}

function secondTask(input) {
    return new Promise((resolve, reject) => {
        console.log('Second task running...');
        reject(input + 1); // This will trigger the error handler in the next then
    });
}

function thirdTask(input) {
    return new Promise((resolve, reject) => {
        console.log('Third task running...');
        resolve(input + 1);
    });
}

firstTask()
    .then(result => {
        console.log('First task completed with result:', result);
        return secondTask(result)
    },
        error => {
            console.log(`Handle the error in the first task: ${error}`);
            // try to handle the error
            // error handle successfully. Return a new promise to continue the chain
            return Promise.resolve(error);
        })  // The anonymous function returns a promise
    .then(result => {
        console.log('Second task completed with result:', result);
        return thirdTask(result)
    },
        error => {
            console.log('Handle the error in the second task', error);
            //handle the error unsuccessfully
            return Promise.reject(error); // Uncomment to handle the error and continue
        })
    .then(result => {
        console.log('Third task completed with result:', result);
    }, error => {
        console.log('Handle the error in the third task: ', error);
        // If not handled, will go to .catch()
        return Promise.reject(error);
    })
    .catch(error => {
        console.error('Final catch:', error);
    });
