
// A async function always returns a promise.

// use the async function expression to define an async function

let myAsyncFunction = async function(){
    // return a string value
    return 'Hello World';
}

// call the async function

myAsyncFunction()
    .then(result => console.log('The result is', result))

console.log('End of script');