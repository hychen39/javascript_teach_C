var globalVar = "全域變數";

function test() {
    var localVar = "函數變數";
    {
        let blockVar1 = "區塊變數1";
        console.log(globalVar); // 可存取
        console.log(localVar); // 可存取
        console.log(blockVar1); // 可存取
        // console.log(blockVar2); // 錯誤！區塊變數2 無法存取
    }
    {
        let blockVar2 = "區塊變數2";
    }
    console.log(localVar); // 可存取
    // console.log(blockVar1); // 錯誤！區塊變數1 無法存取
    // console.log(blockVar2); // 錯誤！區塊變數2 無法存取
}
console.log(globalVar); // 可存取
// console.log(localVar); // 錯誤！區域變數無法存取
test()