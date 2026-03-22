# Lab 4.1: 使用 Currency.js 處理電子商務購物車金額

## 實驗目標

在這個 lab 中，你將在純 JavaScript 程式環境中練習使用 `currency.js` 處理電子商務常見的金額情境。

完成後，你應能：
- 使用 `npm install` 安裝第三方套件
- 使用 `import` 載入 `currency.js`
- 使用 `currency.js` 建立金額物件
- 將商品單價格式化為貨幣字串
- 由貨幣字串取得可運算的數值
- 使用 `add()`、`multiply()`、`subtract()` 計算購物車總金額
- 觀察 `currency.js` 如何降低浮點數誤差問題

預估時間：10 分鐘

## 情境說明

你正在開發一個簡單的電子商務購物車計算程式。

購物車中有一項商品：
- 商品名稱：`Wireless Mouse`
- 單價：`$19.99`
- 數量：`2`
- 折扣：`$5.00`

請使用 `currency.js` 計算：
- 商品小計
- 折扣後總金額
- 格式化後的輸出結果

---

## 步驟 1：建立專案資料夾

先建立一個新的資料夾，例如 `lab_currency_cart`，然後用終端機切換到該資料夾。

```bash
mkdir lab_currency_cart
cd lab_currency_cart
```

---

## 步驟 2：初始化 npm 專案

在終端機執行：

```bash
npm init -y
```

這個指令會建立 `package.json`。

接著，請將 `package.json` 裡加入以下設定，讓 Node.js 可以使用 `import`：

```json
{
    "type": "module"
}
```

你可以把它加入到原本的 `package.json` 中，例如：

```json
{
    "name": "lab_currency_cart",
    "version": "1.0.0",
    "main": "index.js",
    "type": "module"
}
```

### 說明

- `npm init -y`：快速建立 npm 專案
- `"type": "module"`：讓 `.js` 檔案可以使用 ES Module 的 `import`

---

## 步驟 3：安裝 Currency.js

在終端機執行：

```bash
npm install currency.js
```

### 說明

- 這會把 `currency.js` 安裝到 `node_modules`
- 並在 `package.json` 中加入相依套件資訊

---

## 步驟 4：建立 JavaScript 檔案並 import 套件

建立 `index.js`，加入以下程式碼：

```js
import currency from "currency.js";

let productName = "Wireless Mouse";
let unitPriceText = "$19.99";
let quantity = 2;
let discountText = "$5.00";
```

### 說明

- `import currency from "currency.js";` 是這個 lab 的重點之一
- 這表示我們不是使用 JavaScript 內建物件，而是載入第三方函式庫

---

## 步驟 5：將貨幣字串轉成金額物件

在 `index.js` 中繼續加入：

```js
let unitPrice = currency(unitPriceText);
let discount = currency(discountText);

console.log(unitPrice.value); // 19.99
console.log(discount.value); // 5
```

### 說明

- `currency("$19.99")` 可以分析貨幣字串
- `.value` 可以取得其中的數值
- 這表示 `currency.js` 具有基本的「反格式化」能力

---

## 步驟 6：計算購物車小計與折扣後總額

加入以下程式碼：

```js
let subtotal = unitPrice.multiply(quantity);
let finalTotal = subtotal.subtract(discount);

console.log(subtotal.value); // 39.98
console.log(finalTotal.value); // 34.98
```

### 說明

- `multiply(quantity)`：計算商品小計
- `subtract(discount)`：扣除折扣
- 回傳值仍然是 `currency` 物件，因此可以繼續做金額運算

---

## 步驟 7：格式化輸出結果

加入以下程式碼：

```js
console.log(`Product: ${productName}`);
console.log(`Unit Price: ${unitPrice.format()}`);
console.log(`Quantity: ${quantity}`);
console.log(`Subtotal: ${subtotal.format()}`);
console.log(`Discount: ${discount.format()}`);
console.log(`Final Total: ${finalTotal.format()}`);
```

### 預期輸出

```text
Product: Wireless Mouse
Unit Price: $19.99
Quantity: 2
Subtotal: $39.98
Discount: $5.00
Final Total: $34.98
```

### 說明

- `.format()` 可將金額格式化為貨幣字串
- 在純 JavaScript 程式中，我們使用 `console.log()` 觀察結果

---

## 步驟 8：觀察浮點數誤差問題

先加入原生 `number` 的測試：

```js
console.log(0.1 + 0.2); // 0.30000000000000004
```

再加入 `currency.js` 的測試：

```js
let preciseTotal = currency(0.1).add(0.2);
console.log(preciseTotal.value); // 0.3
```

### 說明

- 原生浮點數在金額計算上可能出現誤差
- `currency.js` 更適合處理價格、折扣、稅額與總計

---

## 步驟 9：執行程式

在終端機執行：

```bash
node index.js
```

如果一切正確，應能看到購物車計算結果與浮點數比較結果。

---

## 完整參考程式碼

```js
import currency from "currency.js";

let productName = "Wireless Mouse";
let unitPriceText = "$19.99";
let quantity = 2;
let discountText = "$5.00";

let unitPrice = currency(unitPriceText);
let discount = currency(discountText);

let subtotal = unitPrice.multiply(quantity);
let finalTotal = subtotal.subtract(discount);

console.log(`Product: ${productName}`);
console.log(`Unit Price: ${unitPrice.format()}`);
console.log(`Quantity: ${quantity}`);
console.log(`Subtotal: ${subtotal.format()}`);
console.log(`Discount: ${discount.format()}`);
console.log(`Final Total: ${finalTotal.format()}`);

console.log(0.1 + 0.2); // 0.30000000000000004

let preciseTotal = currency(0.1).add(0.2);
console.log(preciseTotal.value); // 0.3
```

---

## 測試

請確認下列事項：

1. `npm install currency.js` 可以成功安裝套件
2. `import currency from "currency.js";` 可以正常執行
3. `currency("$19.99")` 可以成功建立金額物件
4. `.value` 能取得數值 `19.99`
5. 小計為 `$39.98`
6. 折扣後總額為 `$34.98`
7. `currency(0.1).add(0.2).value` 的結果為 `0.3`

---

## 挑戰

請再加入以下需求：

1. 新增運費 `"$4.50"`
2. 將最後總額改為：商品小計 - 折扣 + 運費
3. 在終端機中多輸出一行 `Shipping: $4.50`

提示：

```js
let shipping = currency("$4.50");
let grandTotal = subtotal.subtract(discount).add(shipping);
```

如果完成得快，可以再思考：
- 若商品數量改為 `3`，總額會是多少？
- 若折扣改為 `"$7.50"`，總額又會是多少？
