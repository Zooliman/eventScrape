
class EventbriteProvider {

   provide(baseUrl) {
    console.log('Providing events for baseUrl: '  + baseUrl);
    let events = [];
    // copy all code;
    return events;
  }

}

module.exports =  EventbriteProvider;

















// class Person {

//     name = '';
//     age = 0;

//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     talk() {
    
//         console.log(this.name +  'is talking...')
//     }

//     walk() {
//         console.log(this.name + ' is walking...')
//     }
// }


// let person1 = new Person('rom', 27);
// let person2 = new Person('bar', 24);

// person1.walk();
// person2.walk();