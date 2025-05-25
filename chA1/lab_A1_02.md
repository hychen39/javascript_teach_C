# Lab 13-02A：使用 Promise 物件

在本實驗中，我們將使用 Promise 物件重寫 Lab 13-01 的程式碼。



## 使用 Promise 重寫的程式碼

### 步驟 1. 建立一個回傳 Promise 物件的函式

將要執行的程式碼放在 Promise 物件的執行器（executor）函式中。

透過呼叫 `resolve` 或 `reject` 函式來改變 Promise 物件的狀態。
- 當操作成功時呼叫 `resolve`。
- 當操作失敗時呼叫 `reject`。

```javascript
function delayFunProm(message, delay) {
    return new Promise((resolve, reject) => {
        // Simulate an asynchronous operation using setTimeout
        setTimeout(() => {
           console.log(message);
           resolve(`delay ${delay} ms`);
        }, delay);
    });
}
```

### 步驟 2. 執行第一次非同步操作

```javascript
delayFunProm()
    .then(result => {
        console.log(result);
    })
```

執行程式碼，觀察主控台的輸出。

### 步驟 3. 在第一次操作完成後執行第二次非同步操作

修改程式碼，加入第二次非同步操作：

```javascript
delayFunProm("Step 1", 1000)
    .then(result => {
        console.log(result);
        // 執行第二次非同步操作並回傳新的 Promise 物件
        return delayFunProm("Step 2", 1000);
    })
    .then(result => {
        console.log(result);
    });
```

### 步驟 4. 在第二次操作完成後執行第三次非同步操作

在第二個 callback 中加入第三次非同步操作：

```javascript
delayFunProm("Step 1", 1000)
    .then(result => {
        console.log(result);
        return delayFunProm("Step 2", 1000);
    })
    .then(result => {
        console.log(result);
        return delayFunProm("Step 3", 1000);
    })
    .then(result => {
        console.log(result);
    });
```

恭喜！你已經成功使用 Promise 物件重寫了程式碼。

你覺得程式碼變得更易讀、更容易理解了嗎？

