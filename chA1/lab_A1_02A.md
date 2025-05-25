# Lab 13-02A: Using Promise Object

In this lab, we will rewrite the code from Lab 13-01 using the Promise object.



## Rewritten Code Using Promise

### Step 1. Create a function that return a Promise object.

Add the codes to be executed in the executor function of the Promise object.

Change the Promise object's state by calling the `resolve` or `reject` function.
- Call the `resolve` function when the operation is successful.
- Call the `reject` function when the operation fails.

```javascript
function simulateAsyncOperation(message, delay, callback) {
    return new Promise((resolve, reject) => {
        // Simulate an asynchronous operation using setTimeout
        setTimeout(() => {
           console.log(message);
           callback();
           resolve("Operation completed successfully.");
        }, 1000);
    });
}
```

### Step 2. Run the first asynchronous operation

```javascript
simulateAsyncOperation()
    .then(result => {
        console.log(result);
    })
```

Run the code to see the output in the console.

### Step 3. Run the second asynchronous operation after the first one completes

Modify the code to include the second asynchronous operation:

```javascript
simulateAsyncOperation("Step 1", 1000, () => {})
    .then(result => {
        console.log(result);
        // execute the second asynchronous operation and return a new Promise object
        return simulateAsyncOperation("Step 2", 1000, () => {});
    })
    .then(result => {
        console.log(result);
    });
```

### Step 4. Run the third asynchronous operation after the second one completes

Add the third asynchronous operation inside the second callback:

```javascript
simulateAsyncOperation("Step 1", 1000, () => {})
    .then(result => {
        console.log(result);
        return simulateAsyncOperation("Step 2", 1000, () => {});
    })
    .then(result => {
        console.log(result);
        return simulateAsyncOperation("Step 3", 1000, () => {});
    })
    .then(result => {
        console.log(result);
    });
```

Congratulations! You have successfully rewritten the code using the Promise object.

Do you code become more readable and easier to understand?


