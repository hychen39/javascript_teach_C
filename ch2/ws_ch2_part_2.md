# JavaScript 基礎語法 (2) 複習題目

## 學習重點
1. 型別自動偵測
2. 明確型別轉換 (Explicit Type Conversion)
3. 自動型別轉換 (Type Coercion)
4. 不同型別的比較

## 複習題目

### 1. 型別自動偵測
Q: 以下程式碼中，變數 `value` 在每次指派後的型別為何？請說明 JavaScript 如何判斷型別。
```javascript
let value = 42;
value = "Hello";
value = true;
value = null;
```

### 2. 明確型別轉換

Q: 請說明以下程式碼的執行結果，並解釋每個轉換函數的用途：
```javascript
let num = 42;
console.log(String(num));
console.log(num.toString(2));
console.log(Number("3.14"));
console.log(parseInt("3.14"));
console.log(Boolean(""));
console.log(Boolean("false"));
```

### 3. 自動型別轉換

Q: 解釋以下運算的結果，並說明 JavaScript 的自動型別轉換規則：
```javascript
console.log(5 + "10");
console.log("5" - 2);
console.log(true + 1);
console.log("3" * "2");
console.log(1 + true + "2");
```

### 4. 不同型別的比較
Q: 請預測以下比較運算的結果，並解釋原因：
```javascript
console.log(5 == "5");
console.log(5 === "5");
console.log(0 == false);
console.log(0 === false);
console.log("abc" > 5);
console.log(null == undefined);
console.log(null === undefined);
```

### 5. 型別轉換實務應用

Q: 以下程式碼中有什麼潛在問題？如何改善？
```javascript
let userInput = "42.5";
let quantity = userInput + 10;
let price = 100;
let total = quantity * price;
console.log("Total price: " + total);
```