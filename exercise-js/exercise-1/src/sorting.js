var arr = [
  {
    id: 1,
    name: "John"
  },
  {
    id: 2,
    name: "Mary"
  },
  {
    id: 3,
    name: "Andrew"
  }
];

function sortBy(array, key) {
  const sorted_arr = array;
  let temp;
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (sorted_arr[i][key] > sorted_arr[j][key]) {
        temp = sorted_arr[i];
        sorted_arr[i] = sorted_arr[j];
        sorted_arr[j] = temp;
      }
    }
  }
  return sorted_arr;
}

var sorted = sortBy(arr, "name");
console.log(sorted);
