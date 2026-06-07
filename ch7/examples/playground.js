class Bird {
    constructor(name) {
      this.name = name;
    }
  
    fly() {
      console.log(`Bird is flying (prototype method)`);
    }
  }
  
  class Eagle extends Bird {
    fly() {
      console.log(`${this.name} is flying (Eagle-specific prototype method)`);
    }
  }

  Bird.prototype.sing = function() {
    console.log('I can sing');
  }

  const eagle1 = new Eagle('Eagle-1');
  eagle1.fly = function() {
    console.log(`${this.name} is flying with a special move (own method)`);
  }
  const eagle2 = new Eagle('Eagle-2');

eagle1.fly(); 
eagle1.sing(); 
eagle2.fly();
eagle2.sing(); 