'use strict';

function show() {
  console.log(this); 
}
// show(); // 瀏覽器下輸出 window

function independentFunction() {
  this.value = 42; // TypeError: Cannot set property 'value' of undefined
  console.log(this); // undefined
}

// independentFunction();

const arrowFunction = () => {
  console.log(this); // 繼承自全域環境的 this
};
arrowFunction(); // 在非嚴格模式下，this 指向全域物件 window