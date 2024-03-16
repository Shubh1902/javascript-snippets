const log = console.log;
Array.prototype.mapLimit = function (limit, executor) {
  const arr = this;
  const isValidArray =
    typeof arr === "object" && Array.isArray(arr) && arr.length > 0;
  if (!isValidArray) return new Promise.resolve([]);

  return new Promise((resolve, reject) => {
    let queueLength = 0;
    let finalResult = [];
    let resolvedCount = 0;
    let currentIndex = 0;
    function startExecution() {
      arr.slice(0, limit).forEach((elem, index) => {
        addToQueue(executor(elem), index);
        currentIndex++;
      });
    }

    function checkQueue() {
      if (resolvedCount === arr.length || currentIndex === arr.length) return;
      if (queueLength < limit) {
        addToQueue(executor(arr[currentIndex]), currentIndex);
        currentIndex++;
      }
    }

    function addToQueue(promise, index) {
      queueLength++;
      promise
        .then((result) => {
          log(
            `resolved index ${index} with value ${result} and queueLength is ${queueLength}\n`
          );

          finalResult[index] = result;
          resolvedCount++;
          queueLength--;
          if (resolvedCount === arr.length) {
            resolve(finalResult);
          } else {
            checkQueue();
          }
        })
        .catch((error) => {
          log(
            `REJECTED index ${index} with value ${error} and queueLength is ${queueLength}\n`
          );
          finalResult[index] = error;
          resolvedCount++;
          queueLength--;
          if (resolvedCount === arr.length) {
            resolve(finalResult);
          } else {
            checkQueue();
          }
        });
    }
    startExecution();
  }).catch((error) => log(error));
};

const p = new Promise((resolve, reject) => {
  resolve("Success");
});

const executor = function (value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value % 2 === 0) reject("REJECTED");
      else resolve(value * 2);
    }, 1000);
  });
};

const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//method call
testArray
  .mapLimit(2, executor)
  .then((result) => log(result))
  .catch((error) => log(error));
