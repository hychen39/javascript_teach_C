globalThis.cartState = {
  shopName: "Cafe JS",
  items: [
    { name: "Americano", price: 90 },
    { name: "Bagel", price: 70 }
  ]
};

globalThis.addCartItem = function (name, price) {
  globalThis.cartState.items.push({ name, price });
};

console.log("cart-store.js 已建立 global object 資料:", globalThis.cartState);
