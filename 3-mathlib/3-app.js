
let math = require('./3-mathlib')();
console.log(math);

// add two numbers (e.g. math.add(2,3) should return 5)
let add = math.add(2,3);

// multiply two numbers (e.g. math.multiply(3,5) should return 15)
let mult = math.multiply(3,5);

// square a number (e.g. math.square(5) should return 25)
let square = math.square(5);

// return a random number between the two numbers (e.g. math.random(1,35) should return a random number between 1 and 35)
let random = math.random(1,35);

console.log(add, mult, square, random);