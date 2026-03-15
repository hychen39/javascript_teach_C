# Ch2 Lab 03

## 🎯 主題：電商系統中的型別轉換與比較陷阱

在 JavaScript 中，**自動型別轉換 (Type Coercion)**
可能讓程式看起來正常運作，但在實際系統中可能造成嚴重錯誤。

本 Lab 透過電商系統的案例，分析以下問題：

-   JavaScript 的自動型別轉換
-   `null` / `undefined` 的數值行為
-   `==` 與 `===` 的差異
-   如何寫出更安全的程式碼


# 🏪 商業情境

某電商平台的購物車系統，資料來自前端表單（HTML input）。

⚠ 表單送出的資料型別 **永遠是字串 (string)**。

工程師寫了以下程式來計算：

-   商品小計 (subtotal)
-   折扣後金額 (finalPrice)

``` javascript
let price = "100";
let quantity = "2";
let discount = null;   // 無折扣

let subtotal = price * quantity;
let finalPrice = subtotal - discount;

console.log("最終金額:", finalPrice);
```


# Part 1：閱讀與分析（3 分鐘）

請回答：

1.  `price` 與 `quantity` 的型別是什麼？
2.  `price * quantity` 的結果是什麼？為什麼？
3.  `discount = null` 時，`subtotal - discount` 的結果是什麼？為什麼？

如果將 `discount` 改成：

``` javascript
let discount;
```

4. 結果會變成什麼？為什麼？


# Part 2：隱藏的商業風險（2 分鐘）

如果工程師不小心把程式改成：

``` javascript
let subtotal = price + quantity;
```

請回答：

1.  `subtotal` 的結果是什麼？
2.  為什麼會出現這個結果？
3.  在電商系統中，這可能造成什麼實際問題？

------------------------------------------------------------------------

# Part 3：折扣判斷的 Bug（2 分鐘）

另一位工程師寫了以下程式判斷是否有折扣：

``` javascript
let discount = "0";

if (discount == 0) {
    console.log("沒有折扣");
} else {
    console.log("有折扣");
}
```

請回答：

1.  程式會輸出什麼？
2.  為什麼 `"0" == 0` 會成立？
3.  如果改成 `discount === 0`，結果會變成什麼？
4.  在實際系統中，這種寫法可能造成什麼錯誤？


# Part 4：請修正程式（3 分鐘）

請改寫以下程式，使其更安全。

```js
let itemA = "100";
let itemB = "120";
let discount = "0";

// 計算小計
let subtotal = itemA + itemB;

// 判斷是否有折扣
if (discount == 0) {
    console.log("沒有折扣");
} else {
    console.log("有折扣");
}

// 計算最終金額
let finalPrice = subtotal - discount;

console.log("最終金額:", finalPrice);

```

要求：

-   不依賴自動型別轉換
-   使用 **明確型別轉換**
-   使用 **嚴格相等比較 (`===`)**
-   保證金額計算正確

上傳你的修改版本：


------------------------------------------------------------------------

# 🔍 延伸思考

請簡短回答：

1.  為什麼大型系統不建議依賴 **Type Coercion**？
2.  為什麼 `===` 通常比 `==` 更安全？
3.  如果 API 回傳字串 `"0"` 作為折扣，你會如何設計程式避免錯誤？
4.  在團隊開發中，是否應該規定 **一律使用 `===`**？為什麼？
