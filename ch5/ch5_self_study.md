# Ch5 陣列操作基本方法(Self-Study)

陣列物件提供許多方法來操作陣列, 常用的方法有: 

- 串接陣列: `concat()`,
- 串接陣列中的元素: `join()`
- 新增和替換元素: `push()`, `unshift()`, `splice()`
- 移除元素: `pop()`, `shift()`, `splice()`


### Concat() 串接兩個陣列內的元素

情境: 有多個陣列, 想要將他們的元素串接在一起, 變成一個陣列

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
---

Ex. 將元素與陣列串接在一起
```js
let arr1 = ['A', 'B', 'C'];
let arr2 = ['D', 'E', 'F'];
let arr3 = ['G', 'H', 'I'];
let arr4 = arr1.concat(1, 2, arr2, arr3);
console.log(arr4); // [ 'A', 'B', 'C', 1, 2, 'D', 'E', 'F', 'G', 'H', 'I' ]
```


### join() 串接陣列內的元素變成字串

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


### push() and pop() 

情境: 自陣列的尾端新增或移除元素

- `push(...x)` 方法: 在陣列的尾端新增一個或多個元素
  - 回傳陣列的新長度
- `pop()` 方法: 移除陣列的尾端元素
  - 回傳被移除的元素

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

- `unshift(...x)` 方法: 在陣列的前端新增一個或多個元素
  - 回傳陣列的新長度
- `shift()` 方法: 移除陣列的前端元素(整個元素的位罝會往前移動, 第0個元素從陣列中移除)
  - 回傳被移除的元素

Ex. 現有 5 個人在排隊, 第一個人己完成服務，後面的人要往前移動

```js
let queue = ['A', 'B', 'C', 'D', 'E'];
let complete = queue.shift();
console.log(complete); // A
console.log(queue); // [ 'B', 'C', 'D', 'E' ]
```

---

Ex. 剛離開的人因故回來了，請將他加入隊伍的前端

```js
let queue = ['B', 'C', 'D', 'E'];
queue.unshift('A');
console.log(queue); // [ 'A', 'B', 'C', 'D', 'E' ]
```

### Practice

#### P1

撰寫程式完成以下任務:

1. 有三個人, 分別為 Jack, Tom, Mary, 排隊買票，用一陣列描述。

2. Jack 已經買完票了，請將他自隊伍中移除並印出他的名字。更改隊伍的順序。

3. Emily 來了，請將她加入隊伍的尾端。

4. Sophia 來了，是 VIP，請將她加入隊伍的前端。

5. 印出隊伍的順序。

#### P2 

分析及歸納 `push()`, `pop()`, `unshift()`, `shift()` 這四個方法在使用上的共通規則。那些時候會回傳陣列的新長度？那些時候會回傳被移除的元素？