# Ch4 Lab：字串的 Clean Code 重構

**Lab 時間：15 分鐘**

在實務系統中，程式常常可以正常運作，但仍然可能存在
**可讀性差、難以維護的程式碼（Code Smell）**。\
本 Lab 透過閱讀一段電子商務系統的程式碼，練習辨識並改善 **字串相關的
Clean Code 問題**。

------------------------------------------------------------------------

## Lab 目標

學生需要學會辨識三種常見的字串 Clean Code 問題：

1.  使用 **Template String 提高可讀性**
2.  **集中管理字串常數**（避免 Magic Strings）
3.  將 **字串產生邏輯封裝成函式**

------------------------------------------------------------------------

# Part 1：閱讀程式碼

以下程式碼來自電子商務系統的訂單處理模組。

``` javascript
function processOrder(order) {

    if (order.status === "PAID") {
        console.log("Processing paid order: " + order.id);
    }

    if (order.status === "SHIPPED") {
        console.log("Order " + order.id + " has been shipped.");
    }

    if (order.status === "CANCELLED") {
        console.log("Order " + order.id + " was cancelled.");
    }

    let summary = "Customer " + order.customer +
                  " purchased " + order.product +
                  " x " + order.quantity +
                  ". Total price: " + (order.price * order.quantity);

    console.log(summary);
}
```

------------------------------------------------------------------------

# Part 2：找出 Bad Code Smell

Note: 研究觀察之資料收集
- 請學生使用 AI 工具（如 ChatGPT）分析上述程式碼，找出其中的 **Code Smell** 及修正方式。
- 收集學生使用的 GPT 模型及對話過程。
- 後續可分析這對話過程，瞭解教學過程中學生的思考模式及學習成效。

請回答以下問題。

## Q1 Template String

以下哪一段程式碼 **應該改寫為 Template String**？

    ________________________________________

為什麼？

    ________________________________________

------------------------------------------------------------------------

## Q2 Magic Strings

程式中有哪些 **Magic Strings（寫死的字串常數）**？

    ________________________________________
    ________________________________________
    ________________________________________

應如何改善？

    ________________________________________

------------------------------------------------------------------------

## Q3 重複的字串格式

程式中有重複的字串格式：

    "Order " + order.id

請設計一個函式來產生訂單訊息。

    ________________________________________

------------------------------------------------------------------------

# Part 3：重構程式碼

請嘗試將程式碼重構為較佳的 Clean Code。

提示：

-   使用 **Template String**
-   建立 **字串常數**
-   將 **字串產生邏輯封裝成函式**

```{=html}
<!-- -->
```
    ________________________________________
    ________________________________________
    ________________________________________

------------------------------------------------------------------------

# 教師版解答

## 問題 1：Template String

原始程式碼

``` javascript
let summary = "Customer " + order.customer +
              " purchased " + order.product +
              " x " + order.quantity +
              ". Total price: " + (order.price * order.quantity);
```

改善後

``` javascript
let summary = `Customer ${order.customer} purchased ${order.product} x ${order.quantity}. Total price: ${order.price * order.quantity}`;
```

------------------------------------------------------------------------

## 問題 2：Magic Strings

原始程式碼

``` javascript
"PAID"
"SHIPPED"
"CANCELLED"
```

改善方式

``` javascript
const ORDER_STATUS = {
    PAID: "PAID",
    SHIPPED: "SHIPPED",
    CANCELLED: "CANCELLED"
};
```

------------------------------------------------------------------------

## 問題 3：封裝字串產生邏輯

原始程式碼

``` javascript
console.log("Order " + order.id + " has been shipped.");
```

改善方式:
將字串產生邏輯封裝成函式，集中管理訂單訊息的格式。

``` javascript
function formatOrderMessage(orderId, orderStatus) {
    switch (orderStatus) {
        case ORDER_STATUS.PAID:
            return `Processing paid order: ${orderId}`;
        case ORDER_STATUS.SHIPPED:
            return `Order ${orderId} has been shipped.`;
        case ORDER_STATUS.CANCELLED:
            return `Order ${orderId} was cancelled.`;
        default:
            return `Unknown status for order ${orderId}.`;
    }
   
}
```

------------------------------------------------------------------------

# 完整重構版本

``` javascript
const ORDER_STATUS = {
    PAID: "PAID",
    SHIPPED: "SHIPPED",
    CANCELLED: "CANCELLED"
};

function formatOrderMessage(orderId, orderStatus) {
    switch (orderStatus) {
        case ORDER_STATUS.PAID:
            return `Processing paid order: ${orderId}`;
        case ORDER_STATUS.SHIPPED:
            return `Order ${orderId} has been shipped.`;
        case ORDER_STATUS.CANCELLED:
            return `Order ${orderId} was cancelled.`;
        default:
            return `Unknown status for order ${orderId}.`;
    }
   
}

function processOrder(order) {

    let statusMessage = formatOrderMessage(order.id, order.status);
    console.log(statusMessage);

    let summary = `Customer ${order.customer} purchased ${order.product} x ${order.quantity}. Total price: ${order.price * order.quantity}`;

    console.log(summary);
}
```

------------------------------------------------------------------------

# Lab 學習重點

本 Lab 對應三個 Clean Code 原則：

-   使用 **Template String** 提高可讀性
-   **集中管理字串常數**
-   將 **字串產生邏輯封裝成函式**

良好的字串設計可以顯著提升程式碼的 **可讀性、可維護性與一致性**。
