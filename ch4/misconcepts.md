
# Mis-concepts in ch4


## Ch4 Post-test T6

三元運算子 `?:` 看不懂

不清楚 string.toLocaleString() 產生的結果與數字做 `>` 比較產生的副作用.

`toLocaleString()` 會將數字轉換當地化的字符串表示形式，如 12,000. 
與數字比較時，字符串會被轉換回數字，但 Number() 解析 "12,000" 產生 NaN，因為逗號不是有效的數字字符。因此，`"12,000" > 10000` 的結果是 false. 

## Ch4 Post-test T10

不知道判別 `NaN` 時要使用 `isNaN()` 函數，而不是直接用 `==` 或 `===` 比較，因為 `NaN` 不等於任何值，包括它自己。

```javascript
console.log(NaN === NaN); // false
console.log(isNaN(NaN)); // true
``` 

