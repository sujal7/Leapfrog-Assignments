var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) {
  const new_arr = collection.map((number) => tranFunc(number));
  return new_arr;
}

var output = transform(numbers, function (num) {
  return num * 2;
});

console.log(output);
