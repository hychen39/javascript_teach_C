# Global Object Shared Data Demo

這個範例示範兩個 JS 檔案如何透過 global object 共享資料。

## 檔案說明

- `cart-store.js`
  - 把 `cartState` 放到 `globalThis`
  - 提供 `addCartItem()` 給其他檔案呼叫
- `cart-page.js`
  - 讀取 `globalThis.cartState`
  - 點擊按鈕後呼叫 `globalThis.addCartItem()` 修改同一份資料

## 如何使用

直接用瀏覽器開啟 `index.html`。

開啟 DevTools Console 後，可以看到兩個檔案都能存取同一份資料。
