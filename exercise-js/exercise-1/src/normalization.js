// console.log("Normalization");
var input = {
  "1": {
    id: 1,
    name: "John",
    children: [
      { id: 2, name: "Sally" },
      { id: 3, name: "Mark", children: [{ id: 4, name: "Harry" }] }
    ]
  },
  "5": {
    id: 5,
    name: "Mike",
    children: [{ id: 6, name: "Peter" }]
  }
};

var output = {};

let count = 0;
function normalize_input(obj) {
  for (let prop in obj) {
    if (typeof obj[prop] === "object") {
      normalize_input(obj[prop]);
    } else {
      if (prop === "id") {
        output[count + 1] = {};
        count++;
      }
      output[count.toString()][prop] = obj[prop];
    }
  }
}

let child_count = 1;
function count_child(obj) {
  for (let prop in obj) {
    if (prop === "children") {
      let child_ids = [];
      obj.children.forEach((child) => {
        child_ids.push(child.id);
      });
      output[child_count][prop] = child_ids;
      child_count += 2;
    }
    if (typeof obj[prop] === "object") {
      count_child(obj[prop]);
    }
  }
}

normalize_input(input);
count_child(input);
console.log(output);
