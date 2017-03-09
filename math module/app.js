var my_module = require('./mathlib');
var my_moduleobj=my_module();
console.log(my_moduleobj);
console.log(my_moduleobj.add(1,2));
console.log(my_moduleobj.multiply(1,2));
console.log(my_moduleobj.square(6));
console.log(my_moduleobj.random(9,12));
