---
marp: false
theme: default
header: 'Ch2 JavaScript 基礎語法 (2)'
footer: 'Hung-Yi Chen, Dept. of Info. Mgt., CYUT  | 2024'
class: lead
paginate: true
headingDivider: [1, 2, 3]
lang: zh-TW
---

<style>
    .columns {
    display: flex;
  }
  .column {
    flex: 1;
    padding: 10px;
  }
  .column.large{
    flex: 2;
  }
  .small-font {
    font-size: 0.8em;
  }

  section > header,
section > footer {
  position: absolute;
  left: auto;
  right: 90px;
  height: 20px;
}

header {
  top: 30px;
}

footer {
  bottom: 30px;
}

</style>

# JavaScript 基礎語法 (2)

## **2.2.3 強制轉換型別**

### **數字轉字串**
```js
var num = 10;
var str = String(num); // "10"
```

### **字串轉數字**
```js
var str = "42";
var num = Number(str); // 42
```

### **使用 `parseInt` 和 `parseFloat`**
```js
parseInt("35");     // 35
parseFloat("3.14"); // 3.14
```



# 2.3 運算式與運算子

## **算術運算子**

| 運算子 | 說明 |
|--------|------|
| `+`    | 加法 |
| `-`    | 減法 |
| `*`    | 乘法 |
| `/`    | 除法 |
| `%`    | 取餘數 |

```js
var a = 10;
var b = 3;
console.log(a + b); // 13
console.log(a - b); // 7
console.log(a * b); // 30
console.log(a / b); // 3.33
console.log(a % b); // 1
```



## **比較運算子**

| 運算子 | 說明 |
|--------|------|
| `==`   | 相等 (值相等即可) |
| `===`  | 全等 (值與型別皆相同) |
| `!=`   | 不等 |
| `!==`  | 不全等 |
| `>`    | 大於 |
| `<`    | 小於 |
| `>=`   | 大於等於 |
| `<=`   | 小於等於 |

```js
console.log(5 == "5");  // true
console.log(5 === "5"); // false
console.log(10 > 5);    // true
console.log(10 < 5);    // false
```


# **結論**

- JavaScript 基礎語法包含 **變數、型別、運算式、註解、作用範圍**
- 了解 **數據型別轉換**，避免不必要的錯誤
- 熟悉 **算術運算子與比較運算子**，掌握 JavaScript 運算邏輯
