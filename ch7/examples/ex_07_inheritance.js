/**
 * vehicles have common properties and methods 
  - Properties: color, current speed, max speed
  - Methods: move, accelerate
 */

class Vehicle {
    // don't have the private fields. So, don't have to declare them
    // Add properties to the `this` object directly in the constructor
    constructor(color, currentSpeed, maxSpeed){
        // add properties to the `this` object
        this.color = color;
        this.currentSpeed = currentSpeed;
        this.maxSpeed = maxSpeed;
    }

    // methods
    move(){
        console.log("moving at", this.currentSpeed, "km/h");
    }

    accelerate(amount){
        this.currentSpeed += amount;
        // max speed limitation
        if (this.currentSpeed > this.maxSpeed){
            this.currentSpeed = this.maxSpeed;
        }
    }
}

/**
 *  motorcycle is a type of vehicle. 
 * The motorcycle has additional properties and methods
 * Property: fuel 
 * Method: wheelie
 */

class Motorcycle extends Vehicle{
    /**
     * constructor
     * Need to call the parent class constructor at the beginning of the child class constructor
     * @param {string} color 
     * @param {number} currentSpeed 
     * @param {number} maxSpeed 
     * @param {string} fuel: type of fuel
     */
    constructor(color, currentSpeed, maxSpeed, fuel){
        // MUST call the parent class constructor
        super(color, currentSpeed, maxSpeed);
        // Add additional properties to the `this` object
        this.fuel = fuel;
    }
    // Additional method
    doWheelie(){
        console.log("Driving on one wheel");       
    }
}

// Create an instance of the Motorcycle class

let motor = new Motorcycle("red", 0, 200, "gasoline");

console.log(motor.color); 
motor.accelerate(30);
motor.move();
motor.doWheelie(); 

let obj = motor;
do {
    obj = Object.getPrototypeOf(obj);
    console.log(obj);
} while(obj)