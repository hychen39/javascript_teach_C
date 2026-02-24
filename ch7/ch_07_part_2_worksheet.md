---
export_on_save:
    html: true
---


# Chapter 7 Part 2: 回顧

回答以下問題，寫在下方的空白處，請清楚標示題號。
當日課程結束後請繳回。

Q1. 假設 老鷹類別(Eagle class) 繼承了 鳥類類別 (Bird class), 當使用 Eagle 類別的建構子建立老鷹物件時，建構的程序是什麼？

Q2. 在 JavaScript 中什麼是 Prototype？ 如何知道一個物件的 prototype 是什麼？

Q3. 有一個物件如下:

```javascript
const bird = {
  name: 'bird',
  fly: function() {
    console.log('I can fly');
  }
};
```

bird 物件的 prototype 是什麼？如何知道？
Hint: 可輸入上述物件到 console 中，並查看物件的內容。

Q4. 有一 Bird 類別, 並建立了兩個物件 bird1 和 bird2. 

```js
class Bird {
  constructor(name) {
    this.name = name;
  }
  fly() {
   ...
  }
}

const bird1 = new Bird('bird1');
const bird2 = new Bird('bird2');
```

在 bird1 中加入新方法 sing()

```js
bird1.sing = function() {
  console.log('I can sing');
}
```
bird2 物件會有 sing() 方法嗎？為什麼？

畫出 bird1 和 bird2 的 prototype chain 用來解釋這個問題。


Q5.有以下的類別及物件:

```js
class Bird {
  constructor(name) {
    this.name = name;
  }

  fly() {
    console.log(`Bird is flying`);
  }
}

class Eagle extends Bird {
  fly() {
    console.log(`Eagle is flying`);
  }
}


```

建立了以下物件, 及覆寫 fly() 方法:

```js
Bird.prototype.sing = function() {
  console.log('I can sing');
}
const eagle1 = new Eagle('Eagle');
eagle1.fly = function() {
  console.log('eagle1 is flying');
}
```

```js
const eagle2 = new Eagle('Eagle2');

```

寫出以下的程式輸出:

```js
eagle1.fly(); 
eagle1.sing(); 
eagle2.fly();
eagle2.sing(); 
```

畫出 eagle1 和 eagle2 的 prototype chain 說明程式的執行過程。要在 prototype chain 中標示出物件的方法。

