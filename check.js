

// asyncFunction('dsd', function successInside(param1, param2) {
//   console.log(param1 +" " + param2);
// });

// asyncFunction('dsd', (param1, param2) => {
//   console.log(param1 +" " + param2);
// });

// console.log('this line was running 1.');
// asyncFunction('ds', successOutside);
// console.log('this line was running 2.');


// function successOutside(param1, param2) {
//   console.log('this line was running 3.');
// }


// /// other peroson

// function asyncFunction(lastName, onFinish) {
//     setTimeout(onFinish, 3 * 1000);; //
// }
(async () => {
console.log('line 1');
let tozaha = await longOperation();
let tozaha = await longOperation2();
let tozaha = await longOperation();
console.log(tozaha);
console.log('line 2');
})();

/// somewhere

async function longOperation() {
  return new Promise((resolve, reject) => {
      setTimeout(() => { 
        let calcaulation = 500;
        resolve(calcaulation);
      } , 5000)
  });
}
