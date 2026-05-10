function calMeanStddev(...numbers) {
    // 1. 取得樣本數 n
    const n = numbers.length;
    // 2. 計算平均值
    // 2.1 計算總和，使用 reduce 方法
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    // 2.2 計算平均值
    const mean = sum / n;
    // 3. 計算標準差
    // 3.1 計算每個數字與平均值的差的平方，並求和
    const sumOfSquares = numbers.reduce((acc, num) => acc + (num - mean) ** 2, 0);
    // 3.2 計算方差
    const variance = sumOfSquares / n;
    // 3.3 計算標準差
    const stddev = Math.sqrt(variance);
    // 4. 回傳結果
    return [mean, stddev];
}

const [mean, stddev] = calMeanStddev(80, 75, 90, 85, 70);
console.log(`平均值: ${mean}, 標準差: ${stddev}`);

