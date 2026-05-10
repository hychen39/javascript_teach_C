
# 第六章 函數

## 本章重點

- 理解函數的基本角色：函數是可重複使用的程式碼區塊，也是可以被指派、傳遞與回傳的物件
- 掌握函數的主要宣告方式與使用情境：`function` 敘述、函數表達式、箭頭函數，以及它們在 hoisting 與可讀性上的差異
- 理解函數呼叫與資料傳入方式：函數物件與執行結果的差異、參數與引數、參數預設值、剩餘參數
- 認識函數的進階使用模式：IIFE、callback function、高階函數，以及用函數管理可重複使用的邏輯

## 什麼是函數？

- 函數是**可重複使用的程式碼區塊**。
- 函數是**物件**
    - 可以作為參數傳遞給其他函數
    - 可以做為其它函數的回傳值
    - 可以指派給變數

**最佳實務做法** 不要重複自己 (DRY: Don't Repeat Yourself 原則)
- 如果發現自己多次撰寫相同的代碼，考慮重構這些程式碼，提取成為函數
- 代碼將更具可讀性和可維護性。


## 函數宣告

有三種方式宣告函數：
- `function` 敘述(statement)
- `function` 表達式(expression)
- 箭頭函數(Arrow function) (ES6)

### 函數敘述 (Function Statement)

- 使用時機：全域或模組主要的函數： 當你希望在程式碼的任何地方（甚至在宣告之前）都能呼叫該函數時
- 特性: 邏輯清晰, 適合用於定義程式碼結構中的主要功能塊。

Example：建立計算兩數和的函數：

```javascript
function add(a, b) {
    return a + b;
}
```

語法結構:
- `function` 關鍵字
- 函數名稱
- 參數列表
    - 參數用來接受傳入函數的引數，參數間用逗號分隔
    - 參數名稱 a, b 視為函數內的區域變數
    - 區域變數的作用範圍是函數內部
- 函數主體 
  - 在 `{}` 中，放執行程式碼
  - return 敘述回傳函數的結果
    - 如果沒有 return 敘述，則預設回傳 `undefined`


### 函數表達式(expression) 宣告函數

使用時機:
- 將函數作為「值」指派給變數或傳遞(函數)給其他函數時

特性:
- 不會被提升 (hoisted)，只能在宣告之後使用

目的:
- 這能強迫開發者遵守「先宣告、後使用」的邏輯，避免在程式碼結構混亂時意外呼叫到尚未準備好的邏輯。

#### 簡單的函數物件指派

Example：將函數作為「值」指派給變數

```javascript
const add = function(a, b) {
    return a + b;
};

console.log(add(2, 3)); // 5
```

在這個例子中，`function(a, b) { ... }` 運算式建立了一個函數物件，並把這個函數物件指派給變數 `add`。
意圖: 必須先宣告 `add` 變數，才能使用 `add(2, 3)` 呼叫該函數。

#### 回傳函數物件

函數物件被當成回傳值回傳。

Example：回傳一個函數物件

情境：電子商務網站根據不同會員等級，建立不同的折扣計算函數。

```javascript
function createDiscountCalculator(memberLevel) {
    if (memberLevel === "vip") {
        // return a function object
        // 使用 function expression 宣告一個函數物件
        return function(price) {
            return price * 0.8;
        };
    }

    if (memberLevel === "gold") {
        return function(price) {
            return price * 0.9;
        };
    }
    // function expression
    return function(price) {
        return price;
    };
}

const vipDiscount = createDiscountCalculator("vip");
const finalPrice = vipDiscount(1000);

console.log(finalPrice); // 800
```

在這個例子中，`createDiscountCalculator("vip")` 的回傳值不是數字，而是一個函數物件。

```javascript
const vipDiscount = createDiscountCalculator("vip");
```

這行程式碼會把回傳的函數物件存入 `vipDiscount` 變數。之後就可以呼叫：

```javascript
vipDiscount(1000);
```

意圖：先根據會員等級建立適合的「折扣函數」，之後只要把商品價格傳入該函數，就能計算折扣後價格。


#### 函數表達式沒有提升的行為

使用函數表達式宣告的函數, JS Engine 不會將它提升到作用域的最上方。
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

在這個例子中，`add` 變數在宣告之前被使用了，導致錯誤。因為 `add` 是使用函數表達式宣告的，所以它不會被提升，必須先宣告 `add` 變數，才能使用 `add(2, 3)` 呼叫該函數。


### 箭頭函數 (Arrow Function)

使用時機:
- 簡化函數宣告或表達式，特別是當函數邏輯簡單時
- 常用於回呼函數 (callback) 或匿名函數
- 單行函數邏輯，適合使用箭頭函數來簡化程式碼

重要特性:
> 沒有自己的 `this`
> 繼承宣告它的作用域中的 `this` 值
> 細節在後續章節說明

使用限制:
> 不適合用於物件方法(object methods)或建構函數(constructor function), 因為它們需要自己的 `this`。

原來的 function 表達式:

```javascript
const add = function(a, b) {
    return a + b;
};
```

改成 箭頭函數:

```javascript
const add = (a, b) => {
    return a + b;
};
```

若只有一行程式碼，且該行程式碼是回傳值，可以省略大括號和 return 關鍵字:

```javascript
const add = (a, b) => a + b;
```

若只有一個參數，可以省略括號:

```javascript
const square = x => x * x;
```

箭頭函數語法規則:
- 參數列表在箭頭 `=>` 的左邊
- 函數主體在箭頭 `=>` 的右邊
- 函數主體規則:
    - 如果函數主體只有一行程式碼，且該行程式碼是回傳值，可以省略大括號和 return 關鍵字
    - 如果函數主體有多行程式碼，必須使用大括號包裹
- 參數列表規則:
    - 如果函數沒有參數，必須使用空括號 `()` 來表示參數列表
    - 如果函數有一個參數，可以省略括號
    - 如果函數有多個參數，必須使用括號 `()` 包裹參數列表，並用逗號分隔參數


#### 於 map 函數中使用箭頭函數

Example: 使用箭頭函數簡化 map 函數的回呼函數

電子商務網站有一個產品清單，想要取得所有產品的價格。

```javascript
const products = [
    { name: "Laptop", price: 1000 },
    { name: "Phone", price: 500 },
    { name: "Tablet", price: 300 }
];  

const prices = products.map(product => product.price);
console.log(prices); // [1000, 500, 300]
```

`products` 是一個物件陣列，每個物件代表一個產品，包含 `name` 和 `price` 屬性。

使用 `map` 函數來遍歷 `products` 陣列，並取得每個產品的價格。

在 `map` 函數中，使用箭頭函數表示操作邏輯: `product => product.price`，這表示對傳入的 `product` 物件，回傳它的 `price` 屬性值。


### 最佳實務做法: 撰寫函數註解

函數註解是讓自及程其他開發者能夠快速理解函數的用途和使用方式。

內容應該包含:
- 描述函數的目的
- 描述參數和回傳值
- 遵循 [JSDoc](https://github.com/jsdoc/jsdoc) 格式，以便使用工具自動產生 API 文件
- [How to use JSDoc - Basics & Introduction @ youtube 13:04](https://www.youtube.com/watch?v=Nqv6UkTROak)


使用 JSDoc 格式撰寫註解的範例:

```javascript
/**
 * 計算 BMI
 * @param {number} weight - 體重(kg)
 * @param {number} height - 身高(m)
 * @returns {number} - BMI值
 */
function calculateBMI(weight, height) {
  height = height || 0;
  return weight / (height ** 2);
}
```

### Lab 01: 建立折扣計算函數物件

[[lab_06_01]]


## 執行函數

三種執行函數的方式:

- 開發者直接呼叫函數
- 宣告函數後立即執行 (IIFE: Immediately Invoked Function Expression)
- 由其它函數呼叫 (callback function)

### 開發者呼叫函數

開發者呼叫函數的名稱，並傳入必要的引數(arguments)。
- 使用括號 `()` 包裹引數列表，並用逗號分隔引數。

Example: 呼叫函數

```javascript
function add(a, b) {
    return a + b;
}

const result = add(2, 3);
console.log(result); // 5
```

如果只有函數名稱而沒有括號，不會執行函數，而是回傳該函數物件。

```javascript
function add(a, b) {
    return a + b;
}

const result = add; // 回傳函數物件
console.log(result); // [Function: add]
```

在這個例子中，`add` 是一個函數物件，當我們把 `add` 指派給 `result` 時，`result` 也成為一個指向同一個函數物件的變數。

所以，`result(2, 3)` 和 `add(2, 3)` 都會執行同一個函數，並回傳相同的結果 `5`。

### 函數的參數(parameter)及引數(argument)

"參數" 和 "引數" 是兩個不同的概念. 

"參數" 是宣告函數時所給定的變數名稱，指定函數的輸入
- 上例中，`a` 和 `b` 是參數

"引數" 是呼叫函數時所傳遞的值
- 上例中，`2` 和 `3` 是引數


### 立即自我執行(IIFE 函數)

IIFE 是一種函數表達式，宣告後立即執行。

典型使用情境:
- 需要建立一個獨立的作用域來封裝變數，避免污染全域作用域
- 需要在程式碼中立即執行一些初始化邏輯
- 為函數/物件建立私有屬性。
- 在模組化之前，IIFE 是一種常見的封裝技術，用於模擬模組的行為。

#### IIFE 的特性

- 宣告後立即執行
  - 將宣告和執行合併在一起
- IIFE 函數內的變數是私有的, 外部無法存取
- IIFE 執行過後，就無法再次執行(因為它沒有名稱可以重覆呼叫)
  - 不可重覆呼叫
- 早期會使用 IIFE 來模擬模組化，封裝變數和函數，避免污染全域作用域
- 現代 JavaScript 已經有模組化機制，IIFE 的使用頻率已經大幅降低，但在某些特定情境下仍然有其用途

#### IIFE 語法

```javascript
(function(param1, param2...) {
  // code here
})(arg1, arg2...);
```
- 第一個括號 `()` 宣告匿名函數
- 第二個括號 `(arg1, arg2...)` 傳遞引數並立即執行函數
- 最後一個分號 `;` 是結束整個表達式的標誌

#### IIFE Use Case: 程式碼中立即執行初始化邏輯

網頁載入時的「初始化任務」

希望在頁面一開啟就執行一些初始化邏輯，但又不希望這些「暫時性的變數」變成全域變數去干擾到其他的程式碼。

Example: 載入網頁時顯示歡迎訊息，並計算一些初始分數。

##### 不好的寫法

```js
// 這些 init() 會一直留在全域環境，可能會被其他程式碼誤用或覆蓋
function init(){
    let tempUser = "小明"; 
    let bonus = 100;
    let base = 50;

    function welcome() {
        console.log(`歡迎 ${tempUser}，您的總分是 ${bonus + base}`);
    }
    welcome();
}
init();
```

`init()` 函數會留在全域環境，但它只被呼叫一次。

##### 使用 IIFE 的寫法

```js
(function(currentDate) {
    // 1. 初始化邏輯：定義只在這裡使用的內部變數
    const tempUser = "小明";
    const bonus = 100;
    const base = 50;

    // 2. 立即執行的任務
    const total = bonus + base;
    console.log(`${currentDate.toLocaleDateString()}【系統初始化】歡迎 ${tempUser}，您的點數為：${total}`);
})(new Date());
```

也可改用 箭頭函數的寫法：

```js
((currentDate) => {
    // 1. 初始化邏輯：定義只在這裡使用的內部變數
    const tempUser = "小明";
    const bonus = 100;
    const base = 50;

    // 2. 立即執行的任務
    const total = bonus + base;
    console.log(`${currentDate.toLocaleDateString()}【系統初始化】歡迎 ${tempUser}，您的點數為：${total}`);
})(new Date());
```

## 呼叫時的彈性引數

### 參數與引數的區別

- "參數" 是宣告函數時所給定的變數名稱，用於指定函數的輸入
- "引數" 是呼叫函數時所傳遞的值

Example:

```javascript
function multiply(a, b) {
    return a * b;
}
console.log(multiply(2, 3)); // 6
```
在這個例子中，`a` 和 `b` 是參數，而 `2` 和 `3` 是引數。

### 參數與引數的對應

- 參數和引數是根據位置對應的
- 若 引數個數 > 參數個數，則多餘的引數會被忽略
- 若 引數個數 < 參數個數，則缺少的參數被預設為 `undefined`

Example: 參數與引數的對應

```javascript
function multiple(a, b, c) {
    return a * b * c;
}
console.log(multiple(2, 3)); // NaN
console.log(multiple(2, 3, 4, 5)); // 24
```

在這個例子中，`multiple(2, 3)` 只有兩個引數，但函數宣告了三個參數，所以 `c` 的值是 `undefined`，導致計算結果是 `NaN`。

而 `multiple(2, 3, 4, 5)` 有四個引數，但函數宣告了三個參數，所以第四個引數 `5` 被忽略，計算結果是 `2 * 3 * 4 = 24`。

### 參數的預設值

- ES6 引入了參數的預設值功能
- 可以在函數宣告時為參數指定預設值
- 當呼叫函數時，如果沒有提供該參數的引數，則會使用預設值

對開發者的好處:
- 能夠只傳入必要的引數值, 其它的參數則使用預設值, 簡化函數的呼叫

Use Case: 電子商務網站計算訂單金額

情境：大部分訂單都使用一般運送方式，運費為 60 元。只有少數訂單會指定不同運費或使用折扣。

```javascript
function calculateOrderTotal(productTotal, shippingFee = 60, discount = 0) {
    return productTotal + shippingFee - discount;
}

console.log(calculateOrderTotal(1000)); // 1060
console.log(calculateOrderTotal(1000, 100)); // 1100
console.log(calculateOrderTotal(1000, 100, 200)); // 900
```

在這個例子中：
- `productTotal` 是必要參數，呼叫函數時一定要提供
- `shippingFee = 60` 表示如果沒有傳入運費，就使用預設運費 60
- `discount = 0` 表示如果沒有傳入折扣，就預設沒有折扣

呼叫函數時，可以只傳入必要的商品總金額：

```javascript
calculateOrderTotal(1000);
```

這樣函數會自動使用預設值：

```javascript
productTotal = 1000
shippingFee = 60
discount = 0
```

所以計算結果是：

```javascript
1000 + 60 - 0 // 1060
```

使用參數預設值的好處是：常見情況可以少傳一些引數，特殊情況才覆寫預設值。


### 可變參數 (Variadic Parameters)

可變參數指的是函數可以接受不定數量的引數。
- 例如: `Math.max(param1, param2, ...)` 可以接受任意數量的引數，並回傳其中的最大值。

在 ES6(2015) 之後，可以使用剩餘參數(rest parameters)來實現可變參數的功能。

使用規範 1
- 唯一性： 一個函式定義中只能有一個其餘參數。

正確:
```js
function sum(...numbers) {
    ...
}
```

錯誤:
```js
function sum(...numbers, ...moreNumbers) {
    ...
}
```

使用規範 2
  - 置後性： 它必須是參數列中的最後一個參數，否則會導致語法錯誤。

正確: 
```js
function sum(a, b, ...numbers) {
    ...
}   
```

錯誤:
```js
function sum(...numbers, a, b) {
    ...
}   
```


### 範例: 計算一組數字的平均值與標準差

函數的 IPO 分析

- Input: 一組數字 (陣列)
- Process: 計算平均值和標準差
- Output: 平均值和標準差

Process 需要用到的公式:

- 平均數

$$\mu = \frac{1}{N} \sum_{i=1}^{N} x_i$$

- 標準差:

$$\sigma = \sqrt{\frac{1}{N} \sum_{i=1}^{N} (x_i - \mu)^2}$$


函數簽名:

```js
function calMeanStddev(...numbers){
    ...
}
```

參數 `numbers` 是一個剩餘參數，會把傳入的引數收集成一個陣列。
我們可以在函數內部使用 `numbers` 這個陣列來計算平均值和標準差。

```js
function calMeanStddev(...numbers) {
    // 1. 取得樣本數 n
    const n = numbers.length;
    // 2. 計算平均值
    // 2.1 計算總和，使用 reduce 方法
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    // 2.2 計算平均值
    const mean = sum / n;
    // 3. 計算標準差
    // 3.1 計算每個數字與平均值的差的平方，並求和
    const sumOfSquares = numbers.reduce((acc, num) => acc + (num - mean) ** 2, 0);
    // 3.2 計算方差
    const variance = sumOfSquares / n;
    // 3.3 計算標準差
    const stddev = Math.sqrt(variance);
    // 4. 回傳結果
    return [mean, stddev];
}
```

使用函數計算以下數字的平均值和標準差:

```
80, 75, 90, 85, 70
```

```js
const [mean, stddev] = calMeanStddev(80, 75, 90, 85, 70);
console.log(`平均值: ${mean}, 標準差: ${stddev}`);
```


## 剩餘參數的應用: 高階函數(Higher-order function)

高階函數是指「接受函數作為參數」或「回傳函數」的函數。

當接受函數作為參數時，高階函數可以使用剩餘參數接受被傳入的函數的所有引數，並在高階函數內部呼叫該函數。
- 被傳入的函數稱為回呼函數(callback function)
- callback function 的參數個數和類型不固定，因此使用剩餘參數來接受這些引數

高階函數樣態(pattern): 接受回呼函數作為參數，並使用剩餘參數接受回呼函數的引數

```js
function higherOrderFunction(callback, ...args) {
    // 在高階函數內部呼叫回呼函數，並傳入剩餘參數
    // 執行回呼函數，並傳入剩餘參數值做為引數
    return callback(...args);
}
```

### 範例

設計一個函數 `add(a, b)`, 回傳 a + b 的結果

設定一個函數 `invokeFunction()`, 接受一個函數和一組引數，並執行該函數，回傳執行的結果. 

```javascript
const add = (a, b) => a + b;

function invokeFunction(func, ...args) {
  // args is an array. Use the spread operator to take the elements out of the array.
  return func(...args);
}

const sum = invokeFunction(add, 1, 2); // 3
```

## 本章內容回顧

- 函數的基本觀念
  - 函數是可重複使用的程式碼區塊，可將重複邏輯抽出以提升可讀性與維護性
  - 在 JavaScript 中，函數也是物件，因此可以被指派給變數、作為引數傳遞，也可以作為回傳值

- 函數宣告方式
  - `function` 敘述適合定義主要功能，會被提升到作用域上方
  - 函數表達式會建立函數物件並指派給變數，必須先宣告後使用
  - 函數表達式適合用在 callback、函數查表、回傳函數物件等情境
  - 箭頭函數可簡化簡短函數，常用於 `map`、`forEach` 等陣列方法的 callback

- 函數提升與呼叫時機
  - `function` 敘述可以在宣告之前呼叫
  - 函數表達式不會以相同方式被提升，若在宣告之前呼叫，可能產生錯誤
  - 初學時應養成「先宣告、後使用」的習慣，讓程式碼結構更清楚

- 函數物件與函數執行
  - 只有函數名稱而沒有括號時，代表取得函數物件本身
  - 使用括號 `()` 並傳入引數，才會執行函數
  - 函數物件可以存入變數，也可以交給其他函數執行

- IIFE 立即執行函數
  - IIFE 是宣告後立即執行的函數表達式
  - 適合用來執行只需要一次的初始化邏輯
  - IIFE 會建立自己的作用域，可避免暫時變數污染全域作用域

- 參數與引數
  - 參數是宣告函數時定義的變數名稱
  - 引數是呼叫函數時實際傳入的值
  - 引數太多時，多餘的引數會被忽略
  - 引數太少時，沒有對應到的參數值會是 `undefined`

- 參數預設值與剩餘參數
  - 參數預設值可讓常見情境少傳一些引數，特殊情境再覆寫預設值
  - 剩餘參數 `...args` 可將多個引數收集成陣列
  - 剩餘參數必須放在參數列最後一個位置

- 高階函數
  - 高階函數是接受函數作為參數，或回傳函數的函數
  - 當高階函數接受 callback function 時，可搭配剩餘參數收集不固定數量的引數
  - 呼叫 callback 時，可用展開語法 `...args` 將陣列元素展開成一個一個的引數

## 複習問題

1. 為什麼說 JavaScript 中的函數也是物件？這個特性讓函數可以做哪些事？

2. `function` 敘述、函數表達式、箭頭函數三種寫法各自適合什麼情境？

3. `function` 敘述與函數表達式在 hoisting 行為上有什麼差異？為什麼函數表達式通常需要先宣告後使用？

4. 只寫函數名稱 `add`，和寫 `add(2, 3)`，兩者代表的意思有什麼不同？

5. 什麼情況下會把函數作為「值」指派給變數、傳遞給其他函數，或作為回傳值？

6. IIFE 是什麼？為什麼一次性的初始化邏輯適合使用 IIFE？

7. IIFE 如何建立自己的作用域，避免暫時變數污染全域作用域？

8. 什麼是參數？什麼是引數？當引數個數和參數個數不一致時，JavaScript 會如何處理？

9. 參數預設值與剩餘參數 `...args` 各自解決什麼問題？

10. 什麼是高階函數？在簡易計算器範例中，為什麼可以用物件 `operations` 管理不同的運算函數？
