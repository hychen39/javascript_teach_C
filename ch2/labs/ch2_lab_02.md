
## Mini Lab 02：資料型別與原生型別（10 分鐘）

🎯 **學習目標**

- 分辨原生型別與參考型別
- 理解 null 與 undefined 的語意差異
- 觀察不同資料型別在運算時的行為
- 能解釋為何會產生特定輸出結果

---

### Part 1：閱讀並預測結果（4 分鐘）

請閱讀下列程式碼，**先不要執行**，寫下你預測的輸出結果。

```js
let a = 10;
let b = a;
b = 20;

console.log(a); 
console.log(b);

let x;
let y = null;

console.log(x);
console.log(y);

console.log(100 * (1 - x));
console.log(100 * (1 - y));
```

請回答：

1. a 和 b 為何會產生不同結果？
2. x 和 y 的值分別是什麼？
3. 為何其中一個運算結果是 NaN？
4. 哪些變數屬於原生型別？

---

### Part 2：找出型別問題並修改（4 分鐘）

某線上商店折扣計算如下：

```js
let price = "100";
let discount;

let finalPrice = price - discount;
console.log(finalPrice);
```

請回答：

1. price 是什麼型別？
2. discount 是什麼型別？
3. 程式執行後會得到什麼結果？為什麼？

請修改程式，使其：

- 不會產生 NaN
- 型別清楚
- 初始化合理

請在下方撰寫你的修改版本：

```js
// 在此改寫
```

---

### Part 3：反思（2 分鐘）

討論：

1. 為什麼需要區分 null 和 undefined？
2. 原生型別與參考型別在記憶體儲存方式上有何不同？
3. 動態型別在這個範例中帶來了什麼風險？

---

✅ 完成本 Lab 後，你應能：

- 正確判斷變數型別
- 理解 undefined 參與運算會導致 NaN
- 理解 null 會被轉換為 0
- 說明原生型別是「值複製」

---
