# Ch4 觀念測驗詳解

## Q1

閱讀下列程式碼，請判斷輸出的結果：

``` js
let str = "hello";

str.toUpperCase();

console.log(str);
```

輸出結果為：

    hello

------------------------------------------------------------------------

### 原因說明

`str` 是一個 **原生字串型別 (primitive string)**。

``` js
let str = "hello";
```

當執行：

``` js
str.toUpperCase();
```

JavaScript 會進行 **自動裝箱 (autoboxing)**，概念上等同於：

``` js
(new String(str)).toUpperCase();
```

也就是：

1.  建立一個 **暫時的 String 物件**
2.  呼叫 `toUpperCase()` 方法
3.  回傳一個新的字串 `"HELLO"`

但是在題目中：

``` js
str.toUpperCase();
```

回傳的字串 **沒有被任何變數接住**，因此會被丟棄。

所以 `str` 本身仍然是原來的值：

    "hello"

------------------------------------------------------------------------

### 教學重點

    string 是 immutable
    字串方法會回傳新的字串
    不會改變原本的字串

------------------------------------------------------------------------

# Q2

閱讀下列程式碼，請判斷輸出的結果：

``` js
let str = "hello";

console.log(str === new String("hello"));
```

輸出結果為：

    false

------------------------------------------------------------------------

### 原因說明

在這段程式碼中：

``` js
let str = "hello";
```

`str` 的型別是：

    string (primitive type)

而：

``` js
new String("hello")
```

建立的是：

    String object

因此兩者的型別不同：

  值                      型別
  ----------------------- --------------------
  `"hello"`               string (primitive)
  `new String("hello")`   object

------------------------------------------------------------------------

### 為什麼結果是 `false`？

因為 `===` 是 **嚴格相等運算子 (strict equality)**：

-   不會進行型別轉換
-   型別不同就會回傳 `false`

因此：

``` js
"hello" === new String("hello")
```

結果為：

    false

------------------------------------------------------------------------

### 補充：若使用 `==`

如果改成：

``` js
console.log(str == new String("hello"));
```

結果會是：

    true

原因是：

    == 會進行型別轉換

`new String("hello")` 會被轉換為 primitive string `"hello"` 再進行比較。

------------------------------------------------------------------------

### 教學重點

    string 是 primitive type
    String 是 object type
    === 不會進行型別轉換
    因此比較結果為 false
