
# Ch2 Lab 03

## 🎯 主題：電商系統中的型別轉換風險


## 🏪 商業情境

某電商平台的購物車系統，資料來自前端表單（HTML input）。

⚠ 表單送出的資料型別都是 **字串 (string)**。

後端工程師寫了以下程式：

```js
let price = "100";
let quantity = "2";
let discount = null;   // 無折扣

let subtotal = price * quantity;
let finalPrice = subtotal - discount;

console.log("最終金額:", finalPrice);
```

---

# Part 1：閱讀與分析（5 分鐘）

請回答：

1. `price` 與 `quantity` 是什麼型別？
2. `price * quantity` 的結果是什麼？為什麼？
3. `discount = null` 時，`subtotal - discount` 的結果是什麼？為什麼？
4. 如果將 `discount` 改成：

```js
let discount;
```

結果會變成什麼？為什麼？

5. 哪些地方發生了「自動型別轉換 (Type Coercion)」？

---

# Part 2：隱藏的商業風險（2 分鐘討論）

如果系統改成：

```js
let subtotal = price + quantity;
```

1. 結果是什麼？
2. 這在電商系統中會造成什麼實際風險？
   - 金額計算錯誤？
   - 發票金額錯誤？
   - 財務報表錯誤？

---

# Part 3：請修正程式（3 分鐘）

請改寫以下程式：

要求：

- 不依賴自動型別轉換
- 使用明確型別轉換
- 保證金額計算正確
- 使用嚴格相等比較（若有需要）

```js
let price = "100";
let quantity = "2";
let discount = null;

// 在此改寫
```

---

# 🔍 延伸思考

1. 為什麼大型系統不建議依賴 Type Coercion？
2. 為什麼 `===` 比 `==` 安全？
3. 如果 API 回傳 `"0"` 作為折扣，會發生什麼事？

