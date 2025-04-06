
/**  
 * Add the turbo method to the Vehicle class at the runtime using the prototype object 
*/

// The Vehicle class definition 
/**
 * Vehicle class
 */
class Vehicle {
    // don't have the private fields. So, don't have to declare them
    // Add properties to the `this` object directly in the constructor
    /**
     * 
     * @param {string} color 
     * @param {number} currentSpeed 
     * @param {number} maxSpeed 
     */
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


// Define the Motorcycle class that extends the Vehicle class
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

// Create two instances of the Motorcycle class

let motor1 = new Motorcycle("red", 10, 200, "gasoline");
let motor2 = new Motorcycle("blue", 40, 120, "diesel");

// Add the turbo method to the Vehicle prototype at the runtime using the prototype object

motorcyclePrototype = Object.getPrototypeOf(motor1); // or motor1.__proto__;
vehiclePrototype = Object.getPrototypeOf(motorcyclePrototype); // or motorcyclePrototype.__proto__;
vehiclePrototype.turbo = function(){
    console.log("Turbo() in Vehicle prototype");
    this.currentSpeed *= 2;}

// Or use Vehicle.prototype to access the prototype object for the Vehicle class
// Vehicle.prototype.turbo = function(){
//     console.log("Turbo() in Vehicle prototype");
//     this.currentSpeed *= 2;}


console.log("motor1 current speed: ", motor1.currentSpeed); 
motor1.turbo();
console.log("motor1 speed after turing on turbo: ",motor1.currentSpeed);

console.log("motor2 current speed: ", motor2.currentSpeed); 
motor2.turbo();
console.log("motor2 speed after turing on turbo: ",motor2.currentSpeed);

// show the prototype chain of an object
let printPrototypeChain = function(obj){
    let proto = obj;
    while (proto){
        console.log(proto);
        proto = Object.getPrototypeOf(proto);
    }
}

printPrototypeChain(motor1);
printPrototypeChain(motor2);

/* Output example:

motor1 current speed:  10
Turbo() in Vehicle prototype
motor1 speed after turing on turbo:  20
motor2 current speed:  40
Turbo() in Vehicle prototype
motor2 speed after turing on turbo:  80
Motorcycle {
  color: 'red',
  currentSpeed: 20,
  maxSpeed: 200,
  fuel: 'gasoline'
}
Vehicle {}
{ turbo: [Function (anonymous)] }
[Object: null prototype] {}
Motorcycle {
  color: 'blue',
  currentSpeed: 80,
  maxSpeed: 120,
  fuel: 'diesel'
}
Vehicle {}
{ turbo: [Function (anonymous)] }
[Object: null prototype] {}
 */