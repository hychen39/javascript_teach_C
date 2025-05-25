

// A function that returns a promise
// We don't qualify the function with async keyword because it explicitly returns a promise
/**
 *  This function is a long running task that takes a while to complete.
 * @returns 
 */
function longtimeTask() {
  console.log('== Enter the long task');
  let i = 0;
  // Note: This loop will block the JS thread for a while because JS Engine is single-threaded.
  while (i < 1e3) {
    i++;
  }
  console.log('== Exit the long task');
  // Return a random number between 0 and 100
  return Math.random() * 100;
}

function async_longtimeTask(){
    return new Promise((resolve, reject) => {
        const result = longtimeTask();
        if (result) {
            resolve(result); // fulfilled 
        } else {
            reject('Error occurred during the long task');
        }
    });
}
// call the longtimeTask function
console.log('Start the long running task');
// Use an Immediate Invoke Function Expression (IIFE) to call the function returning a promise
(async () => {
    let result = await async_longtimeTask();
    console.log('The result is: ', result);
})()
console.log('Please wait for the long running task to complete...');    
