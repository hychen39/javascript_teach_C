

console.log("開始載入商品頁");

// 使用 fetch() 向伺服器請求商品資料
// fetch() 會回傳一個 Promise 物件，代表未來會完成的網路請求結果
const productPromise = fetch("https://jsonplaceholder.typicode.com/posts/1");

// 註冊處理成功結果的函式，使用 .then() 方法
// 註冊處理錯誤的函式，使用 .catch() 方法
productPromise
  // 取得 伺服器回傳的 Response 物件，並轉換成 JSON 格式 （這也是一個非同步任務，會回傳一個新的 Promise 物件）
  .then(response => response.json())
  // 取得轉換後的商品資料，再印出來
  .then(productData => {
    console.log("商品資料載入成功");
    console.log(productData);
  })
  // 如果在任何一個步驟發生錯誤，會被 .catch() 捕捉到
  .catch(error => {
    console.log("商品資料載入失敗");
    console.log(error);
  });

console.log("fetch() 已經被呼叫");
console.log("主程式繼續執行，不等待商品資料回來");
console.log("商品頁其他內容繼續載入");