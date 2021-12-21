const fruits = [
  {
    id: 1,
    name: "Banana",
    color: "Yellow"
  },
  {
    id: 2,
    name: "Apple",
    color: "Red"
  }
];

// This is using filter, but the type is not changed here
// function searchByName(fruits, name) {
//   let searchByName = fruits.filter((fruit) => {
//     return fruit.name === name;
//   });
//   console.log(searchByName);
// }
// searchByName(fruits, "Apple");

// We are able to change type to {} using reduce
function searchByName(fruits, name) {
  let result = fruits.reduce((accumulator, fruit) => {
    if (fruit.name.toLowerCase() === name) {
      return fruit;
    } else {
      return null;
    }
  }, {});
  console.log(result);
}
searchByName(fruits, "apple");

function searchByKey(fruits, name, fruit_name) {
  let result = fruits.reduce((accumulator, fruit) => {
    if (fruit[name].toLowerCase() === fruit_name) {
      return fruit;
    } else {
      return null;
    }
  }, {});
  console.log(result);
}

searchByKey(fruits, "name", "apple");

// We can use this if we want to search in each key
// function searchByName2(fruits, name) {
//   let result = fruits.reduce((accumulator, fruit) => {
//     for (let key in fruit) {
//       if (fruit[key].toString().toLowerCase() === name) {
//         return fruit;
//       }
//     }
//   }, {});
//   console.log(result);
// }
// searchByName2(fruits, "apple");
