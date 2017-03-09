module.exports = function (){
  return {
    add: function(num1, num2) {
      return num1+num2;
    },
    multiply: function(num1, num2) {
      return num1*num2;
         // add code here
    },
    square: function(num) {
      return num*num
    },
    random: function(num1, num2) {
         // add code here
      return Math.floor((Math.random() * num2) + num1)
    }
  }
};
   
