# ch3 Lab --- 教師版解答 (Instructor Solution)

## Step 1 --- Code Reading

### Q1 --- Cyclomatic Complexity

原始程式的 decision points：

  Decision                   Count
  -------------------------- -------
  for                        1
  if (amount \> 3000)        1
  if (user.member)           1
  else if (amount \> 1000)   1
  if (user.member)           1
  if (user.member)           1

Total decision points:

    D = 6

Cyclomatic Complexity:

    M = D + 1
    M = 6 + 1
    M = 7

答案：

    Cyclomatic Complexity = 7

------------------------------------------------------------------------

### Q2 --- Code Smell 偵測

學生可能回答的合理答案：

1️⃣ **重複邏輯 (Duplicated Logic)**

`if (user.member)` 的判斷重複出現三次。

2️⃣ **巢狀條件過深 (Deep Nesting)**

`if amount` → `if member` 形成巢狀條件。

3️⃣ **可讀性差 (Poor Readability)**

程式混合： 

- 運費規則 
- 會員折扣 
- 迴圈處理

4️⃣ **違反 Single Responsibility**

主程式同時處理： 
- 計算運費 
- 判斷折扣 
- 迭代訂單


## Step 2 --- Refactored Version

### Refactor Code

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

------------------------------------------------------------------------

### Q3 --- Clean Code 優點

可能答案：

1️⃣ **可讀性更高 (Better Readability)**\
主程式只保留：

    calculateShipping()

學生可以立即理解程式在做什麼。


2️⃣ **降低循環複雜度 (Reduced Complexity)**

主程式：

    for loop

Cyclomatic Complexity:

    2

而不是原本的 7。


3️⃣ **模組化設計 (Modular Design)**

運費邏輯被封裝到：

    calculateShipping()


4️⃣ **更容易測試 (Testability)**

可以獨立測試：

    calculateShipping(amount, isMember)


## Step 3 --- 改寫迴圈

原始程式：

``` javascript
for (let i = 0; i < orders.length; i++) {
  totalShipping += calculateShipping(orders[i].amount, user.member);
}
```

建議答案：

``` javascript
for (const order of orders) {
  totalShipping += calculateShipping(order.amount, user.member);
}
```

優點：

-   語意更清楚
-   避免 index 操作
-   可讀性更高

------------------------------------------------------------------------

## 教師講解重點

這個 Lab 的核心學習目標：

### 1 Code Reading

學生必須理解：

-   if / else if
-   巢狀條件
-   decision paths

------------------------------------------------------------------------

### 2 Cyclomatic Complexity

學生學會：

    Cyclomatic Complexity = Decision Points + 1

並理解：

    高 complexity → 難測試 → 難維護

------------------------------------------------------------------------

### 3 Clean Code 思維

透過 Refactor 學到：

-   Extract Function
-   Single Responsibility
-   Readable Code

------------------------------------------------------------------------

### 4 商業情境

這段程式對應到真實電商系統：

-   訂單金額
-   運費規則
-   會員優惠

讓學生理解：

    程式控制結構 → 商業邏輯

------------------------------------------------------------------------

## 延伸討論（可選）

教師可問學生：

如果會員等級變成：

-   VIP
-   Gold
-   Silver

這段程式會變成什麼樣？

學生會發現：

    if / else tree 會快速膨脹

這可以引導到：

-   Strategy Pattern
-   Table-driven design
