# Lab: Understanding Callback Hell in JavaScript

## Objective:
In this lab, you will learn about callback hell, a common issue in asynchronous JavaScript programming. You will experience how nested callbacks can make code hard to read and maintain

## Scenario

You must control several asynchronous operations in a specific order. 

There are three asynchronous operations that need to be executed in sequence:
1. Display "Step 1" after a delay of 1 second.
2. Then, display "Step 2"  after the "Step 1" message with a delay of 1 second.
3. Finally, display "Step 3" after the "Step 2" message with a delay of 1 second.

## Instructions:

Create a new JavaScript file named lab_callback_hell.js.

### Step 1: Create the a function to simulate asynchronous operations

```js
function simulateAsyncOperation(message, delay, callback) {
    setTimeout(() => {
        console.log(message);
        callback();
    }, delay);
}
```

### Explanation:
- The simulateAsyncOperation function simulates an asynchronous operation using setTimeout. 

- It takes a message to display, a delay in milliseconds, and a callback function to execute after the delay.

### Step 2: Run the first asynchronous operation

```js
simulateAsyncOperation("Step 1", 1000, ()=>{});
```

Run the code to see the output in the console.

You should see the message "Step 1" displayed after a delay of 1 second.

### Step 3: Run the second asynchronous operation after the first one completes

Modify the anonymous function passed to the first simulateAsyncOperation call to include the second asynchronous operation:

```js
simulateAsyncOperation("Step 1", 1000, () => {
    simulateAsyncOperation("Step 2", 1000, () => {});
});
```

Run the code to see the output in the console.

You should see the messages "Step 1" and "Step 2" displayed in sequence after delays of 1 second each.

### Step 4: Run the third asynchronous operation after the second one completes

Add the third asynchronous operation inside the second callback:

```js
simulateAsyncOperation("Step 1", 1000, () => {
    simulateAsyncOperation("Step 2", 1000, () => {
        simulateAsyncOperation("Step 3", 1000, () => {});
    });
});
```

Run the code to see the output in the console.

You should see the messages "Step 1", "Step 2", and "Step 3" displayed in sequence after delays of 1 second each.


Congratulations! You have successfully completed this lab. You have experienced callback hell when controlling asynchronous operations in sequence using nested callbacks. 

This approach can make the code hard to read and maintain. In the next lab, you will learn about promises, a better way to handle asynchronous operations in JavaScript.