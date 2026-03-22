
# JavaScript 數學函數速查表 (Cheat Sheet)

在 JavaScript 中，數學運算主要透過內建的 Math 物件來處理。這是一份常用數學函數的速查表 (Cheat Sheet)。

1. 四捨五入與取整數

| 函數 [1] | 說明 | 範例 |
|---|---|---|
| Math.round(x) | 四捨五入至最接近的整數 | Math.round(3.5) → 4 |
| Math.ceil(x) | 無條件進位 (Ceiling) | Math.ceil(3.1) → 4 |
| Math.floor(x) | 無條件捨去 (Floor) | Math.floor(3.9) → 3 |
| Math.trunc(x) | 直接截斷小數部分，只留整數 | Math.trunc(-3.9) → -3 |

2. 指數、對數與開方

| 函數 [1] | 說明 | 範例 |
|---|---|---|
| Math.pow(x, y) | 計算 $x$ 的 $y$ 次方 | Math.pow(2, 3) → 8 |
| Math.sqrt(x) | 計算 $x$ 的平方根 | Math.sqrt(16) → 4 |
| Math.cbrt(x) | 計算 $x$ 的立方根 | Math.cbrt(27) → 3 |
| Math.exp(x) | 計算 $e$ 的 $x$ 次方 | Math.exp(1) → 2.718... |
| Math.log(x) | 計算 $x$ 的自然對數 ($\ln x$) | Math.log(10) → 2.302... |

3. 極值與絕對值

| 函數 [1] | 說明 | 範例 |
|---|---|---|
| Math.abs(x) | 取得 $x$ 的絕對值 | Math.abs(-5) → 5 |
| Math.max(a, b, ...) | 回傳一組數字中的最大值 | Math.max(1, 5, 2) → 5 |
| Math.min(a, b, ...) | 回傳一組數字中的最小值 | Math.min(1, 5, 2) → 1 |

4. 隨機數

| 函數 | 說明 | 常用公式 |
|---|---|---|
| Math.random() | 產生 $0$ (含) 到 $1$ (不含) 之間的隨機浮點數 | Math.random() |
| 整數範圍 | 產生 $min$ 到 $max$ 之間的隨機整數 | Math.floor(Math.random() * (max - min + 1)) + min |

5. 三角函數 (使用弧度 Radian)

| 函數 | 說明 | 範例 |
|---|---|---|
| Math.sin(x) | 正弦函數 | Math.sin(Math.PI / 2) → 1 |
| Math.cos(x) | 餘弦函數 | Math.cos(Math.PI) → -1 |
| Math.tan(x) | 正切函數 | Math.tan(0) → 0 |
| Math.atan2(y, x) | 回傳點 $(x, y)$ 的極座標角度 | Math.atan2(1, 1) → 0.785... |

6. 重要數學常數

* Math.PI：圓周率 $\pi$ ($\approx 3.14159$)
* Math.E：歐拉數 $e$ ($\approx 2.718$)
* Math.SQRT2：$2$ 的平方根 ($\approx 1.414$) [2] 

進階提示

* 運算子簡寫：ES6 之後可以使用 ** 來代替 Math.pow()。例如 2 ** 3 等於 8。
* 類型轉換：若要將字串轉換為數字，可使用 parseInt() 或 parseFloat()。 [3, 4] 

更多詳細資訊可以參考 [MDN Math 官方文件](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math)。

[1] [https://medium.com](https://medium.com/@kenken880929/javascript-math-object-%E6%95%B8%E5%AD%B8%E7%89%A9%E4%BB%B6-ce7642cde058#:~:text=%E5%9F%BA%E6%9C%AC%E7%9A%84%E9%81%8B%E7%AE%97%E6%96%B9%E6%B3%95%20%C2%B7%20%E8%A8%88%E7%AE%97x%20%E7%9A%84y%20%E6%AC%A1%E6%96%B9%E5%80%BC:%20Math.pow%28x%2Cy%29%20%C2%B7,%E8%A8%88%E7%AE%97x%E7%9A%84%E7%AB%8B%E6%96%B9%E6%A0%B9:%20Math.cbrt%28x%29%20%C2%B7%20%E8%A8%88%E7%AE%97x%E7%9A%84%E7%B5%95%E5%B0%8D%E5%80%BC:%20Math.abs%28x%29%20%C2%B7%20%E8%A8%88%E7%AE%97%E8%87%AA%E7%84%B6)
[2] [https://developer.mozilla.org](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math#:~:text=Math%20%2D%20JavaScript%20%7C%20MDN.)
[3] [https://developer.mozilla.org](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Grammar_and_types#:~:text=%E5%AD%97%E4%B8%B2%E8%BD%89%E6%95%B8%E5%80%BC%20*%20parseInt%28%29%20*%20parseFloat%28%29)
[4] [https://blog.csdn.net](https://blog.csdn.net/gitblog_00018/article/details/148361063)
