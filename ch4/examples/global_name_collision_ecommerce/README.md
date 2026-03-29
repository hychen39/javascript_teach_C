# Global Name Collision Ecommerce Demo

這個範例示範全域命名衝突。

## 情境

- `storefront.js` 是電商商品頁腳本
- `campaign-widget.js` 是後來加入的行銷腳本
- 兩支檔案都使用了全域變數 `productName`
- 兩支檔案都使用了全域函式 `formatPrice()`

因為全域空間是共用的，第二支腳本載入後就把第一支腳本的名稱覆蓋掉了。

## 如何觀察衝突

1. 直接用瀏覽器打開 `index.html`
2. 頁面一開始會先顯示正常商品資料
3. 點擊「重新渲染商品卡」
4. 會看到商品名稱和價格格式變成行銷腳本的版本

這就是 global object / global scope 帶來的命名衝突。
