console.log('1');
let promise = new Promise((resolve, reject) => {
    // JS 主程式立即執行這裡的程式碼，直到整個 executor function 執行完畢為止
    console.log('2');
    // 呼叫 resolve() 來設定 Promise 為已完成狀態，並傳遞結果
    // JS 主程式不會被停下來
    resolve('Promise resolved');
    // 再接著執行這裡的程式碼
    console.log('3');
});


// 註冊處理 Promise 結果的處理器
promise.then(result => {
    console.log('4');
    console.log(result);
});

console.log('5');