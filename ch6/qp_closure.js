
function createCounter(startValue){
    return function(){
        console.log(startValue++);
    }
}

let counter1 = createCounter(1);
let counter2 = createCounter(10);

counter1();
counter1();
counter1();

counter2();
counter2();
counter2();
