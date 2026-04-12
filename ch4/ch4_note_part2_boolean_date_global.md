# Ch4 參考型別 2: 布林物件、日期與時間物件、Global 物件

## 本章重點

- 了解 `Boolean()` 的用途，分辨 primitive boolean 與 `Boolean` 物件的角色
- 熟悉 falsy 與 truthy values，並知道「空陣列」、「空物件」與「非空字串」在條件判斷中的行為
- 使用布林轉換簡化條件判斷、檢查資料是否存在，並理解 `||` short-circuit evaluation 在設定預設值時的效果
- 區分「值是否已設定」與「值是否有效」兩種程式意圖，避免把 `0`、空字串等合法值誤判為未設定
- 使用 `Date` 物件建立、讀取、修改與格式化日期，並掌握日期運算應「先取值再設定」的基本原則
- 了解 global 物件的用途、不同執行環境中的名稱 (`window`、`global`、`globalThis`)，以及它帶來的「命名衝突」與「隱式耦合風險」

## 布林物件

boolean 是 JavaScript 中的原生型別，只有兩個值：`true` 和 `false`。

Boolean 物件則是 boolean 的物件型別, 主要用於強制型別轉換。

```js
console.log(Boolean('hello')); // true
console.log(Boolean('')); // false
console.log(Boolean(0)); // false
```

### falsy 及 truthy values


Falsy value 是指 Boolean 轉換後會得到 `false` 的值。

JS 會將以下的值轉換成 `false`：

```js
undefined
null
0
-0
NaN
"" (空字串)
'' (空字串)
false
```

Truthy value 是指 Boolean 轉換後會得到 `true` 的值。

除了上述的 falsy value 以外，其他所有值，包括物件、陣列、函式、非空字串、非零數字等，都會被轉換成 `true`。

```js
let members = ["Alice", "Bob"];
if (members) {
    console.log("有成員");
} else {
    console.log("沒有成員");
}
```

輸出結果為 "有成員"，因為陣列是一個 truthy value。

### 實務技巧：使用 Boolean 轉換來檢查變數是否有值

在 JavaScript 中，條件判斷（如 `if`）不只接受 `true` 或 `false`，也會將值自動轉為布林值。

#### 技巧 1: 簡化條件判斷


```js
if (cartItems.length > 0){
    console.log("購物車有商品");
} 
```

可以簡化為：

若 cartItems.length 不為 0，就會被轉換為 true，表示購物車有商品：

```js
if (cartItems.length) {
    console.log("購物車有商品");
}
```

#### 技巧 2: 檢查字串是否存在

原來版本:
不為空字串才執行折扣邏輯：

```js
if (couponCode !== "") {
    applyDiscount(couponCode);
}
```


可以簡化為：

非空字串就會被轉換為 true (truthy value), 表示有折扣碼，執行折扣邏輯：

```js
if (couponCode) {
    applyDiscount(couponCode);
}
```


上述的簡化版本不僅更簡潔，還可同時處理以下 falsy value：

- ""
- null
- undefined

確保只有 truthy value（如非空字串）才會觸發折扣邏輯。

#### 技巧 3: 設定預設值

應用 short-circuit evaluation 來設定預設值：

```js
let discount = userDiscount || 0;
```

`||` 是邏輯 OR 運算子，屬於 short-circuit evaluation 的一種，會從左到右評估運算式。只要遇到第一個 truthy value 就會停止評估並回傳該值。

如果 `userDiscount` 是 falsy value（如 `null`、`undefined`、`0`），就會使用預設值 `0`。 \
如果 `userDiscount` 是 truthy value（如非空字串、非零數字），就會使用 `userDiscount` 的值。



### 比較程式意圖

有程式檢查商品「價格是否已設定」，可以寫成以下兩種版本：

版本 A:
```js
let unitPrice = 0;

if (unitPrice !== null) {
    console.log("價格已設定");
} else {
    console.log("價格未設定");
}
```

版本 B:
```js
let unitPrice = 0;
if (unitPrice) {
    console.log("價格已設定");
} else {
    console.log("價格未設定");
}
```

上述兩段程式碼的輸出和意圖有什麼不同？

兩段程式碼的差異，除了執行結果外，還在於開發者想表達的意圖（intent）不同。

第一段程式碼使用 `unitPrice !== null` 來檢查價格是否已設定，
- 意圖是「單價已設定(不是 null 值)」。

第二段程式碼使用 `if (unitPrice)` 來檢查價格是否已設定
- 意圖是「單價是有效值」(truthy value). 
- 單價不能為 `0`、`""`、`null`、`undefined`。


**Clean Code 重點**

在閱讀或撰寫程式時，應思考：

- 你是要判斷「是否未設定」？
  - 使用 `if (unitPrice !== null)` 來檢查是否已人為設定
- 還是判斷「是否有有效值」？
  - 使用 `if (unitPrice)` 來檢查為有效值（truthy value）


## 日期與時間物件

JS 中沒有原生的日期型別，只有 `Date` 物件。

在電子商務系統中，日期與時間非常常見，例如：

- 訂單建立時間
- 付款時間
- 出貨時間

### 取得目前日期與時間或指定日期

用 Date 物件的建構子取得目前日期與時間：

```js
let now = new Date();
console.log(now); // 2024-06-01T12:00:00.
```

也可以用建構子建, 輸入日期文字等參數建立指定日期：

```js
let orderDate = new Date("2024-06-01T10:00:00");
console.log(orderDate); // 2024-06-01T10:00:00
```

### 修改日期

日期的組成包括: 西元年(FullYear)、月、(月)日、週天、時、分、秒(Second)、毫秒(Time)等

可以用 Date 物件提供的 setter 與 getter 方法來修改或取得日期的各個部分：

Example: 取得目前的西元年：

```js
let now = new Date();
let year = now.getFullYear();
console.log(year); // 2026
```

Example: 將目前的月份改為 12 月：

```js
let orderDate = new Date();
console.log(orderDate); 
orderDate.setMonth(11); // 月份從 0 開始
console.log(orderDate); // 月份已改為 12 月
```

日期元素的操作方法清單:

Getters:
| 方法               | 說明           | 範例                                 |
| :---------------- | :----------- | :--------------------------------- |
| `getFullYear()`   | 取得西元年       | `date.getFullYear()` → `2024`           |
| `getMonth()`      | 取得月份 (0-11) | `date.getMonth()` → `5` (6 月)         |    
| `getDate()`       | 取得日期 (1-31) | `date.getDate()` → `1`                 |
| `getDay()`        | 取得星期 (0-6)  | `date.getDay()` → `0` (週日)             |
| `getHours()`      | 取得小時 (0-23)  | `date.getHours()` → `14`             |
| `getMinutes()`    | 取得分鐘 (0-59)  | `date.getMinutes()` → `30`             |
| `getSeconds()`    | 取得秒數 (0-59)  | `date.getSeconds()` → `45`             |
| `getTime()`       | 取得自 1970-01-01T00:00:00Z 以來的毫秒數 | `date.getTime()` → `1712123456789` |

Setters:
| 方法               | 說明           | 範例                                 |
| :---------------- | :----------- | :--------------------------------- |
| `setFullYear(year)` | 設定西元年       | `date.setFullYear(2025)`               |
| `setMonth(month)` | 設定月份 (0-11) | `date.setMonth(0)` (1 月)           |
| `setDate(date)`   | 設定日期 (1-31) | `date.setDate(15)`                   |
| `setHours(hour)`  |設定小時 (0-23)  | `date.setHours(9)`                    |
| `setMinutes(min)` | 設定分鐘 (0-59)  | `date.setMinutes(45)`                   |
| `setSeconds(sec)` | 設定秒數 (0-59)  | `date.setSeconds(30)`                   |
| `setTime(ms)`    | 設定自 1970-01-01T00:00:00Z 以來的毫秒數 | `date.setTime(1712123456789)` |

### 日期的格式化顯示

可以使用 `toLocaleDateString()`、`toLocaleTimeString()` 和 `toLocaleString()` 方法來格式化日期與時間的顯示。

```js
let orderDate = new Date("2024-06-01T10:00:00");
console.log(orderDate.toLocaleDateString("de-DE")); // "1.6.2024" (德國日期格式)
```

### 日期的運算

### 基本原則

👉 不要直接對 Date 做加減運算

運算子 `+`、`-`、`*`、`/` 等無法直接對 Date 物件進行運算，因為 Date 物件不是數字型別。

```js
let date = new Date();
let newDate = date + 1; // 日期轉字串後再加 1，結果不是預期的日期加一天
console.log(newDate); // "Wed Jun 01 2024 12:00:00 GMT+0800 (台北標準時間)1"
```

操作原則:

- 使用 `getXXX()` 取得要修改的日期元素
- 進行數字運算（加減天數、月數等）
- 使用 `setXXX()` 將修改後的值設定回 Date 物件
- 注意 setter 的行為:
  - 1. setter 會修改原始 Date 物件
  - 2. setter 會自動處理日期溢位（如超過當月天數會自動進位到下個月）

Example: 將日期加 7 天：

```js
let orderDate = new Date("2024-06-01T10:00:00");
let currentDay = orderDate.getDate();  // 取得當前日期的月天 (1); number type
orderDate.setDate(currentDay + 7); // 加 7 天
console.log(orderDate); // 2024-06-08T10:00:00
```

### dayjs 日期處理套件

當日期邏輯開始變多時，只靠原生 `Date` 物件常常會讓程式變得不容易讀。

例如：
- 判斷某個日期是否在另一個日期之前
- 計算「付款後 3 天出貨」
- 將日期格式化成 `YYYY-MM-DD`

這類需求若改用 `dayjs`，程式的意圖通常會更清楚。

#### 為什麼使用 `dayjs`

原生 `Date` 也能處理日期，但常見問題是：

- 判斷邏輯不夠直覺，例如直接寫 `<`、`>`
- 日期加減要搭配 `getXXX()` 與 `setXXX()`，步驟較多
- 輸出格式常需要額外處理

`dayjs` 提供較清楚的方法名稱，讓程式更接近自然語言。

例如，下面兩段都在表達「coupon 是否尚未過期」：

```js
let now = dayjs("2026-03-24"); // dayjs 物件
let expiredAt = dayjs("2026-03-25"); // dayjs 物件
// 兩個 dayjs 物件直接比較，
if (now < expiredAt) {
    console.log("Coupon 可用");
}
```

```js
let now = dayjs("2026-03-24");
let expiredAt = dayjs("2026-03-25");

// 使用 isBefore() 方法，意圖更清楚
if (now.isBefore(expiredAt)) {
    console.log("Coupon 可用");
}
```

第二種寫法比較容易讓人一眼看懂：
- `isBefore()` 的意圖非常明確
- 不需要讀者自己推論 `<` 在比較什麼

### Lab 會用到的 `dayjs` 基本操作

先閱讀[README](examples/dayjs/README.md) 了解如何建立一個 Node.js 專案並安裝 `dayjs` 套件。


#### 1. 建立 dayjs 日期物件

```js
let now = dayjs();
let paidAt = dayjs("2026-03-22");
```

- `dayjs()`：取得目前時間
- `dayjs("2026-03-22")`：根據日期字串建立日期物件

#### 2. 比較日期先後：`isBefore()`

用來判斷某日期是否早於另一個日期。

```js
let now = dayjs("2026-03-24");
let couponExpiredAt = dayjs("2026-03-25");

console.log(now.isBefore(couponExpiredAt)); // true
```

在 coupon 情境中，可以把程式意圖寫得很清楚：

```js
if (now.isBefore(dayjs(order.couponExpiredAt))) {
    console.log("Coupon 可用");
}
```

這段的意思是：
- 現在時間 `now`
- 是否早於 coupon 到期日 `couponExpiredAt`
- 如果是，表示 coupon 還沒過期

#### 3. 日期加減：`add()`

用來在某個日期上加上指定時間。

```js
let paidAt = dayjs("2026-03-22");
let shipDate = paidAt.add(3, "day");

console.log(shipDate); 
```

這段程式的意圖是：
- 訂單付款日是 `2026-03-22`
- 出貨日是付款後 3 天

`add(3, "day")` 可讀成：
- 在目前日期上加 3 天

也就是 lab 中這段的意思：

```js
dayjs(order.paidAt).add(3, "day")
```

#### 4. 格式化輸出：`format()`

日期物件輸出畫面時，要指定格式，做格式化輸出。

```js
let shipDate = dayjs("2026-03-25");
console.log(shipDate.format("YYYY-MM-DD")); // 2026-03-25
```

在訂單摘要中，通常會先格式化再放進字串中：

```js
let message = `訂單：ORD-001 出貨日：${shipDate.format("YYYY-MM-DD")}`;
console.log(message);
```

#### 搭配 Template String 顯示資料

當字串中要插入變數或運算結果時，使用 Template String 會比 `+` 串接更清楚。

原來寫法：

```js
let message = "訂單：" + order.id + " 出貨日：" + shipDate;
```

比較好的寫法：

```js
let message = `訂單：${order.id} 出貨日：${shipDate.format("YYYY-MM-DD")}`;
```

好處：
- 變數插入位置更清楚
- 不必手動串接多段字串
- 可以順便把日期格式化

#### 完整範例

參考 [dayjs_demo.js](examples/dayjs/dayjs_demo.js)

#### 本段小結

- `dayjs(...)`：建立日期物件
- `isBefore(...)`：判斷日期先後
- `add(3, "day")`：計算幾天後的日期
- `format("YYYY-MM-DD")`：把日期轉成想要顯示的文字
- Template String 可讓輸出訊息更清楚

掌握這幾個方法後，就足以完成本節 lab 的 coupon 判斷、出貨日計算與訂單摘要顯示。

### Lab 03: 使用 dayjs 套件處理日期運算

[lab_04_03 訂單 + 出貨 + Coupon](labs/lab_04_03_dayjs_short.md)

## Global 物件

global object 是一個特殊的物件，它在程式執行時永遠存在，且其屬性和方法可以在程式的任何地方被直接存取。

主要功能與特性:
- 存放標準內建物件與函數
  - 物件如 `Math`、`Date`、`Number`、`String` 等
  - 全域函式，如 `parseInt()`、`isNaN()` 等
- 提供全域變數的存取
    - 在函數外以 var 宣告的變數會成為 global 物件的屬性
    - 在 non-strict 模式下，未宣告的變數會自動成為 global 物件的屬性

Example: 

```js
function test() {
    // 在函數內宣告變數
    var functionLocalVar = "I am local in test function";
    // 在函數內未宣告變數，會成為 global 物件的屬性
    globalVar = "I am global";
}
console.log(functionLocalVar); // ReferenceError: functionLocalVar is not defined
console.log(globalVar); // "I am global"
```

### 為何會有 global 物件？

1. 提供一個「大容器」
- 需要一個地方來存放所有內建功能（如 Array、Object、Math、parseInt）

2. 允許兩個 js 檔案共享資料

```js
// a.js 
var sharedData = "Hello from a.js";

// b.js
console.log(sharedData); // "Hello from a.js"
```

參考 [cart-store.js](examples/global_object_shared_data/cart-store.js) 的範例說明.

3. 代表執行環境（Host Environment）

全域物件被用來反映環境特有的能力：
- 在瀏覽器中，global 物件是 `window`，提供 DOM 操作、事件處理等功能。
- 在 Node.js 中，global 物件是 `global`，提供檔案系統、網路等功能.

### Global 物件的名稱

- 在瀏覽器中，global 物件的名稱是 `window`。
- 在 Node.js 中，global 物件的名稱是 `global`。

在 ES2020 中，新增了 `globalThis` 這個標準化的全域物件名稱
- 會視執行環境自動指向正確的 global 物件
- 讓跨環境的程式碼更容易撰寫與維護

ex. 在 Browser 的 console 中：

```js
console.log(globalThis); // 會輸出 window 物件，因為在瀏覽器中 globalThis 指向 window
```

![](img/26-Mar-28-21-54-56.png)

在 Node.js 中：

```js
console.log(globalThis); // 會輸出 global 物件，因為在 Node.js 中 globalThis 指向 global
```

![](img/26-Mar-28-21-55-40.png)

### Code Bad Smell: global 物件造成的負面影響

#### 1. **命名衝突**：
- 全域空間是共用的。
- 不同的程式碼或函式庫可能會使用相同的全域變數名稱，導致衝突和不可預期的行為。

參考範例：
- [Global 命名衝突 Demo](examples/global_name_collision_ecommerce/index.html)
- [storefont.js](examples/global_name_collision_ecommerce/storefront.js) 先被載入
  - 在 global 物件上定義了 `formatPrice()` 函式 
- [campaign-widget.js](examples/global_name_collision_ecommerce/campaign-widget.js) 接著再被載入
  - 也在 global 物件上定義了 `formatPrice()` 函式，覆蓋了 storefront.js 的版本




#### 2. 隱式耦合 (Implicit Coupling)

隱式耦合 (Implicit Coupling)： 模組之間透過「沒有明說的共享狀態」互相依賴

考慮以下兩個 JavaScript 模組(檔案)：

```js
// moduleA.js
var taxRate = 0.05;
```

```js
// moduleB.js
function calculate(price) {
  // 函數的行為依賴於全域變數 taxRate，但沒有明確宣告這個依賴 (隱式耦合)
  return price * (1 + taxRate);
}
```

函數 `calculate()` 依賴於 `taxRate` 這個全域變數
這個依賴關係是隱式的，因為 `calculate()` 並沒有明確宣告它需要 `taxRate` 這個變數。

這種隱式耦合會讓程式碼難以理解和維護
- 可讀性變差: 開發者不知道 taxRate 是從哪裡來的，必須搜尋整個程式碼庫才能找到它的定義。
- 可維護性變差: 其它模組也可修改 taxRate 的值，可能會不小心影響到 calculate() 的行為，導致難以追蹤和修復錯誤。

```js
// moduleC.js
taxRate = 0.1; // 不小心修改了 taxRate 的值，導致 calculate() 的行為改變
```

### Lab 04: Global 物件的負面影響

[lab_04_04 Global 物件的負面影響](labs/lab_04_04_global_object_collision_guided.md)


## 本章重點回顧

1. **布林物件與型別轉換**
    - `Boolean()` 用於強制轉換為布林值
    - Falsy values: `undefined`、`null`、`0`、`NaN`、空字串、`false`
    - 其他所有值包括物件、陣列、非空字串都是 truthy values

2. **條件判斷最佳實踐**
    - 使用 short-circuit evaluation 簡化條件判斷
    - 區分「是否未設定」(`!== null`) 與「是否有效值」(`if (value)`)
    - 使用 `||` 運算子設定預設值

3. **Date 物件**
    - 使用 `new Date()` 建立日期物件
    - 用 `getXXX()` 取得日期元素，用 `setXXX()` 修改日期
    - setter 會自動處理日期溢位（如月份進位）
    - 日期運算：先 `getXXX()`、進行數字運算、再 `setXXX()`

4. **Global 物件**
    - 瀏覽器中為 `window`，Node.js 中為 `global`
    - ES2020 引入 `globalThis` 作為跨環境標準名稱
    - 存放內建物件與全域函式

5. **Global 物件的風險**
    - **命名衝突**：不同模組使用相同全域變數名稱
    - **隱式耦合**：模組間的依賴關係不明確，難以維護和追蹤

## 複習問題

1. 請說明 falsy value 與 truthy value 的差異，並列舉至少三個 falsy value 的例子。

2. 下列程式碼的輸出結果是什麼？為什麼？
```js
let cartItems = [];
if (cartItems) {
    console.log("購物車有商品");
} else {
    console.log("購物車是空的");
}
```

3. 比較以下兩種檢查變數的方式，說明各自適用的場景：
```js
if (unitPrice !== null) { }  // 版本 A
if (unitPrice) { }           // 版本 B
```

4. 請寫出程式碼，將日期 `2024-06-01` 加上 15 天，並印出修改後的日期。

5. 解釋什麼是隱式耦合（Implicit Coupling），並說明它對程式碼維護性的影響。

6. 在瀏覽器、Node.js 和 ES2020 中，全域物件的名稱分別是什麼？為什麼需要 `globalThis`？

7. 下列程式碼會產生什麼問題？請說明原因並提出改善方案。
```js
// storefront.js
function formatPrice(price) {
    return "$" + price;
}

// campaign.js
function formatPrice(price) {
    return "¥" + price;
}
```

8. 請使用 `||` 運算子撰寫程式碼，當 `userDiscount` 為 falsy value 時，設定預設折扣為 `10`。
