# Lab（10 分鐘）：訂單 + 出貨 + Coupon

## 🎯 Lab 目標

本 Lab 讓你練習：

- 理解程式碼「意圖」
- 判斷日期邏輯是否正確
- 使用 `dayjs` 改善可讀性
- 使用 Template String 改善字串

---

## 🛒 情境

電商系統需要：

1. 判斷 coupon 是否有效  
2. 計算出貨日（+3 天）  
3. 顯示訂單摘要  

---

## Step 1. 閱讀程式碼

```js
import dayjs from "dayjs";

let order = {
    id: "ORD-001",
    totalAmount: 1000,
    paidAt: "2026-03-22",
    couponExpiredAt: "2026-03-25"
};

let now = dayjs("2026-03-24");

if (now < dayjs(order.couponExpiredAt)) {
    console.log("Coupon 可用");
}

let shipDate = dayjs(order.paidAt).add(3, "day");

let message = "訂單：" + order.id + " 出貨日：" + shipDate;

console.log(message);
```

---

## Step 2. 問題（快速回答）

### Q1  
這行在判斷什麼？

```js
if (now < dayjs(order.couponExpiredAt))
```

👉 意圖是：____________________

---

### Q2  
這樣寫好嗎？

👉 有沒有更清楚的寫法？

可與 AI 工具討論，找出更好的寫法。

請貼上你與 AI 的對話過程。

__________________________

---

### Q3  
這段程式在做什麼？

```js
dayjs(order.paidAt).add(3, "day")
```

👉 意圖是：____________________

---

### Q4  
這段有什麼問題？

```js
let message = "訂單：" + order.id + " 出貨日：" + shipDate;
```

---

## Step 3. 改寫程式（重點）

請完成以下改寫：

```js
// 1. 改善 coupon 判斷（用 dayjs 方法）
if (__________________) {
    console.log("Coupon 可用");
}

// 2. 改善字串（用 Template String）
let message = __________________;

console.log(message);
```

---

## 💡 提示

```js
now.isBefore(...)
`${...}`
shipDate.format("YYYY-MM-DD")
```

---

## 🧠 小結

這個 Lab 重點：

- `<` → 不夠清楚（改用 isBefore）
- 字串串接 → 改用 Template String
- 日期運算 → 用 dayjs 提高可讀性

👉 程式碼應該讓人「一眼看懂你在做什麼」
