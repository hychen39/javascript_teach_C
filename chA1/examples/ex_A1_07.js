fetch("https://jsonplaceholder.typicode.com/posts/1")
    // 處理 HTTP 回應狀態碼
  .then(response => {  
        if (!response.ok) {
            // 如果 HTTP 狀態碼不是 200-299，則視為錯誤
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            return response.json();
        }
    }, error => {
        // 處理 fetch 本身的錯誤，例如網路問題
        console.log("第一個非同步任務失敗了, 可能是網路問題");
        console.log(error);
        // 如果錯誤無法處理，可以再次拋出錯誤，讓下一個 catch 來處理
        // 此 error 會被包裝成一個被拒絕的 Promise 物件，直接跳到下一個 catch
        throw error;
    })
    // 取得 JSON 資料後的處理
    .then(productData => {
        console.log("商品資料載入成功");
        console.log(productData);
        return productData;
    }, error => {
        // 處理前一個 then 中的錯誤，例如 JSON 解析錯誤
        console.log("第二個非同步任務失敗了, 可能是 JSON 解析錯誤");
        console.log(error);
        // 如果錯誤無法處理，可以再次拋出錯誤，讓下一個 catch 來處理
        //throw error;
        // 如果錯誤已經處理完畢，不需要再拋出錯誤，可以直接 return 一個值，讓後續的 then 繼續執行
        console.log("使用預設的商品資料繼續執行");
        const defaultProductData = { id: 0, title: "Default Product", body: "This is default product data." };
        return `Default product data for error: ${defaultProductData}`;
    })
    .then(result => {
        console.log("第三個非同步任務成功了");
        console.log(result);
    }, error => {
        // 處理前一個 then 中的錯誤
        // 如前一個 then 中的錯誤已經被處理完畢，不會再進入這個 error handler
        console.log("第三個非同步任務失敗了");
        console.log(error);
    })
    .catch(error => {
        console.log("商品資料載入失敗");
        console.log(error);
  });