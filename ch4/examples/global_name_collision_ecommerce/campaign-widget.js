
// 和 storefront.js 的 productName 同名，會蓋掉 storefront.js 的定義，造成衝突。
var productName = "Campaign Budget";

// 和 storefront.js 的 formatPrice() 同名，會蓋掉 storefront.js 的定義，造成衝突。
// 美金格式顯示。
var formatPrice = function (price) {
  return "US$" + (price / 32).toFixed(2);
};

document.querySelector("#warning-message").textContent =
  "第二支腳本把 productName 和 formatPrice() 蓋掉了。";

document.querySelector("#rerender-btn").addEventListener("click", function () {
  // 呼叫 storefront.js 的 renderProductCard()，會使用到被 campaign-widget.js 蓋掉的 productName 和 formatPrice()，造成衝突。
  renderProductCard();
  console.log("campaign-widget.js 造成衝突後:", {
    productName: productName,
    productPrice: productPrice,
    formatPriceResult: formatPrice(productPrice)
  });
});
