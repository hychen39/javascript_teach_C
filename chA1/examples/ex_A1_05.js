
function delayMessage(myMessage) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 不是用 return，而是呼叫 resolve() 來設定 Promise 為已完成狀態，並傳遞結果
            // 使用 lexical scope 的特性，myMessage 會被封閉在這個函式的作用域中，所以可以直接使用
            resolve(myMessage);
        }, 1000);
    });
}

// 呼叫 delayMessage()，並使用 .then() 來處理 Promise 的結果

console.log("1. 呼叫 delayMessage 函式，等待 1 秒後會得到訊息");
delayMessage("2. 這是自訂的延遲訊息")
  .then(message => {
    console.log(message);
  });
console.log("3.主程式繼續執行，不等待 delayMessage 的結果");