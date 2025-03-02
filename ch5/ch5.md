
# Ch5 集合(Collection) 物件

## 學習目標

- 了解集合物件的特性
- 陣列(Array)的宣告及操作
- Set 與 Map 的宣告及操作

## 集合物件

- 集合物件是用來儲存多個值的資料結構
- 例如:
    - 陣列 (Array): 存放多個值，使用索引(index)來存取, 值可重複
    - Set: 存放不重複的值, 使用索引來存取
    - Map: 存放鍵值對 (key-value pair), 使用 key 來存取 值
- 他們都是物件參考型別(Object Reference Type)
    - stack 中儲存物件的參考(reference)位址
    - heap 中儲存物件的實際資料, 可動態擴展

## 陣列 (Array)

- 以連續的記憶體空間儲存多個值
- 值的型別可以不同，不一定要全部是同一型別

![w:500](img/24-08-17-11-28-27.png)

## 使用情境

- 存放同學的成績: 用陣列儲存班上同學的考試分數，方便計算平均分數和排序
- 購物車商品清單: 儲存使用者選購的商品，每個元素可以是商品物件，包含名稱、價格等資訊
- 歷史紀錄追蹤: 記錄使用者最近的操作或瀏覽記錄，可以使用陣列來實作「上一步」或「下一步」功能 

## 陣列的基本操作

- 建立陣列
- 訪問陣列元素
- 修改陣列元素（添加、刪除和更新）
- 獲取陣列的長度
- 遍歷陣列(拜訪陣列的每個元素)
- 陣列的排序和搜尋
- 陣列的切片和拼接

## 建立陣列

有三種建立陣列的方法:
1. 陣列文字(Array Literal)
2. Array() 建構子
3. Array.of() 方法


### 陣列文字(Array Literal)

- 使用文字來描述陣列及其內容
- 經常在建立空陣列或事先已知值的清單時使用。

Ex: 有 red, green, blue 三個顏色的陣列

```js
var colors = ['red', 'green', 'blue'];
```

Ex: 建立空陣列

```js
var emptyArray = [];
```

### Array() 建構子

- Array literal 的限制
    - 無法一次建立很長的陣列
    - e.g. 建立一個長度為 100 的陣列

- 使用 Array() 建構子來建立陣列
    - 可提供 "數字" 表示陣列的長度
    - 可提供 "一個或多個值"，表示陣列的內容

Ex: 建立長度為 5 的陣列, 以儲存顏色
- 注意: 內容沒有初始化

```js
var colors = new Array(5);
console.log(colors); // [ <5 empty items> ]
```

Ex: 儲存 5 個顏色的陣列, 5 個顏色分別為: red, green, blue, yellow, purple

```js
var colors = new Array('red', 'green', 'blue', 'yellow', 'purple');
console.log(colors); // [ 'red', 'green', 'blue', 'yellow', 'purple' ]
```

### Array() 的簽名

![](img/25-Feb-23-15-30-38.png)

- 多個引數時, 使用這些引數來初始化陣列
- 單一引數時，
    - 如果是數字，則表示陣列的長度
    - 如果不是數字，則表示陣列的內容

### Array() 的常見陷阱


x_arr 和 y_arr 的意義相同嗎？
```js
var x_arr = new Array(5);
var y_arr = new Array("5")
```

### Array.of()

- 如果明確地要使用一串資料(a list values)來建立陣列，則使用 Array.of() 方法
  - 明確的展現你的意圖
- Array.of() 方法會將所有引數視為陣列的內容

Ex: 建立一個學生成績的陣列, 只有一個元素 80 分

```js
var scores = Array.of(80);
console.log(scores); // [ 80 ]
```

### 補充

另有 Array.from() 方法
- 將一個 array-like 物件(類陣列物件)或可迭代物件(iterable object)轉換為陣列
- 後續章節會介紹 array-like 物件和可迭代物件

## 訪問陣列元素 (Accessing Array Elements)

### 使用整數的索引值

- 使用索引來訪問陣列的元素
- 索引符號是方括號 []
- 索引值是必需是 整數及非負數
- 陣列的索引從 0 開始
- 如果索引超出範圍，則返回 undefined

### 取得陣列的元素

Ex. 取得顏色陣列的第2個元素

```js
var colors = ['red', 'green', 'blue'];
console.log(colors[1]); // green
```

Ex. 取得顏色陣列的最後一個元素

```js
var colors = ['red', 'green', 'blue'];
console.log(colors[colors.length - 1]); // blue
```

Ex. 索引值超出範圍

```js
var colors = ['red', 'green', 'blue'];
console.log(colors[3]); // undefined
```

### 非整數的索引值: 成為 Array 的屬性

- 陣列是物件
- JS 中，允許動態的新增物件屬性
- 取得物件屬性的語法：
    - 物件名稱.屬性名稱
    - 物件名稱["屬性名稱"]
- 當使用非整數的索引值時，會變成使用物件屬性的語法。

Ex. 使用非整數的索引值

```js
var colors = ['red', 'green', 'blue'];
// 3.5 會轉成字串 "3.5"
colors[3.5] = 'yellow'; 
colors[-1] = 'purple';
```

會產生以下 colors 物件

```js
{
    0: "red",
    1: "green",
    2: "blue",
    '3.5': "yellow",
    '-1': "purple"
}
```

## 陣列元素的: add, delete, update

- 可以新增、刪除或更新陣列的元素

### 新增或更新元素

- 使用指派運算子 (=) 來新增或更新元素
- 索引值超出範圍時，會自動擴展陣列的大小
  - 若有跳號的情況，則會在中間的元素補上 undefined
- 否則, 會更新指定索引的元素

Ex. 新增元素: 索引值超出範圍，並有跳號的情況

```js
var colors = ['red', 'green', 'blue'];
colors[5] = 'yellow';
console.log(colors); // [ 'red', 'green', 'blue', <2 empty items>, 'yellow' ]
```

Ex. 更新元素: 更新第一個元素為 black

```js
var colors = ['red', 'green', 'blue'];
colors[0] = 'black';
console.log(colors); // [ 'black', 'green', 'blue' ]
```

### 加到陣列的最後面的位置

方法 1: 使用 length 屬性取得陣列的長度

```js
var colors = ['red', 'green', 'blue'];
colors[colors.length] = 'yellow';
console.log(colors); // [ 'red', 'green', 'blue', 'yellow' ]
```

方法 2: 使用 push() 方法

```js
var colors = ['red', 'green', 'blue'];
colors.push('yellow');
console.log(colors); // [ 'red', 'green', 'blue', 'yellow' ]
```

Q: 那個程式碼看起來比較優雅？明確表達你的意圖？

### 刪除元素
  
- 使用 delete 運算子來"刪除"元素
- `delete` 並沒有真正的刪除元素
    - 只是將該元素的值設為 undefined
    - 陣列的長度不會改變

Ex. 刪除元素 (陣列長度不變)
```js
var colors = ['red', 'green', 'blue'];
delete colors[1];
console.log(colors); // [ 'red', <1 empty item>, 'blue' ]
```

### delete 運算子的副作用

- delete 運算子會使陣列變得稀疏，因為它不會改變陣列的長度。
- 如果你要移除元素，包含它的位置，請使用陣列的 `splice()` 方法。
  - 避免陣列變得稀疏
- `splice()` 方法用來添加(insert)、更新(update)和刪除(delete)陣列中的元素。
  - 會改變陣列的長度，避免陣列變得稀疏
  - splice 中文意指接合或連接。

See MDN web docs: [Array.prototype.splice() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)


## 遍歷陣列(拜訪陣列的每個元素)

- 遍歷陣列的每個元素是常見的陣列操作
- 常見情境:
  - 印出陣列的每個元素
  - 計算陣列的總和
  - 陣列中的每個元素加 1

### 三種遍歷陣列的方法

- `for` loop: 傳統的方式, 要自己管理 counter
- `for/of` loop: 較新的方式, 會自動管理 counter
- `forEach()` method: 使用 Iterator 物件來遍歷陣列


### for loop  

有一個 colors 陣列，裡面有 red, green, blue 三個顏色，如何印出每個顏色？

```javascript
let colors = ['red', 'green', 'blue'];
```

使用 for loop, 你需要自己管理 counter (或 index ) 的值

```js
for (let i = 0; i < colors.length; i++) {
    console.log(colors[i]);
}
```

Q: 有沒有更簡潔的方式？

### for/of loop

- `for/of` loop 是 ES6 新增的語法
- 會自動管理 counter (或 index ) 的值
- 但你需要一個變數來存放被拜訪(當前)的元素(visited element or current element)

重寫上面的程式碼

```js
for (let color of colors) {
    console.log(color);
}
```

### 取得 index 的值 (使用 for/of loop 的時候)

Q: 使用 for/of loop 的時候，如何取得 index 的值？
  - index 由 JS 自動管理
A: 使用 `Array` 物件的 `entries()` 方法, 回傳陣列元素的 [index, value] 陣列
  - 註: `entries()` 回傳一個 Iterator (迭代器) 物件, 會在後面章節介紹

### 印出陣列元素的 index 及 value 

修改上面的程式碼，使印出顏色的 index 及 value

```js
for (let [index, color] of colors.entries()) {
    console.log(index, color);
}
```

### Quick Practice

有以下的陣列, 請印出每個元素的 index 及 value:

```js
let revengers = ['ironman', 'thor', 'hulk', 'black widow', 'hawk eye'];
```

使用 for/of loop 遍歷陣列。

### forEach() method

Q: 先前的 for/of loop 的 block 中的內容如果要重複使用，該怎麼辦？

有以下兩個陣列, 印出每個元素:

```js
let colors = ['red', 'green', 'blue'];
let fruits = ['apple', 'banana', 'orange'];
```

如果使用 for/of loop 的話，會有重複的 block:

```js
for (let color of colors) {
    console.log(color);
}
for (let fruit of fruits) {
    console.log(fruit);
}
```

### 將重複的 block 抽出來變成 function 重覆使用

```js
function printElement(el) {
    console.log(el);
}
```

撘配 forEach() method, 套用此函數到每個元素:

```js
colors.forEach(printElement);
fruits.forEach(printElement);
```

### forEach(callback) method

- [forEach(callback)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method 是陣列物件提供 iterative method
- 接受一個函數作為參數, 應用此函數到每個元素
- 遍歷過程中可對每個元素套用函數，並產生新的陣列
    - 原來的陣列不會改變
-  這種設計思維的方式來自於「函數式編程」(Functional Programming)


### Quick Practice

有以下的陣列, 我們期望將內容轉成大寫並印出來:

```js
let colors = ['red', 'green', 'blue'];
let fruits = ['apple', 'banana', 'orange'];
```

使用 forEach() method 完成要求。

Hints:
- 先定義一個函數，將傳入的參數轉成大寫並印出來 
  - 使用 `String` 物件的 `toUpperCase()` 方法轉成大寫
- 接著使用 forEach() method 套用此函數到每個元素

---

<details>
<summary>參考答案</summary>

```js
function printUpperCase(el) {
    console.log(el.toUpperCase());
}
colors.forEach(printUpperCase);
fruits.forEach(printUpperCase);
```
</details>

---

### ForEach() 的 callback function 的簽名

若只想要元素的值，則只需要一個參數

```js
function callback(element) {
    // ...
}
```
若還需要 index 的值，則需要兩個參數

```js
function callback(element, index) {
    // ...
}
```
若還需要陣列本身的參考，則需要三個參數

```js
function callback(element, index, array) {
    // ...
}
```
- index 及 array 是選用的參數

## 陣列的進階操作方法

陣列物件提供許多方法來操作陣列: 

- 新增和替換元素: `push()`, `unshift()`, `splice()`
- 移除元素: `pop()`, `shift()`, `splice()`
- 切片: `slice()`
- 尋找元素: `indexOf()`, `find()`
- 排序: `sort()`, `reverse()`
- 陣列串接: `concat()`, `join()`

### push() and pop() 

情境: 自陣列的尾端新增或移除元素

- `push()` 方法: 在陣列的尾端新增一個或多個元素
- `pop()` 方法: 移除陣列的尾端元素

Ex. 現有 5 個人在排隊，請將 6 個人加入隊伍中

```js
let queue = ['A', 'B', 'C', 'D', 'E'];
queue.push('F');
console.log(queue); // [ 'A', 'B', 'C', 'D', 'E', 'F' ]
```
Ex. 現有 6 個人在排隊，請將最後一個人移除

```js
let queue = ['A', 'B', 'C', 'D', 'E', 'F'];
queue.pop();
console.log(queue); // [ 'A', 'B', 'C', 'D', 'E' ]
```

### unshift() and shift()

情境: 自陣列的**前端**新增或移除元素

- `unshift()` 方法: 在陣列的前端新增一個或多個元素
- `shift()` 方法: 移除陣列的前端元素(整個元素的位罝會往前移動, 第0個元素從陣列中移除)
  - 回傳被移除的元素

Ex. 現有 5 個人在排隊, 第一個人己完成服務，後面的人要往前移動

```js
let queue = ['A', 'B', 'C', 'D', 'E'];
queue.shift();
console.log(queue); // [ 'B', 'C', 'D', 'E' ]
```

Ex. 剛離開的人因故回來了，請將他加入隊伍的前端

```js
let queue = ['B', 'C', 'D', 'E'];
queue.unshift('A');
console.log(queue); // [ 'A', 'B', 'C', 'D', 'E' ]
```

### Quick Practice

1. 有三個人, 分別為 Jack, Tom, Mary, 排隊買票，用一陣列描述。

2. Jack 已經買完票了，請將他移除並印出他的名字。更改隊伍的順序。

3. Emily 來了，請將她加入隊伍的尾端。

4. Sophia 來了，是 VIP，請將她加入隊伍的前端。

5. 印出隊伍的順序。

---

<details>
<summary>參考答案</summary>

```js
let queue = Array.of('Jack', 'Tom', 'Mary');
console.log(queue.shift()); // Jack
queue.push('Emily');
queue.unshift('Sophia');
console.log(queue); // [ 'Sophia', 'Tom', 'Mary', 'Emily' ]
```
</details>

### splice(): 新增、更新或刪除元素

- 一個可用於在陣列中新增、移除和替換元素的通用方法。
- 優點: 
  - 不會產生稀疏的陣列，因為會改變陣列的長度
- 小心: 
  - 會改變原始陣列的內容

`splice()` 方法對陣列進行的操作：
1. 移除: 從 `start` 索引開始移除 `deleteCount` 個元素。
2. 新增: 在 `start` 索引處插入 `item1, item2, ...` 等元素。
  - `start` 索引後的原始元素會向右移動。
3. 更新: 當 `deleteCount` = 1 時，更新 `start` 索引處的元素。

`splice()` 方法會修改原始陣列，並回傳:
- 被移除的元素的陣列
- 如果沒有移除任何元素，則回傳空陣列

#### splice() 在特定位置新增元素

- 有 months 陣列 `months = ['Jan', 'March', 'April', 'June'];`
- 缺了二月，請將二月加到 Jan 和 March 之間

```js
let months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
console.log(months); // [ 'Jan', 'Feb', 'March', 'April', 'June' ]
```

---

Syntax:

```js
array.splice(start, deleteCount, item1, item2, ...);
```
- `start`: 開始位置的索引值 
- `deleteCount`: 要刪除的元素數量
- `item1, item2, ...`: 要新增的多個元素清單

---

#### splice() 更新特定的元素

- 更新 Feb 及 March 為 February 及 March
- 沒有直接的更新，必須先刪除再新增

```js
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun'];
months.splice(1, 2, 'February', 'March');
console.log(months); // [ 'Jan', 'Febuary', 'March', 'April', 'June' ]
```

#### splice() 刪除特定的元素

- 刪除 Apr 及 Jun
- 注意: 會改變原始陣列的內容

```js
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun'];
removedElm = months.splice(3, 2);
console.log(months); // [ 'Jan', 'Feb', 'Mar' ]
console.log(removedElm); // [ 'Apr', 'Jun' ]
```

#### Quick Practice

#### Quick Practice

給定以下的陣列: `['A', 'B', 'C']`, 請插入值 `'1'`, `'2'` 使其變成 `['A', '1', '2', 'B', 'C']`。

<details>
<summary>參考答案</summary>

```js
let arr = ['A', 'B', 'C'];
arr.splice(1, 0, '1', '2');
console.log(arr);  // ['A', '1', '2', 'B', 'C']
```
</details>

### slice() 取出某個範圍的元素

- `slice(start, end)` 方法用來取出陣列中某個範圍的元素
- 回傳一個新的陣列
- 不會改變原始陣列的內容

Syntax:

```js
slice()  // 取出整個陣列
slice(start)  // 取出從 start 開始到陣列的最後一個元素
slice(-start) // 取出後面的 n 個元素 (從倒數 start 的位置取到最後一個元素)
slice(start, end) // 取出從 start 開始到 end - 1 的元素
```

---

由**前往後**及由**後往前**的 index 

```
read from start --->
   0     1     2     3     4
|     |     |     |     |     |
|  S  |  L  |  I  |  C  |  E  |
|     |     |     |     |     |
  -5    -4    -3    -2    -1
<--- read from reverse
```

#### Example

```js
// 從 index 2 開始取到最後一個元素
const fruits = ["Apple", "Banana", "Orange", "Mango", "Pineapple"];

const tropical = fruits.slice(2);
console.log(tropical); // ['Orange', 'Mango', 'Pineapple']

// 從倒數第 2 個元素開始取到最後一個元素
const lastTwo = fruits.slice(-2);
console.log(lastTwo); // ['Mango', 'Pineapple']

```

#### Quick Practice

有以下的 URL 字串 `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice`

使用 split('/') 方法將字串切割成陣列，並使用 slice() 方法取出 
1. `Array` 及 `slice` 的部分。
2. domain name 及語系 的部分 `developer.mozilla.org` and `en-US`

<details>
<summary>參考答案</summary>

```js
let url = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice';
let arr = url.split('/');
let arr2 = arr.slice(-2);
console.log(arr2); // [ 'Array', 'slice' ]
console.log(arr.slice(2, 4)); // [ 'developer.mozilla.org', 'en-US' ]
```

### ... 展開運算子 將陣列轉成值清單

- `...` 運算子(三個點)是 ES6 新增的語法
- 也稱為 展開運算子(spread operator)
- 可以將陣列轉換為清單值

`['A', 'B', 'C']` 轉換為 `'A', 'B', 'C'`

#### 使用情境 1

- 將陣列轉換為函數的引數

將 ['1', '2', '3']  插入到 陣列 ['D', 'E', 'F'] 的 D 和 E 之間。
使用 splice() 方法

```js
let arr1 = ['1', '2', '3'];
let arr2 = ['D', 'E', 'F'];
arr2.splice(1, 0, ...arr1);
console.log(arr2); // [ 'D', '1', '2', '3', 'E', 'F' ]
```

如果沒有展開運算子，會將整個陣列當成一個值

```js
let arr1 = ['1', '2', '3'];
let arr2 = ['D', 'E', 'F'];
arr2.splice(1, 0, arr1);
console.log(arr2); // [ 'D', [ '1', '2', '3' ], 'E', 'F' ]
```

#### 使用情境 2

- 在 Array Literal 中使用展開運算子, 將某個陣列的內容加入到另一個陣列中

```js
let arr1 = ['1', '2', '3'];
let arr2 = ['D', 'E', 'F', ...arr1];
console.log(arr2); // [ 'D', 'E', 'F', '1', '2', '3' ]
```

### Concatenate() 串接兩個陣列內的元素

Scenario: 有多個陣列, 想要將他們的元素串接在一起, 變成一個陣列

- 使用 `concat()` 方法
- `concat()` 方法會回傳一個新的陣列
- 不會改變原始陣列的內容

syntax:
```js
concat()  //  回傳目前的陣列的 copy
concat(value1)  //
concat(value1, value2)
concat(value1, value2, /* …, */ valueN)
```
- value 可以是陣列或值

```js
let arr1 = ['A', 'B', 'C'];
let arr2 = ['D', 'E', 'F'];
let arr3 = ['G', 'H', 'I'];
let arr4 = arr1.concat(1, 2, arr2, arr3);
console.log(arr4); // [ 'A', 'B', 'C', 1, 2, 'D', 'E', 'F', 'G', 'H', 'I' ]
```

### join() 串接陣列內的元素

- `join()` 方法用來將陣列中的元素串接成一個字串
- 不會改變原始陣列的內容
- 回傳串接後的字串

Syntax:
```js
join() // 使用預設的逗號分隔
join(separator) // 使用指定的分隔符號串接
```

Ex. 將陣列中的元素串接成一個字串, 用 '-' 分隔

```js
let strs = Array.from('hello');
let str = strs.join('-');
console.log(str); // h-e-l-l-o
```

### 排序元素

- `sort()` 將陣列中的元素進行排序, 預設由小到大
- `reverse()` 將陣列中的元素反轉

注意:
1. 會改變原始陣列的內容
2. 預設會將內容轉成字串進行排序
   - 若要使用其他的排序方式，則需要提供一個比較函數

Sort syntax:

```js
sort()
sort(compareFn)
```

#### 排序字串

將陣列中的內容由小到大排序

```js
let arr = [1, 100, 2, 12 , 21]
arr.sort();
console.log(arr); // [ 1, 100, 12, 2, 21 ]
```
- 會將內容轉成字串進行排序

#### 排序數字

- 若要使用數字進行排序，則需要提供一個比較函數
  - a > b 時，回傳正數,
  - a < b 時，回傳負數,
  - a = b 時，回傳 0

```js
function compValue(a, b) {
    return a - b;
}

let arr = [1, 100, 2, 12 , 21]
arr.sort(compValue);
console.log(arr); // [ 1, 2, 12, 21, 100 ]
```

#### Quick Practice

將字串 'Hello World' 反轉成 'dlroW olleH'

Hints:
- 將字串轉成 char array
- 使用 reverse() 方法反轉陣列
- 使用 join() 方法將陣列轉成字串

<details>
<summary>參考答案</summary>

```js
let str = 'Hello World';
let arr = Array.from(str);
// or arrs = Array.of(...str);
arr.reverse();
let newStr = arr.join('');
console.log(newStr); // dlroW olleH
```
</details>


## 陣列的迭代方法 (Iterative Methods)

TODO: TBD



