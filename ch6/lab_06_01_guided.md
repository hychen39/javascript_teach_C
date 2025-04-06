# Lab 6.1: 計算 BMI 指數

## 實驗目標

學習如何使用不同的函數定義方式（函數宣告、函數表達式、箭頭函數）來實作計算 BMI（Body Mass Index）的功能。


## 背景知識
BMI 是用來衡量一個人的體重是否在健康範圍內的指標，計算公式如下：

```
BMI = 體重 (公斤) / 身高 (公尺)^2
```


## 實驗步驟

### 1. 使用函數宣告 (Function Statement)

函數宣告是最常見的函數定義方式，適合用於需要在程式中多次使用的功能。

```javascript
function calBMI(weight, height) {
    height = height || 0; // 如果 height 未提供，預設為 0
    return weight / (height * height);
}
```

### 2. 使用函數表達式 (Function Expression)

函數表達式將函數賦值給變數，適合用於需要動態定義函數的情境。

```javascript
let calBMI = function(weight, height) {
    height = height || 0; // 如果 height 未提供，預設為 0
    return weight / (height * height);
};
```

### 3. 使用箭頭函數 (Arrow Function)

箭頭函數是 ES6 引入的語法，適合用於簡短的函數定義。

```javascript
let calBMI = (weight, height) => {
    height = height || 0; // 如果 height 未提供，預設為 0
    return weight / (height * height);
};
```

---

## 測試範例

### 範例 1: 正常輸入

```javascript
console.log(calBMI(70, 1.75)); // 輸出: 22.857142857142858
```

### 範例 2: 缺少 height
```javascript
console.log(calBMI(70)); // 輸出: Infinity (因為 height 預設為 0)
```

## 問題與討論

1. **為什麼需要 `height = height || 0`？**

<details>
<summary>點擊展開</summary>

- 這行程式碼的目的是為了確保當 `height` 參數未提供時，預設值為 `0`。
- 避免在計算 BMI 時出現除以零的錯誤。

</details>


2. **函數宣告與函數表達式有什麼差異？**

<details>
<summary>點擊展開</summary>

   - 函數宣告會被提升（hoisting），可以在定義之前呼叫。
   - 函數表達式不會被提升，必須在定義之後才能呼叫。

</details>

3. **箭頭函數有什麼特點？**

<details>
<summary>點擊展開</summary>

   - 語法簡潔。
   - 不會綁定自己的 `this`，適合用於回呼函數（callback）。

</details>