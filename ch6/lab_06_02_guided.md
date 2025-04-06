# Lab 6.2: 使用 IIFE 建立隨機描述模組

## 實驗目標
學習如何使用 **IIFE（Immediately Invoked Function Expression）** 建立模組，並實作一個隨機描述名稱的功能。

## 背景知識

### 1. IIFE (立即執行函數)

IIFE 是一種立即執行的函數表達式，常用於建立模組或者避免變數污染全域命名空間。

語法範例：
```javascript
(function() {
    // 函數內的變數是私有的
    console.log("This is an IIFE");
})();
```

### 2. 隨機數生成
- `Math.random()`: 生成 0 到 1 之間的隨機數（不包含 1）。
- `Math.floor()`: 將數字向下取整。


## 實驗步驟

### 步驟 1: 建立私有的描述詞陣列

在 IIFE 中定義一個私有的陣列，包含描述詞：

```javascript
let words = ['smart', 'funny', 'kind', 'hardworking', 'intelligent', 'creative', 'humble', 'caring', 'loving'];
```

### 步驟 2: 定義隨機描述函數

建立一個函數 `randomWord`，接收一個名稱作為參數，並從描述詞陣列中隨機選擇一個詞：
```javascript
function randomWord(name) {
    let randomIndex = Math.floor(Math.random() * words.length);
    return `${name}, you are ${words[randomIndex]}.`;
}
```

### 步驟 3: 將函數公開

使用 IIFE 的方式，將 `randomWord` 函數公開到全域命名空間：

```javascript
global.praiseModule = {
    randomWord: randomWord
};
```

完整程式碼：
```javascript
(function() {
    let words = ['smart', 'funny', 'kind', 'hardworking', 'intelligent', 'creative', 'humble', 'caring', 'loving'];

    function randomWord(name) {
        let randomIndex = Math.floor(Math.random() * words.length);
        return `${name}, you are ${words[randomIndex]}.`;
    }

    global.praiseModule = {
        randomWord: randomWord
    };
})();
```

Note:
- `global` 是 Node.js 中的全域物件，若在瀏覽器中使用，則可以直接使用 `window` 物件。

## 測試範例

### 測試 1: 隨機描述名稱

```javascript
console.log(praiseModule.randomWord('Alice'));
console.log(praiseModule.randomWord('Alice'));
console.log(praiseModule.randomWord('Alice'));
console.log(praiseModule.randomWord('Alice'));
```

範例輸出：
```
Alice, you are smart.
Alice, you are funny.
Alice, you are kind.
Alice, you are hardworking.
```

---

## 問題與討論

1. **為什麼要使用 IIFE？**

<details>
<summary>點擊展開</summary>

   - 避免變數污染全域命名空間。
   - 提供模組化的結構。

</details>


2. **如何確保描述詞陣列是私有的？**

<details>
<summary>點擊展開</summary>

   - 將陣列定義在 IIFE 中，外部無法直接存取。
  
</details>

3. **如何擴展模組功能？**

<details>
<summary>點擊展開</summary>

- 可以在 `praiseModule` 中新增更多函數，例如：

```javascript
global.praiseModule = {
    randomWord: randomWord,
    addWord: function(word) {
        words.push(word);
    }
};
```
</details>
