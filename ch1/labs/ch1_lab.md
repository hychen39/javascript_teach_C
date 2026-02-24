# Ch1 課堂練習
目標：用「同一段 JavaScript」在不同環境（Quokka／瀏覽器 Console／Node REPL／外部 JS 檔）跑起來，理解工具差異與基本輸出方式。

## 準備

- 已安裝 VS Code、Quokka.js 擴充套件、Node.js（LTS）。
- 打開：VS Code（用 Quokka）、瀏覽器（Chrome/Edge 皆可）、終端機（Terminal）。

時間建議：每個小題 2 分鐘，最後 1 分鐘收尾。

---

## 1) Quokka：即時實驗

### 操作

1. 在 VS Code 開新 Quokka 檔案：
	 - `Cmd/Ctrl + K`，再按 `J`
2. 貼上並觀察每一行右側的輸出：

```js
// 1) 基本輸出
console.log("Hello from Quokka");

// 2) 變數 + 字串模板
const name = "JS";
console.log(`Hi, ${name}!`);

// 3) 警告 / 錯誤輸出（觀察顏色或樣式差異）
console.warn("This is a warning");
console.error("This is an error");
```

### 檢核

- 你能在每行右側看到輸出（而不是只在 Console）。
- 你知道 `log / warn / error` 的用途差異（一般 / 警告 / 錯誤）。

---

## 2) 瀏覽器 Console：在用戶端執行

### 操作

1. 打開任一網頁（例如新分頁）。
2. 開啟 DevTools Console：
	 - macOS：`Option + Command + J`（Chrome 常用）
	 - 或 `F12` → Console
3. 逐行輸入以下指令並按 Enter：

```js
console.log("Hello from Browser Console");
console.clear();
console.log("After clear");
```

（可選）體驗對話框：

```js
alert("Hello!");
```

### 檢核

- 你能在 Console 看到輸出，並理解 `console.clear()` 會清掉畫面。
- 你知道「瀏覽器 Console」是用戶端環境（不需要 Node.js）。

---

## 3) Node.js REPL：在終端機互動執行

### 操作

1. 在終端機輸入 `node` 進入 REPL。
2. 依序輸入並觀察回傳：

```js
1 + 2
const x = 10
x * 3
console.log("Hello from Node REPL")
```

3. 離開 REPL：輸入 `.exit` 或按 `Ctrl + D`（Windows 常見為 `Ctrl + Z` 再 Enter）。

### 檢核

- 你知道 REPL 的意義：Read → Eval → Print → Loop。
- 你能用 REPL 快速驗證「表達式」與 `console.log()`。

---

## 4) 外部引用 JavaScript：HTML + 外部 .js（3 分鐘）

### 操作

1. 在本資料夾建立兩個檔案：
	 - `ch1_external.html`
	 - `ch1_external.js`

2. `ch1_external.html`：

```html
<!doctype html>
<html lang="zh-Hant">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Ch1 External JS</title>
	</head>
	<body>
		<h1>External JS Demo</h1>

		<!-- 把 script 放在 body 最後，確保畫面元素先出現 -->
		<script src="ch1_external.js"></script>
	</body>
</html>
```

3. `ch1_external.js`：

```js
console.log("Loaded external JS!");
```

4. 用瀏覽器開啟 `ch1_external.html`，打開 Console，確認有輸出。

### 檢核

- 你能解釋：External JavaScript 是「HTML 與 JS 分離」，更好維護與重用。
- 你能解決常見錯誤：檔名大小寫、路徑（`src="..."`）寫錯導致沒載入。



