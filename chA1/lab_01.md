# 實驗：理解 JavaScript 中的 Callback Hell

## 目標：
在本實驗中，你將學習 callback hell，這是在非同步 JavaScript 程式設計中常見的問題。你將體驗到巢狀回呼如何讓程式碼變得難以閱讀與維護。

## 情境說明

你必須依序控制多個非同步操作。

有三個需要依序執行的非同步操作：
1. 延遲 1 秒後顯示「Step 1」。
2. 在「Step 1」訊息後，再延遲 1 秒顯示「Step 2」。
3. 最後在「Step 2」訊息後，再延遲 1 秒顯示「Step 3」。

## 指示：

建立一個新的 JavaScript 檔案，命名為 lab_callback_hell.js。

### 步驟 1：建立一個模擬非同步操作的函式

```js
function delayFun(message, delay, callback) {
  setTimeout(() => {
    console.log(message);
    if (!!callback){
      callback();
    }
  }, delay);
}
```

### 說明：
- delayFun 函式使用 setTimeout 模擬非同步操作。

- 它接受要顯示的訊息、延遲的毫秒數，以及延遲後要執行的回呼函式。

### 步驟 2：執行第一個非同步操作

```js
delayFun("Step 1", 1000);
```

執行程式碼，觀察主控台的輸出。

你應該會看到訊息「Step 1」在延遲 1 秒後顯示。

### 步驟 3：在第一個操作完成後執行第二個非同步操作

修改傳遞給第一個 delayFun 的匿名函式，加入第二個非同步操作：

```js
delayFun("Step 1", 1000, () => {
    delayFun("Step 2", 1000);
});
```

執行程式碼，觀察主控台的輸出。

你應該會看到訊息「Step 1」和「Step 2」依序在各自延遲 1 秒後顯示。

### 步驟 4：在第二個操作完成後執行第三個非同步操作

在第二個回呼中加入第三個非同步操作：

```js
delayFun("Step 1", 1000, () => {
    delayFun("Step 2", 1000, () => {
        delayFun("Step 3", 1000);
    });
});
```

執行程式碼，觀察主控台的輸出。

你應該會看到訊息「Step 1」、「Step 2」和「Step 3」依序在各自延遲 1 秒後顯示。

恭喜你！你已經成功完成本實驗，並體驗了在以巢狀回呼控制非同步操作時所產生的 callback hell。

這種方式會讓程式碼變得難以閱讀與維護。在下一個實驗中，你將學習 promises，一種更好的處理 JavaScript 非同步操作的方法。
