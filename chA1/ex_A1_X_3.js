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
    .then(result => secondTask(result))
    .then(result => thirdTask(result))
    .then(result => {
        console.log('Final result:', result);
    })
    .catch( error => {
        console.error('Final catch:', error);
    });