# Lab 4.4：修正 Global 物件造成的命名衝突

## 實驗目標

在這個 guided lab 中，你將修改一個電商情境的 JavaScript 範例，修正 global object 帶來的命名衝突問題。

完成後，你應能：
- 觀察全域命名衝突造成的錯誤
- 找出衝突的全域變數與函式名稱
- 使用 namespace object 降低全域空間污染
- 說明 global 物件帶來的負面影響

預估時間：10 分鐘

---

## 情境說明

你接手了一個簡單的電商商品頁範例。

目前範例放在：

`lecture_notes_v1/ch4/examples/global_name_collision_ecommerce/`

其中有兩支 JavaScript：

- `storefront.js`
  - 負責顯示商品名稱與價格
- `campaign-widget.js`
  - 模擬後來加入的行銷腳本

這兩支檔案都把資料與函式放在 global scope，結果使用了相同名稱：

- `productName`
- `formatPrice()`

因此，第二支腳本會覆蓋第一支腳本，造成商品頁顯示錯誤。

---

## 你要修正的問題

原本頁面的錯誤流程如下：

1. 頁面先顯示正常商品資料
2. 載入第二支 script 後，global 名稱被覆蓋
3. 點擊「重新渲染商品卡」後，商品名稱和價格格式都變成行 `campaign-widget.js`, 而不是 `storefront.js` 的內容

你的任務是：

- 保留 `storefront.js` 與 `campaign-widget.js` 兩支檔案
- 讓它們不要再互相覆蓋全域名稱
- 修正後，重新渲染商品卡時，畫面仍應顯示：
  - 商品名稱：`Wireless Mouse`
  - 價格：`NT$1,280`

---

## 步驟 1：先觀察原本的 bug

請先用瀏覽器打開：

`lecture_notes_v1/ch4/examples/global_name_collision_ecommerce/index.html`

觀察以下現象：

1. 一開始商品卡顯示正常
2. 點擊「重新渲染商品卡」
3. 商品名稱變成 `Campaign Budget`
4. 價格格式變成 `US$40.00`

這代表第二支 script 的全域名稱把第一支 script 的資料蓋掉了。

Browser 載入 scripts 時，會依序執行，後載入的 script 會覆蓋前面 script 定義在 global scope 的變數與函式，造成命名衝突和資料污染。

---

## 步驟 2：找出命名衝突

請閱讀以下兩個檔案：

- `lecture_notes_v1/ch4/examples/global_name_collision_ecommerce/storefront.js`
- `lecture_notes_v1/ch4/examples/global_name_collision_ecommerce/campaign-widget.js`

請回答：

### Q1

哪兩個全域名稱發生了衝突？

```text
________________________________________
________________________________________
```

### Q2

為什麼 `campaign-widget.js` 會影響 `storefront.js` 的結果？

```text
________________________________________
________________________________________
________________________________________
```

---

## 步驟 3：用 namespace object 修正 `storefront.js`

`namespace object` 是一個物件，用來集中管理相關的變數與函式，避免直接在 global scope 定義多個名稱。
- 用這種方式 避免全域污染（global pollution）與命名衝突（name collision）

請將 `storefront.js` 中原本直接暴露在全域的資料，改成集中放進一個物件，例如：

```js
globalThis.storefrontApp = {
  productName: "Wireless Mouse",
  productPrice: 1280,
  formatPrice: function (price) {
    return "NT$" + price.toLocaleString("zh-TW");
  },
  renderProductCard: function () {
    // ...
  }
};
```

上述程式碼中，在 globalThis 上新增了一個 `storefrontApp` 物件，裡面包含了原本的資料與函式。

使用 `.` 運算子存取物件的屬性與方法，例如：

```js
globalThis.storefrontApp.renderProductCard();
```

### 修改目標

- 不要再直接使用全域 `productName`, `productPrice`, `formatPrice`
- 改成透過 `globalThis.storefrontApp` 存取

### 提示

原本：

```js
var productName = "Wireless Mouse";
var productPrice = 1280;
```

修改後：

```js
globalThis.storefrontApp = {
  productName: "Wireless Mouse",
  productPrice: 1280,
  formatPrice: function (price) {
    return "NT$" + price.toLocaleString("zh-TW");
  },
};
```

---

## 步驟 4：用另一個 namespace object 修正 `campaign-widget.js`

請把 `campaign-widget.js` 也改成自己的 namespace object，例如：

```js
globalThis.campaignWidget = {
  productName: "Campaign Budget",
  formatPrice: function (price) {
    return "US$" + (price / 32).toFixed(2);
  }
};
```

### 你的修改目標

- `campaign-widget.js` 不要再宣告全域 `productName` 及 `formatPrice`

### 步驟 5: 修改 `storefront.js` 的 `renderProductCard()` 函式

改成使用 `globalThis.storefrontApp.productName` 和 `globalThis.storefrontApp.formatPrice()` 來存取資料與函式。

你的 renderProductCard() 應該改成類似這樣：

```js
var renderProductCard = function () {
  var output = document.querySelector("#product-output");
  let price = globalThis.storefrontApp.productPrice;
  let productName = globalThis.storefrontApp.productName;
  output.innerHTML = `
    <p>商品名稱：<strong>${productName}</strong></p>
    <p>價格：<strong>${globalThis.storefrontApp.formatPrice(price)}</strong></p>
  `;
};
```

- 不要再直接使用全域 `productName`, `formatPrice`
- 改成透過 `globalThis.storefrontApp` 存取

## 步驟 6：重新測試

再次打開 `index.html`，然後點擊「重新渲染商品卡」。

### 修正後預期結果

- 商品名稱仍然是 `Wireless Mouse`
- 價格仍然是 `NT$1,280`
- 雖然 `campaign-widget.js` 存在，但不應再污染商品頁的命名空間

---

## 自我檢查

請確認下列事項：

1. `storefront.js` 已改成使用 `globalThis.storefrontApp`
2. `campaign-widget.js` 已改成使用 `globalThis.campaignWidget`
3. 程式中不再直接依賴全域 `productName`
4. 程式中不再直接依賴全域 `formatPrice`
5. 點擊重新渲染後，畫面仍然正確

---

## 反思問題：global 物件造成的負面影響

請用 1 到 3 句回答以下問題。

### Q1 命名衝突

如果另一位工程師又新增一支 script，裡面也用了 `renderProductCard` 這個名稱，可能會發生什麼事？
Hint: 想想看，當兩支腳本中有沒有相同名稱的變數或函式，會發生什麼樣的衝突？

```text
________________________________________
________________________________________
```

### Q2 隱式耦合

為什麼 `campaign-widget.js` 可以在沒有明確 import 的情況下，使用 `storefront.js` 定義的 `renderProductCard()`？

```text
________________________________________
________________________________________
```

### Q3 維護成本

當 bug 是由 global 物件污染造成時，除錯為什麼會比較困難？

```text
________________________________________
________________________________________
________________________________________
```

### Q4 團隊協作

在多人協作或引入第三方函式庫時，global 物件為什麼特別危險？

```text
________________________________________
________________________________________
________________________________________
```

---

## 延伸思考

除了 namespace object 之外，你認為還有哪些方式可以避免 global 物件造成的問題？

提示：

- function scope
- block scope
- ES modules
- import / export

```text
________________________________________
________________________________________
________________________________________
```
