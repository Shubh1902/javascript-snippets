const arr = [1, 2, [3, 4], undefined, null, [], [undefined, [5, 6, [7, 8]]]];

const result = [];
const flatten = function (array) {
  if (array === undefined || array === null) return;
  if (array.length === 0) return;
  if (typeof array !== "object") result.push(array);
  if (typeof array === "object" && Array.isArray(array)) {
    array.forEach((elem) => {
      flatten(elem);
    });
  }
};

flatten(arr);
console.log(result);
