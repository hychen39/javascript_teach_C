const counter = {
  count: 0,
  start() {
    setTimeout(function() {
      // 這裡使用的是傳統普通函式
      'use strict';
      this.count++;   
      console.log(this);
      console.log(this.count); // NaN 
    }, 1000);
  }
};

counter.start();



const counter2 = {
  count: 0,
  start() {
    // start() 方法的 this 指向 counter 物件
    setTimeout(() => {
      console.log('---');
      // 這裡使用的是箭頭函式
      this.count++; // 正確！this 繼承自 start 方法的 this，指向 counter 物件
      console.log(this);
      console.log(this.count); // 1
    }, 1000);
  }
};

counter2.start();


const counter3 = {
  count: 0,
  start() {
    const self = this; // 儲存 this 的值
    setTimeout(function() {
      console.log('---');
      self.count++; // 使用 self 來存取 this 的值
      console.log(self);
      console.log(self.count); // 1
    }, 1000);
  }
};

counter3.start();