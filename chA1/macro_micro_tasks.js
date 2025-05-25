fetch('https://www.google.com')
  .then(function a() {
    // macrotask (or task): timers or I/O tasks belong to the macrotask
    // macrotasks are executed after the microtask queue is empty
    console.log("a");
  });

Promise.resolve()
  .then(function b() {
    // microtask: non-timers or non-I/O tasks belong to the microtask
    // microtasks gets higher priority than macrotasks. 
    console.log("b");
  });

Promise.reject()
  .catch(function c() {
    console.log("c");
  });

  console.log('d');

  // Outputs: d, b, c, a