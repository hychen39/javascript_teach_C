
# 第六章 函數 (函數)

## 本章主題

- 函數宣告、參數及回傳值
    - 具名函數、函數表達式、箭頭函數
- 函數中的變數範圍
- 巢狀函數與閉包 (closure)
- 回呼函數 (callback function)

## 1. 什麼是函數？

- 函數是**可重複使用的程式碼區塊**。
- 函數是**物件**
    - 可以作為參數傳遞給其他函數
    - 可以做為其它函數的回傳值
    - 可以指派給變數

**最佳實務做法** 不要重複自己
- 如果發現自己多次撰寫相同的代碼，考慮重構這些程式碼，提取成為函數
- 代碼將更具可讀性和可維護性。

## 2. 函數宣告

- 函數是一個物件。
- 透過函數宣告，建立一個函數物件。

- 有三種方式宣告函數：
    - `function` 敘述(statement)
    - `function` 表達式(expression)
    - 箭頭函數(Arrow function) (ES6)

### 使用函數敘述宣告函數

建立一個具兩個參數並回傳兩個參數相加結的函數。

使用 `function` 敘述

```javascript
function add(a, b) {
    return a + b;
}
```
語法結構:
- `function` 關鍵字
- 函數名稱
- 參數列表
    - 參數是函數的輸入值
    - 參數列表是用逗號分隔的參數名稱
    - 參數名稱是變數名稱
    - 變數的作用範圍是函數內部
- 函數主體 
  - 包含在 `{}` 中
  - 包含要執行的程式碼
  - return 敘述回傳函數的結果
    - 如果沒有 return 敘述，則預設回傳 `undefined`

### 函數表達式(expression) 宣告函數

使用 function 表達式來建立函數物件, 並將函數的參考賦值給變數。

```javascript
const add = function(a, b) {
    return a + b;
};
```

- 指派符號左側的表達式建一個函數物
- 變數 `add`儲存了函數物件的參考

--- 

- 此宣告方式和第一種方式的結果是一樣的。
- 這兩種方式都用來建立一個具名函數物件。
- 但兩者在函數提升(function hoisting)的行為上有所不同。

### 函數提升 (function hoisting)

- "函數提升" 功能方便開發者可先使用函數，然後再宣告它。
- JS Engine 在執行程式碼之前，會將所有函數宣告提升到作用域的最上方。

- 使用 `function` 敘述宣告的函數會被提升到作用域的最上方。

Example:

```js
let result = add(2, 3); 
console.log(result); // 5

function add(a, b) {
    return a + b;
}
```

### 使用 `function` 表達式宣告的函數沒有提升的行為

- 使用 `function` 表達式宣告的函數, JS Engine 不會將它提升到作用域的最上方。
- 必須在宣告之後才能使用函數

Example:

```js
let result = add(2, 3); // TypeError: add is not a function
var add = function(a, b) {
    return a + b;
};
```

錯誤訊息:
```
TypeError: add is not a function
```

### 箭頭函數 (ES6)

- 使用箭頭函數可替代 `function` 表達式
  - 提供更簡潔的語法

- 前述的 `add` 函數可以改寫:

```javascript
const add = (a, b) => {return a + b;};
```

- 如果函數中只有一個返回語句，可以省略大括號和 `return` 關鍵字。

```javascript
const add = (a, b) => a + b;
```

### Lab 6.1：撰寫一個函數，接受體重和身高並回傳 BMI值

- BMI 的公式是 `weight / (height**2)`。
- 使前前述的三種方式宣告函數。
- 如果 height 變數的值是: 未定義(undefined)、null 或非數字（false 值），將之預設為 0。

### 最佳實務做法: 撰寫函數註解

- 描述函數的目的
- 描述參數和回傳值
- 遵循 [JSDoc](https://github.com/jsdoc/jsdoc) 格式，以便使用工具自動產生 API 文件
- [How to use JSDoc - Basics & Introduction @ youtube 13:04](https://www.youtube.com/watch?v=Nqv6UkTROak)

---

使用 JSDoc 格式撰寫註解的範例:

```javascript
/**
 * 計算 BMI
 * @param {number} weight - 體重(kg)
 * @param {number} height - 身高(m)
 * @returns {number} - BMI值
 */
const calculateBMI = (weight, height) => {
  height = height || 0;
  return weight / (height ** 2);
};
```

## 3. 執行函數

### 執行函數的方法

- 宣告後，開發者呼叫函數。
- 開發者宣告後立即自我執行(IIFE 函數)
- 被其它函數呼叫 (Callback function)

### 開發者呼叫函數

- 開發者呼叫函數的名稱，並提供參數。
- 使用括號 `()` 包含參數列表。

Ex.

```javascript
// Call the function
const sum = add(1, 2);
console.log(sum); // 3
```

---

- 如果沒有提供括號，其意思不是呼叫函數，而是取用函數物件的參考。

```javascript
add = (x, y) => x + y;
console.log(add); // Prints the function object
```

輸出結果

```javascript
(x, y) => x + y
```

### 立即自我執行(IIFE 函數)

- 某些情境下我們需要 JS Engine 在函數宣告完後立即執行它。

典型情境:
- 當頁面加載時，自動為元素加入事件監聽器(Event Listener). 
- 使用 IIFE 避免函數內的區域變數污染全域命名空間
  - 函數內的變數成為私有變數
- 為函數/物件建立私有屬性。
- 將複雜的多個敘述包裝在一起變成單一運算式(expression)

可參考: [IIFEs in JavaScript — Use cases](https://medium.com/swlh/iifes-in-javascript-use-cases-92811495d936)

### 立即自我執行函數(IIFE)的特性

- 宣告後立即執行
  - 將宣告和執行合併在一起
- IIFE 函數內的變數是私有的, 外部無法存取
- IIFE 執行過後，就無法再次執行(因為它沒有名稱可以重覆呼叫)
  - 不可重覆呼叫

### IIFE 語法

```javascript
(function() {
  // code here
})(arguments);
```
- 第一個括號 `()` 宣告函數
- 第二個括號 `()` 執行函數並傳遞參數

---

也可改用 Arrow function 語法

```javascript
(() => {
  // code here
})(arguments);
```

---

Example: 定義一個函數，顯示兩個數字的總和並立即執行它。

```javascript
((a, b) => {
  console.log(a + b);
})(1, 2);
```

### 快速練習

使用 IIFE 宣告一個函數，將給與的字串反轉並顯示在 console 中。

例如: Hello -> olleH

<details>
<summary>參考答案</summary>

```javascript
((str) => {
  console.log(str.split('').reverse().join(''));
})('Hello');
```
</details>

### IIFE 的用應: 建立模組(Module)

- 使用 IIFE 將變數和函數包裝在一起，變成一個模組
- 模組內的成員皆是私有的，外部無法存取
- 你可以建立一個物件, 公開函數的參考給外部使用
  - 透過這個方式決定哪些成員是公開的，哪些是私有的
  - 成員包括: 變數、函數
- 這種設計模式稱為模組模式 (Module Pattern)


### 模組的使用情境

建立一個模組，包含兩個函數：
- `increment`: 將計數器增加 1, 並印出計數器的值
- `setStartValue`: 設定計數器的起始值。
- 計數器是模組的私有變數。

使用 IIFE 實作模組模式

```js
(function() {
    let counter = 0;

    function setStartValue(startValue) {
        counter = startValue;
    }
    function increment() {
        counter += 1;
        console.log(counter);
    }

    // Node.js 中的全域物件名稱為 global
    // 瀏覽器中的全域物件名稱為 window
    global.myModule = {
        // myModel 成為全域物件的一個特性，存放模組物件的參考
        increment: increment,
        setStartValue: setStartValue
    };
})();
```

---

測試模組:

```js
myModule.setStartValue(10);
myModule.increment()
myModule.increment();
myModule.increment();
```

Outputs:
```
11
12
13
```

### Lab 6.2：建立一個 「隨機描述輸入名字」的程式

建立一個模組，包含一個隨機形容輸入名字的函數。
- 模組內有一個私有的對於名字的形容詞陣列, 例如 `['聰明', '有趣', '善良', '勤奮']`
- 函數接受一個名字作為參數。
    - 從形容詞陣列中隨機選取一個值，用來形容名字。
    - 回傳一個 "形容詞＋名字" 的字串。

例如，描形容詞陣列為 `['聰明', '有趣', '善良', '勤奮']`。給定名字 `Alice`，程式可能會輸出 `Alice，你很聰明`。

提示：
- `Math.random()` 回傳一個介於 0 和 1 之間的隨機數。
- `Math.floor()` 回傳小於或等於給定數字的最大整數。

## 函數的參數(parameter)及引數(argument)

- "參數" 和 "引數" 是兩個不同的概念
- "參數" 是宣告函數時所給定的變數名稱，指定函數的輸入
- "引數" 是呼叫函數時所傳遞的值

```javascript   
const add = (a, b) => a + b;
const sum = add(1, 2);
```

- 變數 a, b 是函數的參數(變數)
- 1, 2 是函數的引數, 呼叫時傳入的值。

### 參數與引數的對應

JS 中提供多種傳入引數到函數的方式

1. 彈性引數個數: 引數個數可以少於與多於參數個數
2. 選項參數(預設參數的值)
3. 不定長度的參數(indefinite list of parameters)
4. 剩餘的參數(rest of parameters)

### 彈性引數個數

- 引數個數可以少於與多於參數個數
- JS 使用位置對應的方式指派引數到參數

```javascript   
const add = (a, b) => a + b;
const sum = add(1, 2);
```

此時 a=1, b=2.

---

- 當引數個數少於參數個數時, 沒有對應到的參數值被設為 `undefined`

```javascript
const add = (a, b) => a + b;
const sum = add(1); // 1 + undefined = NaN
```

a=1, b=undefined

---

- 當引數個數超過參數個數時, 多的引數被捨棄

```javascript
const add = (a, b) => a + b;
const sum = add(1, 1, 4); // 1 + 1 = 2
```

第 3 個引數 `4` 被捨棄

### 選項參數(預設參數的值)

- 很多時候在呼叫函數時，希望能夠只傳入必要的引數值, 其它的參數則使用預設值
  - 簡化函數的呼叫
- JS 讓開發者在宣告函數時，指定參數的預設值。

```javascript
function greet(name = 'Alice') {
  return `Hello, ${name}`;
}
console.log(greet()); // Hello, Alice
console.log(greet('Bob')); // Hello, Bob
```

- `name` 參數的預設值為 `Alice`

### Quick Practice

檢視底下的 randomWord 函數, `descWords` 是一個描述名字的形容詞清單。
請為 desWords 設定預設值

```js
function randomWord(name, descWords) {
    // scale the random number to the length of the array and round down to the nearest whole number
    let randomIndex = Math.floor(Math.random() * descWords.length);
    return `${name}, you are ${words[randomIndex]}.`;
}
```
