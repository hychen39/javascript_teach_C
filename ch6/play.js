const a = 10;
function f(b){
    return function (){
        let c = 10;
        return a + b + c;
    }
}

funcN1 = f(20);
const k = funcN1();
console.log(k);

