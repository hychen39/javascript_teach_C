const output = document.querySelector("#cart-output");
const addItemBtn = document.querySelector("#add-item-btn");

function renderCart() {
  const cartState = globalThis.cartState;
  const total = cartState.items.reduce(function (sum, item) {
    return sum + item.price;
  }, 0);

  output.innerHTML = `
    <p>店名：<strong>${cartState.shopName}</strong></p>
    <p>品項：${cartState.items.map(function (item) {
      return `${item.name} ($${item.price})`;
    }).join(", ")}</p>
    <p>總金額：<strong>$${total}</strong></p>
  `;
}

renderCart();

addItemBtn.addEventListener("click", function () {
  // 使用 globalThis 來存取和修改 cartState 資料，並呼叫 renderCart() 來更新畫面
  globalThis.addCartItem("Latte", 120);
  renderCart();
  console.log("cart-page.js 修改後的資料:", globalThis.cartState);
});
