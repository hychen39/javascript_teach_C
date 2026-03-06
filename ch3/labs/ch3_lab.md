# Lab：改善電商運費系統的程式品質

**預估時間：** 10 分鐘

## 情境

你正在開發一個**電子商務平台**。
系統需要針對一份訂單清單計算**運費**。

運費規則：

-   訂單金額 \> 3000 → **免運**
-   訂單金額 \> 1000 → **運費 = 50**
-   訂單金額 ≤ 1000 → **運費 = 100**
-   會員可享有**運費折抵 20（運費 \> 0 時才折抵）**

但是，有工程師寫了下面這段程式碼，**可讀性很差而且邏輯重複**。

你的任務是：**先分析程式碼，再用 Clean Code 的觀念把它改善（重構）**。

------------------------------------------------------------------------

# Step 1 --- 讀程式碼

請仔細閱讀以下程式。

``` javascript
let totalShipping = 0;

let orders = [
  { amount: 3500 },
  { amount: 1500 },
  { amount: 800 }
];

for (let i = 0; i < orders.length; i++) {

  if (orders[i].amount > 3000) {

    if (user.member === true) {
      totalShipping += 0;
    } else {
      totalShipping += 0;
    }

  } else if (orders[i].amount > 1000) {

    if (user.member === true) {
      totalShipping += 50 - 20;
    } else {
      totalShipping += 50;
    }

  } else {

    if (user.member === true) {
      totalShipping += 100 - 20;
    } else {
      totalShipping += 100;
    }

  }

}
```


## Q1 --- 循環複雜度（Cyclomatic Complexity）

估算這段程式的**循環複雜度**。

提示：

  循環複雜度 = 決策點數量 + 1

決策點（Decision Points）包含：

-   `if`
-   `else if`
-   `for`

請寫下你的答案：

  循環複雜度 = ______


## Q2 --- Code Smell（壞味道）偵測

找出這段程式中**兩個問題**。

可以從以下角度思考：

-   邏輯重複
-   可讀性差
-   巢狀條件太深

請寫下你的答案：

1.
2.


# Step 2 --- 重構後版本

請閱讀下面這段**重構後的程式**。

``` javascript
function calculateShipping(amount, isMember) {

  let shipping;

  if (amount > 3000) {
    shipping = 0;
  } else if (amount > 1000) {
    shipping = 50;
  } else {
    shipping = 100;
  }

  if (isMember && shipping > 0) {
    shipping -= 20;
  }

  return shipping;
}

let totalShipping = 0;

for (const order of orders) {
  totalShipping += calculateShipping(order.amount, user.member);
}
```

## Q3 --- Clean Code 反思

和原本版本相比，請列出重構後程式碼的**兩個優點**。

提示：請從 **Clean Code 原則**思考。

可能的方向：

-   可讀性（readability）
-   模組化（modular design）
-   降低複雜度（reduced complexity）
-   更容易測試（easier testing）

請寫下你的答案：

1.
2.

------------------------------------------------------------------------

# Step 3 --- 小型重構練習

## Q4 --- 改寫迴圈

請用**清楚的變數命名**與**較現代的迴圈語法**改寫下面的迴圈。

原始程式：

``` javascript
for (let i = 0; i < orders.length; i++) {
  totalShipping += calculateShipping(orders[i].amount, user.member);
}
```

請改寫成**更好讀**的版本：

``` javascript
// Your improved version here
```

你可以與 GPT 討論，看要如何改寫。

請上傳你的最後版本及與 GPT 對話的內容至作業區。
