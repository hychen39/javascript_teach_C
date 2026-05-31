# 第7章 類別、原型與繼承: Part 3 神秘的 this

## 本章重點

- 理解 `this` 的核心角色：`this` 用來表示目前方法執行時的上下文物件
- 掌握物件方法中的 `this`：呼叫物件方法時，`this` 指向呼叫該方法的物件實例
- 分辨建構子與實例方法中的 `this`：建構子中的 `this` 指向正在建立的實例，方法中的 `this` 指向呼叫方法的實例
- 認識獨立函數的 `this` 行為：嚴格模式下為 `undefined`，非嚴格模式下可能指向全域物件
- 理解方法被抽離後的 `this` 遺失問題：將實例方法指派給變數後呼叫，可能使方法變成獨立函數
- 掌握箭頭函式的 `this`：箭頭函式沒有自己的 `this`，會繼承定義位置外層作用域的 `this`
- 能處理 callback 中的 `this` 遺失：例如使用箭頭函式或 closure 保存正確的上下文物件

## 神秘的 `this` 關鍵字

### 物件的 this

Q: 實例的屬性資料分開存放，但是方法是共享的。那麼在實例中執行方法時，該方法如何知道要操作哪個實例的屬性資料？

執行方法時，需要知道「方法的執行對象」，以便在方法內部能夠正確地存取該對象的屬性資料。

在 JavaScript 中，方法內部使用 `this` 關鍵字來指代「方法的執行對象」或者稱為 「上下文物件」（Context Object）. 
- this 的值在是由 JS 引擎在執行方法時動態決定的

考慮以下的 `Motorcycle` 類別：

```javascript
class Motorcycle extends Vehicle {
  constructor(color, currentSpeed, maxSpeed, fuel) {
    super(color, currentSpeed, maxSpeed);
    this.fuel = fuel;
  }
  doWheelie() {
    console.log("單輪行駛，速度:", this.currentSpeed, "km/h");
  }
}

let motor1 = new Motorcycle("紅色", 5, 200, "汽油");
let motor2 = new Motorcycle("藍色", 10, 200, "電動");

motor1.doWheelie(); // 單輪行駛，速度: 5 km/h
motor2.doWheelie(); // 單輪行駛，速度: 10 km/h
```

在建構子中的 `this` 和 在 `doWheelie()` 方法中的 `this` 有什麼差別？

- 在建構子中的 `this` 指的是正在被建立的實例，當我們呼叫 `new Motorcycle(...)` 時，`this` 就指向該新建立的實例。
- 在 `doWheelie()` 方法中的 `this` 指的是呼叫該方法的實例，當我們呼叫 `motor1.doWheelie()` 時，`this` 就指向 `motor1` 實例；當我們呼叫 `motor2.doWheelie()` 時，`this` 就指向 `motor2` 實例。

所以，在 物件使用的情境下，決定 `this` 所指向的上下文物件(Context Object) 的規則:

1. 呼叫物件的方法時: `this` 表示呼叫該方法的物件實例。
2. 在建構子中: `this` 表示正在被建立的物件實例。

### 獨立函數 this

Q: 獨立函數有 `this` 嗎？

使用 `function` 關鍵字定義的都是屬於獨立函數, 包括:
- function statement (函式宣告)
- function expression (函式表達式)

範例: 函數宣告及函數表達式都是獨立函數：

```javascript
function fun1() {
  console.log(this);
}

const fun2 = function() {
  console.log(this);
};
```


#### 嚴格模式下 this 的值為 undefined

獨立函數在嚴格模式下是沒有 `this`, `this` 的值為 `undefined`。

因為希望維持「不變性操作」的特性，獨立函數不應該依賴外部的上下文物件(Context Object)，也不應該修改外部的資料，因此獨立函數的 `this` 是 `undefined`。

範例: 在嚴格模式下嘗試使用 `this` 的獨立函數：

```javascript
"use strict";
function independentFunction() {
  this.value = 42; // TypeError: Cannot set property 'value' of undefined
  console.log(this); // undefined
}
```

#### 非嚴格模式下 this 的值為全域物件 (Global Object)

但，在早期的 JavaScript 中，若使用 非嚴格模式，獨立函數的 `this` 會指向全域物件 (Global Object)，在瀏覽器中就是 `window` 物件。

在非嚴格模式下，JavaScript 會將獨立函數的 `this` 自動綁定到全域物件，這樣獨立函數就可以存取全域物件的屬性和方法。
- 此做法方便了函數與全域物件的互動，但也可能導致意外的副作用，因為函數可能會不小心修改全域物件的屬性。

範例: 在非嚴格模式下獨立函數的 `this` 指向全域物件：

```javascript
function independentFunction() {
  this.value = 42; // 在非嚴格模式下，this 指向全域物件 window
}
independentFunction();
console.log(globalThis.value); // 42
```

上述函數在執行過程中，將 `value` 屬性新增到全域物件 `window` 上
- 執行過程改變了全域物件的狀態，產生副作用。

#### 不純的獨立函數的風險

Clean Code 觀點
- 上述的寫法違反「不變性」：函式在沒有明確傳入引數的情況下，修改了外部全域狀態，這打破了狀態的不可變性。
- 使得:
  - 產生極難追蹤的「幽靈 Bug」（隱蔽的副作用）: 因為函式修改了全域物件的狀態，其他部分的程式碼可能會不小心依賴或修改這個全域狀態，導致難以預測的行為。
  - 程式碼失去「可預測性」，測試變得極其困難: 相同輸入可能得到不同的輸出，因為函式的行為依賴於外部狀態。


#### 呼叫實體方法時的陷阱

使用變數指向實體方法時，若用該變數呼叫方法，該實體方法變成獨立函數，`this` 的值就會變成 `undefined` (嚴格模式) 或全域物件 (非嚴格模式)，導致方法內部無法正確存取實體的屬性資料。

範例: 呼叫實體方法時的陷阱

```javascript
class Vehicle {
  constructor(color, currentSpeed, maxSpeed) {
    this.color = color;
    this.currentSpeed = currentSpeed;
    this.maxSpeed = maxSpeed;
  }

  move() {
    console.log("移動中，速度:", this.currentSpeed, "km/h");
  }
}

const vehicle = new Vehicle("紅色", 20, 200);
vehicle.move(); // 移動中，速度: 20 km/h

const moveFunction = vehicle.move; // 將實體方法指派給變數
moveFunction(); // TypeError: Cannot read property 'currentSpeed' of undefined (嚴格模式)
```

### 箭頭函式的 this

箭頭函式繼承 1)在外層第一層「普通函式」或 2)全域環境中繼承而來
- 不是由呼叫方式決定 `this` 的值，而是由定義位置決定 `this` 的值。

因此，箭頭函式的 `this` 是在定義時就已經確定的，而不是在呼叫時決定的。

範例: 箭頭函式的 `this` 繼承自外層函式

```javascript
function outerFunction() {
  const arrowFunction = () => {
    console.log(this); // 繼承自 outerFunction 的 this
  };
  arrowFunction();
}   
outerFunction(); // 在非嚴格模式下，this 指向全域物件 window
```

`outerFunction` 是一個普通函式，在非嚴格模式下，`this` 指向全域物件 `window`。因此，`arrowFunction` 繼承了 `outerFunction` 的 `this`，所以當我們呼叫 `outerFunction()` 時，`arrowFunction` 內部的 `this` 也指向全域物件 `window`。

範例: 在物件方法中使用箭頭函式

```javascript
const obj = {
  name: "物件",
  method: function() {
    const arrowFunction = () => {
      console.log(this.name); // 繼承自 method 的 this
    };
    arrowFunction();
  }
};
obj.method(); // 輸出: 物件
```

在上述範例中，`method` 是 `obj` 物件的方法，當我們呼叫 `obj.method()` 時，`this` 指向 `obj` 物件。因此，`arrowFunction` 繼承了 `method` 的 `this`，所以當我們呼叫 `obj.method()` 時，`arrowFunction` 內部的 `this.name` 也指向 `obj.name`，輸出結果為 "物件"。

範例: 在全域環境中使用箭頭函式

```javascript
const arrowFunction = () => {
  console.log(this); // 繼承自全域環境的 this
};
arrowFunction(); // 在非嚴格模式下，this 指向全域物件 window
```

## 傳統普通函式的悲劇（this 遺失）

在傳統的 JavaScript 中，setTimeout 是一個非常有名的 「this 遺失」(this loss) 的例子。

在 setTimeout 的回呼函式中使用獨立函式並且嘗試存取 this 時，會有意想不到的行為。
- 傳統函式的 this 太容易受到「運行環境（宿主環境）」的干擾。
- this 不是指向預期的物件
  - 在瀏覽器、Node.js 中傳統函式的 this 都可能被暗中偷換成不同的物件（如 window、global 或 Timeout），導致行為不可預測。
- this 的內容由運行環境決定，而不是由呼叫者決定。 

考慮以下的範例，一個物件有一個方法，該方法使用 setTimeout，在 1 秒後增加計數器屬性的值：

```js
'use strict';
const counter = {
  count: 0,
  start() {
    setTimeout(function() {
      // 這裡使用的是傳統普通函式
      this.count++;      // 錯誤！全域物件沒有 count 屬性，畫面會顯示 NaN
      console.log(this);
      console.log(this.count); // NaN 
    }, 1000);
  }
};

counter.start();
```

上在例中，`this` 是指向誰呢？

執行的結果為 `NaN`，而不是預期的 `1`。

Node 執行的輸出結果，顯示 `this` 指向 `Timeout` 物件，而不是 `globalThis` 物件。

因為 Node 執行 `setTimeout` 時，會強迫將 `this` 綁定到 `Timeout` 物件上，而不是 `globalThis` 物件。

所以 `this.count++;` 是在 `Timeout` 物件對 `count` 屬性進行遞增操作，但 `Timeout` 物件沒有 `count` 屬性，因此 `this.count` 的值為 `undefined`，進而導致 `this.count++` 的結果是 `NaN`。

在瀏覽器中執行，`this` 指向 `window` 物件，但 `window` 物件沒有 `count` 屬性，因此 `this.count` 的值為 `undefined`，進而導致 `this.count++` 的結果是 `NaN`。


### 解決 this 遺失的問題

#### 解法1: 使用箭頭函式

改用箭頭函式做為 setTimeout 的回呼函式，這樣就能繼承外層函式的 `this`，避免 `this` 遺失的問題。

```javascript
const counter = {
  count: 0,
  start() {
    // start() 方法的 this 指向 counter 物件
    setTimeout(() => {
      // 這裡使用的是箭頭函式
      this.count++; // 正確！this 繼承自 start 方法的 this，指向 counter 物件
      console.log(this);
      console.log(this.count); // 1
    }, 1000);
  }
};
```

#### 解法2: 使用 closure 儲存 this 的值

在 setTimeout 的回呼函式外層，使用一個變數來儲存 `this` 的值，然後在回呼函式內部使用該變數來存取 `this`。

```javascript
const counter = {
  count: 0,
  start() {
    const self = this; // 儲存 this 的值
    setTimeout(function() {
      self.count++; // 使用 self 來存取 this 的值
      console.log(self);
      console.log(self.count); // 1
    }, 1000);
  }
};

counter.start();
```

## 本章內容回顧

- 物件方法中的 `this`
  - 實例方法是共享的，但每個實例的屬性資料不同
  - 方法執行時需要知道目前要操作哪個實例
  - `this` 代表方法執行時的上下文物件，也就是呼叫該方法的物件

- 建構子與方法中的 `this`
  - 在建構子中，`this` 指向正在被建立的新實例
  - 在實例方法中，`this` 指向呼叫該方法的實例
  - `motor1.doWheelie()` 與 `motor2.doWheelie()` 呼叫同一個方法，但 `this` 會分別指向不同實例

- 獨立函數中的 `this`
  - 使用 `function` 關鍵字定義的函數，若不是透過物件方法呼叫，就可視為獨立函數
  - 嚴格模式下，獨立函數中的 `this` 是 `undefined`
  - 非嚴格模式下，獨立函數中的 `this` 可能指向全域物件
  - 依賴全域物件的 `this` 容易造成副作用，降低程式可預測性與可測試性

- 實例方法的 `this` 遺失
  - 當實例方法被取出並指派給變數後，再用該變數呼叫，方法可能失去原本的執行對象
  - 在嚴格模式下，這類呼叫可能讓 `this` 變成 `undefined`
  - 方法內部若繼續使用 `this.currentSpeed` 等屬性，就會發生錯誤

- 箭頭函式中的 `this`
  - 箭頭函式沒有自己的 `this`
  - 箭頭函式的 `this` 由定義位置決定，而不是由呼叫方式決定
  - 在物件方法中定義箭頭函式時，箭頭函式可繼承外層方法的 `this`

- `setTimeout` 與 callback 的 `this` 問題
  - 傳統函式作為 `setTimeout` callback 時，`this` 可能被執行環境改成非預期的物件
  - 在 Node.js 中，`setTimeout` callback 的傳統函式可能指向 `Timeout` 物件
  - 在瀏覽器中，非嚴格模式下可能指向 `window`
  - 若這些物件沒有預期的屬性，會造成 `NaN` 或其他錯誤結果

- 解決 `this` 遺失
  - 使用箭頭函式作為 callback，可繼承外層方法的 `this`
  - 使用 closure 將 `this` 存入 `self` 等變數，也可以讓 callback 存取正確物件
  - 選擇解法時，應看程式是否需要保留外層方法的上下文物件

## 複習問題

1. 為什麼實例方法執行時需要 `this`？它解決了什麼問題？

2. 在 `new Motorcycle(...)` 的建構子中，`this` 指向誰？在 `motor1.doWheelie()` 中，`this` 又指向誰？

3. `motor1.doWheelie()` 和 `motor2.doWheelie()` 使用的是共享方法，為什麼可以分別讀到不同實例的屬性？

4. 什麼是獨立函數？嚴格模式下獨立函數中的 `this` 是什麼？

5. 非嚴格模式下，獨立函數的 `this` 指向全域物件時，可能造成哪些副作用？

6. 為什麼 `const moveFunction = vehicle.move; moveFunction();` 可能造成 `this` 遺失？

7. 箭頭函式的 `this` 和傳統函式的 `this` 最大差異是什麼？

8. 在物件方法中定義箭頭函式時，箭頭函式如何取得外層方法的 `this`？

9. 為什麼傳統函式作為 `setTimeout` callback 時，`this.count++` 可能得到 `NaN`？

10. 使用箭頭函式與使用 closure 保存 `this`，各自如何解決 callback 中的 `this` 遺失問題？
