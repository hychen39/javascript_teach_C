/**
 * Dynamic Dispatch in JavaScript
 */

class Vehicle {
    constructor(color, currentSpeed, maxSpeed, gasoline){
        this.color = color;
        this.currentSpeed = currentSpeed;
        this.maxSpeed = maxSpeed;
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

