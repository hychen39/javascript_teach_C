# JavaScript Geolocation 練習題：取得使用者位置

## 題目說明

請使用 **HTML5 的 Geolocation API**，實作一個簡單的網頁，達成以下功能：

1. 按下按鈕後，取得使用者目前的位置（經度與緯度）。
2. 將取得的資訊顯示在畫面上。
3. 若取得失敗，請顯示錯誤訊息。
4. 請使用 `Promise` 封裝 Geolocation API（`navigator.geolocation.getCurrentPosition`）。


## HTML 結構

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>位置查詢練習</title>
</head>
<body>
  <button id="getLocationBtn">取得我的位置</button>
  <div id="output"></div>

  <script src="script.js"></script>
</body>
</html>
```

## JavaScript 任務（請實作於 script.js）

```javascript
// TODO: 將 geolocation 包裝成一個 Promise 函式
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    // 使用 getCurrentPosition, 成功時呼叫 resolve，失敗時呼叫 reject
    // 參考 https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  });
}

// 點擊按鈕後觸發
document.getElementById('getLocationBtn').addEventListener('click', () => {
  const output = document.getElementById('output');
  output.innerText = '🔍 正在取得位置...';

  getCurrentLocation()
    .then(position => {
      // TODO: 顯示位置資訊
    })
    .catch(error => {
      output.innerText = `⚠️ 發生錯誤：${error.message}`;
    });
});
```
