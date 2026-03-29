var productName = "Campaign Budget";

var formatPrice = function (price) {
  return "US$" + (price / 32).toFixed(2);
};

document.querySelector("#warning-message").textContent =
  "第二支腳本把 productName 和 formatPrice() 蓋掉了。";

document.querySelector("#rerender-btn").addEventListener("click", function () {
  renderProductCard();
  console.log("campaign-widget.js 造成衝突後:", {
    productName: productName,
    productPrice: productPrice,
    formatPriceResult: formatPrice(productPrice)
  });
});
