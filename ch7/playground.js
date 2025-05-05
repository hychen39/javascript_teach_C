class Bird {
    constructor(name) {
      this.name = name;
    }
  
    fly() {
      console.log(`Bird is flying`);
    }
  }
  
  class Eagle extends Bird {
    fly() {
      console.log(`Eagle is flying`);
    }
  }

  Bird.prototype.sing = function() {
    console.log('I can sing');
  }
  const eagle1 = new Eagle('Eagle');
  eagle1.fly = function() {
    console.log('eagle1 is flying');
  }
  const eagle2 = new Eagle('Eagle2');

eagle1.fly(); 
eagle1.sing(); 
eagle2.fly();
eagle2.sing(); 