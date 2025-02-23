# ch2_part_1 學習重點


## 學習重點
1. JavaScript 變數宣告與命名規則
2. 基本資料型別 (number, string, boolean)
3. 運算子使用 (算術、比較、邏輯運算子)
4. 型別轉換 (型別自動轉換與強制轉換)


## 複習題目

### 1. 變數宣告

Q: 以下哪些變數命名是合法的？為什麼？
```javascript
let 1stName = "John";
let first_name = "John";
let firstName = "John";
let first-name = "John";
let $name = "John";
```

### 2. 資料型別

Q: 下列程式碼會輸出什麼？請解釋原因。

```javascript
let num = 42;
let str = "42";
console.log(typeof num);
console.log(typeof str);
console.log(num == str);
console.log(num === str);
```

### 3. 運算子

Q: 請說明以下運算結果為何？
```javascript
let x = 5;
let y = "10";
console.log(x + y);
console.log(x * y);
console.log(x && y);
```

### 4. 型別轉換

Q: 以下程式碼的輸出結果為何？請解釋原因。
```javascript
console.log(Number("123"));
console.log(Number("12.3"));
console.log(Number("Hello"));
console.log(String(123));
console.log(Boolean(""));
console.log(Boolean(0));
```
