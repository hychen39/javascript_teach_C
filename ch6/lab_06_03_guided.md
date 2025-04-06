# Lab 6.3: 建立簡易加法與乘法計算器

## 實驗目標
1. 學習如何使用函數處理可變數量的參數。
2. 使用物件或 Map 來管理多個函數。
3. 實作一個簡易的加法與乘法計算器，能根據輸入的字串執行對應的運算。

---

## 實驗需求
1. 建立一個 `sum` 函數，接收可變數量的參數並回傳參數的總和。
2. 建立一個 `multiply` 函數，接收可變數量的參數並回傳參數的乘積。
3. 實作一個函數，能根據輸入的字串呼叫 `sum` 或 `multiply` 函數。
4. 對於輸入字串 `"sum 1 2 3 4"`，程式應呼叫 `sum` 函數並輸出結果。
5. 對於輸入字串 `"multiply 1 2 3 4"`，程式應呼叫 `multiply` 函數並輸出結果。

---

## 實驗步驟

### 步驟 1: 定義 `sum` 函數

建立一個函數，接收可變數量的參數並計算總和：

```javascript
const sum = (...args) => {
    let total = 0;
    for (let value of args) {
        total += Number(value); // 確保參數為數字
    }
    return total;
};
```

### 步驟 2: 定義 `multiply` 函數

建立一個函數，接收可變數量的參數並計算乘積：
```javascript
const multiply = (...args) => {
    let total = 1;
    for (let value of args) {
        total *= Number(value); // 確保參數為數字
    }
    return total;
};
```

### 步驟 3: 使用物件管理函數

將 `sum` 和 `multiply` 函數存入物件，方便根據名稱動態呼叫：
```javascript
const operations = {
    sum: sum,
    multiply: multiply
};
```

### 步驟 4: 定義通用的函數執行器

建立一個函數 `invokeOperation`，接收函數和參數，並執行該函數：

```javascript
function invokeOperation(func, ...args) {
    return func(...args);
}
```

### 步驟 5: 實作計算器主邏輯

建立一個函數 `calculate`，解析輸入字串並執行對應的運算：
```javascript
function calculate(str) {
    let [operation, ...args] = str.split(" "); // 將字串分割為操作名稱與參數
    let result = invokeOperation(operations[operation], ...args); // 呼叫對應的函數
    console.log(result); // 輸出結果
}
```

### 步驟 6: 測試程式
測試輸入字串是否能正確執行對應的運算：
```javascript
let testStr1 = "sum 1 2 3 4";
let testStr2 = "multiply 1 2 3 4";

calculate(testStr1); // 輸出: 10
calculate(testStr2); // 輸出: 24
```

---

## 程式完整碼
```javascript
const operations = {
    sum: (...args) => {
        let total = 0;
        for (let value of args) {
            total += Number(value);
        }
        return total;
    },
    multiply: (...args) => {
        let total = 1;
        for (let value of args) {
            total *= Number(value);
        }
        return total;
    }
};

function invokeOperation(func, ...args) {
    return func(...args);
}

function calculate(str) {
    let [operation, ...args] = str.split(" ");
    let result = invokeOperation(operations[operation], ...args);
    console.log(result);
}

let testStr1 = "sum 1 2 3 4";
let testStr2 = "multiply 1 2 3 4";

calculate(testStr1); // 10
calculate(testStr2); // 24
```

---

## 問題與討論

1. **為什麼使用物件來管理函數？**
   - 物件提供了一個簡單的方式來根據名稱動態呼叫函數，讓程式更具彈性。

2. **如何處理無效的輸入？**
   - 可以在 `calculate` 函數中加入檢查，確保 `operation` 存在於 `operations` 物件中。

3. **如何擴展功能？**
   - 可以在 `operations` 物件中新增更多運算函數，例如 `subtract` 或 `divide`。

---

## 延伸挑戰

- 使用 Array 物件的 `reduce` 方法來實作 `sum` 和 `multiply` 函數。

