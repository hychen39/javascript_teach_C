# Lab：改善電商運費系統的程式品質

**預估時間：** 20 分鐘

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

請仔細閱讀以下程式，底下的程式實作了上述的運費計算邏輯:

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

# Step 3 --- AI 重構

## Q4 --- 改寫迴圈

接下來會比較兩個不同的 Prompt，看看不同的描述方式會對 AI 的重構結果產生什麼影響。

### Prompt 1：

```
重構以下程式碼

<置換 Step 1 中的程式碼>
```

你的結果:

________

### Prompt 2：

```
重構以下程式碼，降低它的循環複雜度，讓程式碼更簡潔、易讀和易維護：

<置換 Step 1 中的程式碼>
```

你的結果:

________

### Q5 --- 比較 AI 重構的結果

請比較 Prompt 1 和 Prompt 2 的重構結果，AI 做了那些事？
有做的請打勾：

提示： 請觀察 AI 是否有改變程式結構，而不只是重新排版程式碼。

| 重構項目                                      | Prompt 1 | Prompt 2 |
| ----------------------------------------- | -------- | -------- |
| 改用 `for...of` 取代 `for (i=...)`            |          |          |
| 抽取函式（例如 `getDiscountRate()`）              |          |          |
| 消除巢狀 `if` 結構                              |          |          |
| 使用 guard clause（例如 `if (!member) return`） |          |          |
| 移除重複程式碼                                   |          |          |
| 將折扣計算邏輯集中在一個地方                            |          |          |
| 改善變數命名                                    |          |          |
| 修正原始程式中的錯誤（例如 `item.price`）               |          |          |
| 使用更簡潔寫法（例如 `reduce()`）                    |          |          |
| 程式整體結構變得更容易閱讀                             |          |          |

### Q6 --- 反思 AI 重構的結果

回答以下問題：

Q6 — 簡短討論

1. 哪一個 Prompt 產生的重構 比較多？

2. 哪一個 Prompt 產生的程式 比較容易閱讀？

3. 為什麼 更明確的 Prompt 通常會得到更好的結果？


### Q7 --- 學習反思

請用 2–3 句簡單說明你的想法。

1. **程式理解** 
   在閱讀 Step 1 的程式時，哪一行或哪一段程式最難理解？請簡單說明原因。

2. **程式品質判斷（Code quality judgement）**  
   在比較 AI 的兩個重構結果時，你是根據哪些理由判斷哪一個版本比較好？

3. **AI 輔助改善程式（AI‑assisted refactoring）**  
   如果未來你使用 AI 協助改善程式碼，你會如何描述問題或設計 Prompt，讓 AI 產生更好的程式碼？
