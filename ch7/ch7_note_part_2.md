
# Chapter 7 類別、原型與繼承: Part 2 物件與陣列的操作

## 物件與陣列的操作

### 物件的陣列

處理物件陣列是 JavaScript 程式設計中的常見任務。

典型情境:
- 查詢具有相同 class 名稱的 HTML 元素物件(HTMLElement objects) 並將它們存儲為物件陣列。
- 當在頁面上點擊按上傳檔案時, 取得多個 File 物件 並將它們存儲為物件陣列。


### 範例: 建立 `cars` 陣列，包含 2 個 FIAT500 物件

使用 `FIAT500` 類別來創建兩個車輛物件，並將它們存儲在 `cars` 陣列中。

```javascript
const cars = [
  new FIAT500('Fiat', '500', 1957, 'Blue', 2, 6000),
  new FIAT500('Fiat', '500', 1957, 'Red', 2, 80000)
];
```

可迭代陣列呼叫 `FIAT500` 實例的 `getCarInfo()` 方法來顯示每輛車的資訊：

```javascript
cars.forEach(car => {
  console.log(car.getCarInfo());
});
```

### 情境: 處理 HTMLElement Objects 陣列 

在底下的 HTML 文件中，為每個 radio button 新增一個 click 事件監聽器。
- 頁面上有三個 radio button，分別為 Huey(休依)、Dewey(杜威) 和 Louie(路易)。
  - 唐老鴨的三個姪兒

當 radio button 被點擊時，顯示 radio button 的值。

將值顯示在 `<p>` 元素中，其 id 為 `display`。


![](img/24-Sep-21-10-02-06.png)

```html
<fieldset>
        <legend>Select a maintenance drone:</legend>
      
        <div>
          <input type="radio" id="huey" name="drone" value="huey" checked />
          <label for="huey">Huey</label>
        </div>
      
        <div>
          <input type="radio" id="dewey" name="drone" value="dewey" />
          <label for="dewey">Dewey</label>
        </div>
      
        <div>
          <input type="radio" id="louie" name="drone" value="louie" />
          <label for="louie">Louie</label>
        </div>
      </fieldset>
    <div>
       Your selection: <p id="display"></p>
    </div>
```

做法:
- 首先, 取得所有 radio button 元素並存入陣列中。
  - 使用 `document.getElementsByName()` 方法取得 radio button 元素。
  - 回傳的資料型態: NodeList。
- 然後, 迭代陣列並為每個 radio button 新增 click 事件監聽器。
  - 監聽器函式取得 radio button 的值並顯示在 `<p>` 元素中。
    - 使用 `e.target.value` 取得 radio button 的值。


```javascript
let drones = document.getElementsByName('drone');

// NodeList(3) [input#huey, input#dewey, input#louie], an array of input elements
console.log(drones);  

// iterate the array
drones.forEach( drone => {
    // add a click event listener to each radio button
    drone.addEventListener('click', function(e){
        // get the radio button's value
        let value = e.target.value;
        // show the value in the <p> element
        document.getElementById('display').textContent = value;
    });
})
```

完整檔案參考 [examples/array_of_objects.html](examples/array_of_objects.html)

提醒：
- 這不是處理單選按鈕選擇的最佳方式。
- 更簡潔的做法: 將點擊事件監聽器新增到單選按鈕的父元素
  - 因為事件可以從單選按鈕 浮升 到父元素，讓我們在父元素上處理事件.


### 在屬性中使用陣列

屬性的值可以是任何資料型態，包括陣列或其他物件。

範例: 為 `FIAT500` 類別新增一個屬性 `gear` 表示車輛的檔位，並將其值設為一個陣列，包含不同檔位的名稱。

```javascript
class FIAT500 {
  constructor(maker, model, year, color, passengers, mileage) {
    this.maker = maker;
    this.model = model;
    this.year = year;
    this.color = color;
    this.passengers = passengers;
    this.mileage = mileage;
    // 屬性的值可以是陣列
    this.gear = ['P', 'R', 'N', 'D']; // 表示車輛的檔位
  }
}
```

顯示 `myFiat` 實例的的第一個檔位名稱：

```javascript
const myFiat = new FIAT500('Fiat', '500', 1957, 'Blue', 2, 6000);
console.log(myFiat.gear[0]);  // 輸出: 'P'
```

### 巢狀物件 

屬性的值也可以是另一個物件，形成巢狀物件（Nested Object）。

巢狀物件用來描述物件間 has-a 的關係。

例如: 車輛物件有一個屬性 `engine`，其值是一個物件，包含引擎的相關資訊, 如 `hoursepower` (馬力) 與 `torque` (扭力)。

我們使用 Object Literal 來定義 `engine` 屬性，並將其值設為一個物件：

```javascript
class FIAT500 {
  constructor(maker, model, year, color, passengers, mileage) {
    this.maker = maker;
    this.model = model;
    this.year = year;
    this.color = color;
    this.passengers = passengers;
    this.mileage = mileage;
    // 屬性的值可以是另一個物件
    this.engine = {
      horsepower: 100,
      torque: 150
    };
  }
}
```

顯示 `myFiat` 實例的引擎馬力：

```javascript
const myFiat = new FIAT500('Fiat', '500', 1957, 'Blue', 2, 6000);
console.log(myFiat.engine.horsepower);  // 輸出: 100
```

![](img/nested_object_memory_structure.png)

## 繼承


### 什麼是「繼承」？
- 繼承是一種從現有類別 (父類別) 建立新類別 (子類別) 的機制。
- 父類別表示子類別的通用屬性與方法。
  - 例如: 摩托車是一種車輛，因此「摩托車」繼承「車輛」的屬性與方法。
  - 車輛是父類別，摩托車是子類別。
- 子類別可以新增自己的屬性與方法，或覆寫父類別的方法以提供特定的行為。

![](img/24-Oct-30-16-38-23.png)

### 「繼承」對於程式設計的用途

**促進程式碼重覆使用**
- 子類別繼承父類別的屬性與方法，避免重複定義相同的程式碼。
  - 例如: 所有車輛都有共同的屬性與方法
    - 我們可以將這些共通的屬性與方法定義在父類別中，讓子類別繼承它們。
    - 不需要在每個子類別中重複定義相同的屬性與方法。

**建立類別階層**
- 繼承允許我們建立類別的階層結構，反映現實世界中物件之間的關係。
  - 繼承繼承可以描述「一般 → 特殊」(is-a) 關係
  - 例如: 車輛 → 汽車 
    - 汽車是一種車輛，因此汽車繼承車輛的屬性與方法。

**提供執行期的執行彈性與擴充性** 
- 對不同類別的物件，使用**相同的操作名稱時**，物件會各自表現出符合自己類型的行為
    - 在執行期動態地決定使用哪個類別的實例的方法
  - 此特性稱為多型 (Polymorphism)，是物件導向程式設計的重要特徵之一
  - 多型也可以理解成「相同介面，不同行為」。


### 例子: 不同車輛有不同的啟動方式(多型)

假設我們有幾種不同的車輛，例如汽油車、電動車和混合動力車。雖然它們都屬於「車輛」，而且都可以執行「啟動引擎」`startEngine()` 這個動作，但實際上的啟動方式並不相同。

- 汽油車啟動時，可能會發出引擎點火的聲音。
- 電動車啟動時，可能幾乎沒有聲音，而是直接進入可行駛狀態。
- 混合動力車則可能依照當下情況，決定使用電力模式或引擎模式啟動。

從使用者的角度來看，我們都是在對「車輛」下達相同的指令 `startEngine()`；但從物件本身來看，不同類別會執行各自的版本。這就是多型的核心概念。

未來新增新的車輛類型時，只要它遵守共同的操作介面(例如都有 `startEngine()) 方法，就能融入原本的程式，而不需要修改現有的程式碼，這就是多型帶來的彈性與擴充性。

![](img/object_inherit_concepts.png)

## 繼承父類別的程序與程式碼

### 建立子物件的過程

1. 指定要繼承的父類別: 子類別使用 `extends` 關鍵字指定父類別。
2. 初始化父類別的屬性: 子類別必須在建構子(constructor)中呼叫父類別的建構子 (`super()`) 來初始化父類別的屬性。
3. 初始化子類別的屬性: 子類別在同一個建構子中定義及初始化自己的屬性。
4. 新增子類別的方法: 子類別可以定義自己的方法，或覆寫父類別的方法以提供特定的行為。

### 範例: 建立 `Vehicle` 類別與 `Motorcycle` 子類別

### S1: 建立父類別 `Vehicle`

建立 `Vehicle` 類別，包含屬性 `color`、`currentSpeed`、`maxSpeed` 以及方法 `move()`。

```javascript
class Vehicle {
  constructor(color, currentSpeed, maxSpeed) {
    this.color = color;
    this.currentSpeed = currentSpeed;
    this.maxSpeed = maxSpeed;
  }

  move() {
    console.log("移動中，速度:", this.currentSpeed, "km/h");
  }
}
```

### S2: 建立子類別 `Motorcycle` 並指定繼承父類別 `Vehicle`

建立 `Motorcycle` 類別，繼承 `Vehicle` 類別，並新增屬性 `fuel` 與方法 `doWheelie()`。

```js
class Motorcycle extends Vehicle {
    
}
```

### S3: 撰寫 `Motorcycle` 的建構子 (Constructor)

`Motorcycle` 類別多了一個屬性 `fuel`.

撰寫 `Motorcycle` 的建構子 (Constructor):

1. 呼叫 `super()` 來初始化父類別的屬性 (子類別的責任)。
2. 定義及初始化子類別的屬性 

```javascript
class Motorcycle extends Vehicle {
  constructor(color, currentSpeed, maxSpeed, fuel) {
    // 呼叫父類別的建構子
    super(color, currentSpeed, maxSpeed);
    // 新增及初始化子類別的屬性
    this.fuel = fuel;
  }
}
```

### S4: 新增子類 `Motorcycle` 的方法

`Motocycle` 有「單輪行駛」的功能，因此新增 `doWheelie()` 方法。


```javascript
class Motorcycle extends Vehicle {
  constructor(color, currentSpeed, maxSpeed, fuel) {
    // 呼叫父類別的建構子
    super(color, currentSpeed, maxSpeed);
    // 新增及初始化子類別的屬性
    this.fuel = fuel;
  }
  // 子類別特有的方法
  doWheelie() {
    console.log("單輪行駛");
  }
}
```

此時，`Motorcycle` 類別可用的屬性與方法:

| 屬性/方法|來源類別|
|---|---|
|color|Vehicle|
|currentSpeed|Vehicle|
|maxSpeed|Vehicle|
|move()|Vehicle|
|fuel|Motorcycle|
|doWheelie()|Motorcycle|  


參考 [ex_07_inheritance.js](http://lecture_notes/ch7/ex_07_inheritance.js) 獲取完整程式碼。

### S5: 實體化 `Motorcycle` 類別，並使用繼承自 `Vehicle` 的方法

實體化 `Motorcycle` 類別，並使用 `move()` 與 `doWheelie()` 方法。

```javascript
let motor = new Motorcycle("紅色", 0, 200, "汽油");
console.log(motor.color); // 紅色
motor.accelerate(50); // 移動中，速度: 50 km/h
motor.move(); // 移動中，速度: 50 km/h
motor.doWheelie(); // 單輪行駛
```

![](img/prototype_chain.png)

## 物件實例的屬性獨立與方法共享

每個物件實例都有「自己的屬性資料」，但「方法是共享的」。

考慮以下的兩台摩托車 `motor1` 與 `motor2`：

```javascript
let motor1 = new Motorcycle("紅色", 0, 200, "汽油");
let motor2 = new Motorcycle("藍色", 0, 200, "電動");
```

`motor1` 與 `motor2` 都有自己的屬性資料，例如 `color`、`currentSpeed`、`maxSpeed` 和 `fuel`。

注意： **父類的屬性值直接建立在子類實例上**

但是他們的行為都是相同的，因為他們共享 `Motorcycle` 類別的方法，例如 `move()` 和 `doWheelie()`。
- 而 `Motorcycle` 類別的方法又繼承來自 `Vehicle` 類別的方法： `move()`。


![](img/object_prototype.png)

## Prototype 原型

Q: 相同類別的物件實例為什麼可以共享方法？

因為 JavaScript 使用「原型」(prototype) 來實現方法共享。

每個類別都有一個原型物件，該物件包含了類別的方法。

當我們建立一個類別的實例時:
1. 在記憶體中為該實例分配空間，並儲存實例的屬性資料。
2. 將該實例的內部屬性 `[[Prototype]]` 指向類別的原型物件。
3. 當我們呼叫實例的方法時，JavaScript 會先在實例本身尋找該方法。
   - 如果找不到就會沿著 `[[Prototype]]` 指向的原型物件尋找。

### 動態為某個實體新增方法

我們可以直接在某個實體上新增方法，這樣該方法就會成為該實體的「自有方法」，而不會影響其他實例。

例如, 我們改裝 `motor1` 使它能夠「飛行」，我們可以直接在 `motor1` 上新增一個 `fly()` 方法：

```javascript
motor1.fly = function() {
  console.log("飛行中");
};
```

這樣 `motor1` 就有了 `fly()` 方法，但 `motor2` 沒有這個方法：

```javascript
motor1.fly(); // 飛行中
motor2.fly(); // TypeError: motor2.fly is not a function
```

### 動態為所有實體新增方法

如果要為所有實體新增方法，要將方法新增到類別的原型物件(prototype)上
這樣所有實例都能共享這個方法.

例如, 我們想要為所有 `Motorcycle` 實例新增一個 `honk()` 方法，我們可以將該方法新增到 `Motorcycle.prototype` 上：

```javascript
Motorcycle.prototype.honk = function() {
  console.log("按喇叭");
};
```

這樣所有 `Motorcycle` 實例都能使用 `honk()` 方法：

```javascript
motor1.honk(); // 按喇叭
motor2.honk(); // 按喇叭
```

## 呼叫父類別的方法：「原型鏈」(Prototype Chain)

Q: 在物件實例中，如何呼叫到父類別的方法？

父類別的方法也放在其原型物件(prototype)上。

要呼叫到父類別的方法，就必須沿著以下路徑尋找方法：

```
實例 -> 實例的 prototype -> 父類別的 prototype -> 父類別的方法
```

此路徑稱為「原型鏈」(Prototype Chain)。

例子: `motor1` 及 `motor2` 兩個實例要呼叫 `Vehicle` 類別的 `move()` 方法時的尋找路徑(Prototype Chain):

```
motor1 -> motor1 的 prototype -> Motorcycle.prototype -> Vehicle.prototype -> move() 方法
motor2 -> motor2 的 prototype /
```

### 使用 `Object` 型別的方法

當使用 `class` 的建構子(constructor)建立類別時，該類別會自動繼承 `Object` 類別的方法，例如 `toString()`等等。

在繼承鏈中，`Object` 類別位於最頂端，因此所有類別都能使用 `Object` 的方法。

例如: `motor1` 實例可以使用 `toString()` 方法，因為它繼承自 `Object` 類別：

```javascript
console.log(motor1.toString()); // [object Object]
```

此時 `toString()` 方法的尋找路徑(Prototype Chain) 為：

```
motor1 -> motor1 的 prototype -> Motorcycle.prototype -> Vehicle.prototype -> Object.prototype -> toString
```


### 覆寫父類別的方法

子類別可以用相同的方法名稱來定義自己的方法，這樣就會覆寫父類別的方法。

例如，要為 `Motorcycle` 定義自己的 `toString()` 方法, 而不要使用 `Object` 類別的 `toString()` 方法，我們可以在 `Motorcycle` 類別中定義一個新的 `toString()` 方法：

```javascript
class Motorcycle extends Vehicle {
  constructor(color, currentSpeed, maxSpeed, fuel) {
    super(color, currentSpeed, maxSpeed);
    this.fuel = fuel;
  }
    toString() {
        return `Motorcycle: ${this.color}, ${this.currentSpeed} km/h, ${this.fuel}`;
    }   
}
```

這樣當我們呼叫 `motor1.toString()` 時，就會使用 `Motorcycle` 類別的 `toString()` 方法，而不是 `Object` 類別的 `toString()` 方法：

```javascript
console.log(motor1.toString()); // Motorcycle: 紅色, 0 km/h, 汽油
```

`toString()` 方法的尋找路徑(Prototype Chain) 為：

```
motor1 -> motor1 的 prototype -> Motorcycle.prototype -> toString() 方法
```

### 原型鏈中尋找方法的過程

當我們呼叫實例的方法時，JavaScript 會按照以下順序尋找方法：
1. 首先在實例本身尋找方法。
2. 如果找不到，就會沿著 `[[Prototype]]` 指向的原型物件尋找方法。
3. 如果在父類別的原型物件上找不到，就會繼續沿著原型鏈尋找，直到找到方法或到達原型鏈的頂端 (`Object.prototype`)。
4. 如果在整個原型鏈上都找不到方法，則會拋出 `TypeError`。

注意: 使用 「父類的屬性值」時不會沿著原型鏈尋找
- 因為父類的屬性值直接建立在子類實例上，而不是放在原型物件上，所以不會沿著原型鏈尋找。 

### 呼叫被覆寫的父類別方法

如果子類別覆寫了父類別的方法，但我們仍然想要呼叫到被覆寫的父類別方法，可以使用 `super` 關鍵字來呼叫父類別的方法。

例如, 在 `Motorcycle` 類別的 `toString()` 方法中，我們想要呼叫 `Object` 類別的 `toString()` 方法來獲取物件的預設字串表示，可以使用 `super.toString()` 來呼叫父類別的方法：

```javascript
class Motorcycle extends Vehicle {
  constructor(color, currentSpeed, maxSpeed, fuel) {
    super(color, currentSpeed, maxSpeed);
    this.fuel = fuel;
  }
    toString() {
        // 呼叫父類別的 toString() 方法
        const parentString = super.toString();
        return `Motorcycle: ${this.color}, ${this.currentSpeed} km/h, ${this.fuel}, Parent: ${parentString}`;
    }   
}
``` 

所以 `super.method()` 可以理解為： 
> 從父類別的 prototype 開始，沿著 Prototype Chain 尋找最近定義的 method()，找到後以目前物件 (this) 作為執行對象呼叫。

假設 `Vehicle` 類別沒有覆寫 `toString()` 方法，那麼 `super.toString()` 就會呼叫到 `Object` 類別的 `toString()` 方法。
前述例子的 `toString()` 方法的尋找路徑(Prototype Chain) 為：

```
motor1 -> motor1 的 prototype -> Motorcycle.prototype -> toString() 方法 -> super.toString() -> Motorcycle.prototype -> Vehicle.prototype -> Object.prototype -> toString() 方法
```

## 神秘的 `this` 關鍵字

### 物件的 this

Q: 實例的屬性資料分開存放，但是方法是共享的。那麼在實例中執行方法時，該方法如何知道要操作哪個實例的屬性資料？

執行方法時，需要知道「方法的執行對象」(the object on which the method is being executed)，以便在方法內部能夠正確地存取該對象的屬性資料。

在 JavaScript 中，方法內部使用 `this` 關鍵字來指代「方法的執行對象」或者稱為 「上下文物件」（Context Object）. 
- this 的值在是由 JS 引擎在執行方法時動態決定的

考慮以下的 `Motorcycle` 類別：

```javascript
class Motorcycle extends Vehicle {
  constructor(color, currentSpeed, maxSpeed, fuel) {
    super(color, currentSpeed, maxSpeed);
    this.fuel = fuel;
  }
  doWheelie() {
    console.log("單輪行駛，速度:", this.currentSpeed, "km/h");
  }
}

let motor1 = new Motorcycle("紅色", 5, 200, "汽油");
let motor2 = new Motorcycle("藍色", 10, 200, "電動");

motor1.doWheelie(); // 單輪行駛，速度: 5 km/h
motor2.doWheelie(); // 單輪行駛，速度: 10 km/h
```

在建構子中的 `this` 和 在 `doWheelie()` 方法中的 `this` 有什麼差別？

- 在建構子中的 `this` 指的是正在被建立的實例，當我們呼叫 `new Motorcycle(...)` 時，`this` 就指向該新建立的實例。
- 在 `doWheelie()` 方法中的 `this` 指的是呼叫該方法的實例，當我們呼叫 `motor1.doWheelie()` 時，`this` 就指向 `motor1` 實例；當我們呼叫 `motor2.doWheelie()` 時，`this` 就指向 `motor2` 實例。

所以，在 物件使用的情境下，決定 `this` 所指向的上下文物件(Context Object) 的規則:

1. 呼叫物件的方法時: `this` 表示呼叫該方法的物件實例。
2. 在建構子中: `this` 表示正在被建立的物件實例。

### 函式的 this

獨立函數

arrow function 的 this



