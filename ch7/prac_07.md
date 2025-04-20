# 第七章練習

## 練習 1

建立一個類別來追蹤公司中的員工。

該類別應具有以下屬性：名字、姓氏和工作年數。

使用該類別建立三個員工物件並將它們添加到一個陣列中。

為類別的原型添加一個方法。該方法回傳員工的全名和服務年數。不可將該方法直接添加到類別定義中。

遍歷陣列並印出每個員工的詳細訊息至主控台。

範例輸出：
```
Alice Smith has worked for 2 years
Bob Brown has worked for 3 years
Charlie Johnson has worked for 4 years
```

## 練習 2

考慮以下代碼位於 [prac_07_02_dynamic_dispatch](./prac_07_02_dynamic_dispatch.js).js 中：

```javascript
class Vehicle {
    constructor(color, currentSpeed, maxSpeed, gasoline){
        this.color = color;
        this.currentSpeed = currentSpeed;
        this.maxSpeed = this.maxSpeed;
        this.gasoline = gasoline;
    }

    turbo(){
        console.log("Turbo on...");
        this.currentSpeed *= 2
        console.log("Turbo off...");
        console.log("Current speed: ", this.currentSpeed);
    }
    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
        
}

class Motorcycle extends Vehicle {
    constructor(color, currentSpeed, maxSpeed, fuel){
        super(color, currentSpeed, maxSpeed, fuel);
    }
}

class SportCar extends Vehicle {
    constructor(color, currentSpeed, maxSpeed, fuel){
        super(color, currentSpeed, maxSpeed, fuel);
    }

    turbo(){
        console.log("Turbo() in SportCar class");
        this.currentSpeed *= 5;
        console.log("Turbo off...");
        console.log("Current speed: ", this.currentSpeed);
    }
}

let motor = new Motorcycle('red', 10, 100, 'gasoline');
let sportCar = new SportCar('blue', 10, 220, 'diesel');

motor.turbo();
sportCar.turbo();
```

1. 在呼叫 `turbo()` 方法後，`motor` 和 `sportCar` 的當前速度分別是多少？為什麼呢？
2. JavaScript 使用「動態分派」(Dynamic Dispatching)來決定調用哪個方法。請解釋「動態分派」以及它在上述代碼中的運作方式。


