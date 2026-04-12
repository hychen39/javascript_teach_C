# Day.js Demo Guide

這份 guide 對應的是 [../dayjs/dayjs_demo.js](../dayjs/dayjs_demo.js) 範例，目的在於說明如何初始化 Node 專案、安裝 Day.js，並成功執行使用 `import` 語法的 JavaScript 檔案。

## 範例用途

這個範例示範：

- 使用 `dayjs()` 建立日期物件
- 用 `isBefore()` 判斷優惠券是否仍可使用
- 用 `add()` 計算出貨日
- 用 `format()` 輸出 `YYYY-MM-DD` 格式日期

## 初始化 Node 專案

先切換到範例資料夾：

```bash
cd ch4/examples/dayjs
```

建立 `package.json`：

```bash
npm init -y
```

安裝 Day.js：

```bash
npm install dayjs
```

## 設定 ES Module

因為 `dayjs_demo.js` 使用的是：

```js
import dayjs from "dayjs";
```

所以 `package.json` 需要加入：

```json
{
  "type": "module"
}
```

最少可以長這樣：

```json
{
  "name": "dayjs-demo",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node dayjs_demo.js"
  },
  "dependencies": {
    "dayjs": "^1.11.0"
  }
}
```

## 執行方式

在 `ch4/examples/dayjs` 資料夾下執行：

```bash
node dayjs_demo.js
```

或使用：

```bash
npm start
```

## 預期輸出

```text
Coupon 可用
訂單：ORD-001 出貨日：2026-03-25
```

## 常見錯誤

### 1. Cannot use import statement outside a module

原因：Node 還沒有把專案當成 ES Module。

解法：在 `package.json` 加上：

```json
{
  "type": "module"
}
```

### 2. Cannot find package 'dayjs'

原因：尚未安裝 Day.js。

解法：

```bash
npm install dayjs
```

### 3. 在錯誤的資料夾執行指令

請先確認目前工作目錄是：

```bash
ch4/examples/dayjs
```

再執行 `node dayjs_demo.js`。

## 教學提醒

這個範例很適合搭配以下概念一起講：

- 為什麼原生 `Date` 不易讀
- 第三方套件要先安裝才能使用
- `import` 與 ES Module 的基本設定
- 套件管理由 `package.json` 與 `node_modules` 負責