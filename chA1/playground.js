// Write a function that log msg every second in sequence for 3 times
// Use the setTime() function to achieve this
// Use https://www.jsv9000.app/ to reveal how JS Engine handle the async code of callbacks

// function startTimeouts() {
//     setTimeout(// callback
//         function a() {
//             // One second has passed
//             console.log('First timeout');
//             // call the second timeout
//             setTimeout(// callback 
//                 function b() {
//                     // another second has passed
//                     console.log('Second timeout');
//                     // call the third timeout
//                     setTimeout(//callback
//                         function c() {
//                             // another second has passed
//                             console.log('Third timeout');
//                             console.log('All timeouts are done');
//                         }
//                     ); // end of the third setTimeout
//                 }); // end of the second setTimeout
//         }); // end of the first setTimeout
//     console.log('Complete the startTimeouts function');
// }

// startTimeouts();

// Rewrite the above code using Promise 
// Use https://www.jsv9000.app/ to reveal how JS Engine handle the async code of callbacks

// function startTimeoutsPromise(msg){
//     // return a promise
//     return new Promise(
//         // the executor function with injected resolve and reject functions
//         function executor(resolve, reject){
//             // your task here
//             setTimeout(function cb(){
    
//                 console.log(`${msg} Timeout `);
//                 // resolve the promise
//                 resolve();
//             }, 1000);
//         }
//     );
// }

// // run the StartTimeoutsPromise function
// startTimeoutsPromise("first")
// .then(function mt1() {return startTimeoutsPromise("second" )})  // don't forget to return the promise
// .then(function mt2() {return startTimeoutsPromise("third" )})  
// .then(function mt3() {console.log('All done!!')}); 

// Example 13-5 use the fetch API to get the data from the server (MacroTask)
url = 'https://jsonplaceholder.typicode.com/posts/1';

fetch(url)
    .then((response)=>{
        // Resolve with the response object
        console.log('Data is fetched');
        if (response.ok){
            // if the response is ok. Get the response body
            return response.text(); // return a promise of resolving the response body
        }
    })
    .then((data)=>{
        console.log(data.substring(0, 100));
    })
    .catch((error)=>{
        console.log('Error occurred');
    });