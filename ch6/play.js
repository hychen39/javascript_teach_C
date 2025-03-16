
(
    function() {
        let counter = 0;
        function increment(){
            counter++;
            console.log(counter);
        }
        function setStartValue(initValue){
            counter = initValue;
        }
        // export the two functions
        global.myModule = {
            increment: increment,
            setStartValue: setStartValue
        }
    }
)();

// test the module
myModule.setStartValue(5);
myModule.increment(); // 6

