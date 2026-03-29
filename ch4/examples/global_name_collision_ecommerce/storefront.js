var productName = "Wireless Mouse";
var productPrice = 1280;

// 注意：這裡的 formatPrice() 會被 campaign-widget.js 的同名函式蓋掉，造成衝突。
var formatPrice = function (price) {
  return "NT$" + price.toLocaleString("zh-TW");
};

var renderProductCard = function () {
  var output = document.querySelector("#product-output");

  output.innerHTML = `
    <p>商品名稱：<strong>${productName}</strong></p>
    <p>價格：<strong>${formatPrice(productPrice)}</strong></p>
  `;
};

renderProductCard();

console.log("storefront.js 載入後:", {
  productName: productName,
  productPrice: productPrice,
  formatPriceResult: formatPrice(productPrice)
});
