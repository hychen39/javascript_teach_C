# 實驗 12-05：自動為 `<h1>` 元素編號

## 實驗目標
學習如何使用 JavaScript 操作 DOM，為網頁中的所有 `<h1>` 元素自動添加編號。

作法概述：
1. 使用 `document.getElementsByTagName` 方法取得所有 `<h1>` 元素。
2. 使用 `Array.from` 方法將 HTMLCollection 轉換為陣列，並使用 `entries()` 方法取得每個元素的索引值與內容。
3. 使用迴圈遍歷每個 `<h1>` 元素，並將編號添加到其內容前。



## 步驟 1：建立 HTML 結構

1. 建立一個 HTML 檔案，並加入以下內容：
    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <title>Numbering the h1 elements</title>
        </head>
        <body>
            <h1>Header 1</h1>
            <h1>Header 2</h1>
            <h1>Header 3</h1>
        </body>
    </html>
    ```



## 步驟 2：撰寫 JavaScript 程式碼

1. 在 `<body>` 標籤後加入 `<script>` 區塊，並撰寫以下程式碼：
    ```javascript
    let h1Elements = document.getElementsByTagName("h1");
    for (let [idx, e] of Array.from(h1Elements).entries()) {
        e.innerHTML = (idx + 1) + ". " + e.innerHTML;
    }
    ```

2. 程式碼說明：
    - `document.getElementsByTagName("h1")`：取得所有 `<h1>` 元素。
    - `Array.from(h1Elements).entries()`：將 HTMLCollection 轉換為陣列，並取得每個元素的索引與內容。
    - `e.innerHTML = (idx + 1) + ". " + e.innerHTML`：將編號（索引值加 1）添加到每個 `<h1>` 元素的內容前。



## 步驟 3：測試

1. 儲存檔案並在瀏覽器中開啟。
2. 確認每個 `<h1>` 元素的內容前都自動添加了對應的編號，例如：
    ```
    1. Header 1
    2. Header 2
    3. Header 3
    ```

## 挑戰

使用遍歷方法(iterative method) forEach() 取代 for-of 迴圈

