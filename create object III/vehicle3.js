// class VehicleConstructor{
//   constructor(name,numwheel,numpass,speed){
//     this.name=name;
//     this.numwheel=numwheel;
//     this.numpass=numpass;
//     this.speed=speed;
//     this.distance_travelled=0;
//   }
//   updateDistanceTravelled(){
//     this.distance_travelled+=this.speed;
//   }
//   makeNoise() {
//     console.log(`this is makenoise fun of ${this.name}`);
//   }
//   move(){
//     this.updateDistanceTravelled();
//     this.makeNoise();
//   }
//   checkMiles(){
//     console.log(this.distance_travelled);
//   }
// }
function VehicleConstructor(name,numwheel,numpass,speed){
  var chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  this.distance_travelled=0;
  this.name=name || vehicel;
  this.numwheel=numwheel || 1;
  this.numpass=numpass || 0;
  this.speed=speed;
  // this.VIN=Math.floor((Math.random() * 100000000) + 50000000);
  this.VIN=createvin();
  function createvin(){
    var vin='';
    for (var i=0;i<17;i++){
      vin+=chars[Math.floor(Math.random()*35)];
    }
    return vin;
  }
  if (!(this instanceof VehicleConstructor)) {
     // the constructor was called without "new".
     return new VehicleConstructor(name,numwheel,numpass,speed);
   }
}

VehicleConstructor.prototype.updateDistanceTravelled=function(){
  this.distance_travelled+=this.speed;
  return this;
}
VehicleConstructor.prototype.makeNoise=function() {
  console.log(`this is makenoise fun of ${this.name}`);
  return this;
}
VehicleConstructor.prototype.move=function(){
  this.updateDistanceTravelled();
  this.makeNoise();
  return this;
}
VehicleConstructor.prototype.checkMiles=function(){
  console.log(this.distance_travelled);
  return this;
}
VehicleConstructor.prototype.checkVIN=function(){
  console.log(`the VIN of ${this.name} is: ${this.VIN}`);
  return this;
}

var bike=new VehicleConstructor('bike',2,2,10);
bike.makeNoise();
bike.makeNoise=function() {
  console.log('ring ring');
  return this;
}
bike.checkVIN().makeNoise().move().checkMiles();
bike.move();
bike.checkMiles();

var sedan=new VehicleConstructor('sedan',4,5,40);
sedan.makeNoise();
sedan.makeNoise=function() {
  console.log('Honk Honk');
  return this;
};
sedan.checkVIN().makeNoise().move().checkMiles();


var bus=new VehicleConstructor('bus',4,20,20);
bus.addpass=function(numpickup) {
  bus.numpass+=numpickup;
  return this;
};
bus.makeNoise();
bus.checkVIN().addpass(7).move().checkMiles();
console.log(bus.numpass);
