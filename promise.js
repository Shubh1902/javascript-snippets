// const p = new Promise((resolve, reject) => {
//   resolve("Success");
// });

// p.then((res) => {
//   console.log(res);
// });

const log = console.log;

function MyPromise(executorFunction) {
  let fulfilled = false;
  let called = false;
  let rejected = false;
  let userProvidedResolver;
  let userProvidedRejector;
  const resolve = function (resultantValue) {
    if (!called) {
      queueMicrotask(() => {
        userProvidedResolver(resultantValue);
        called = true;
        fulfilled = true;
      });
    }
  };

  const reject = function (error) {
    if (!called) {
      queueMicrotask(() => {
        userProvidedRejector(error);
        called = true;
        rejected = true;
      });
    }
  };

  this.then = function (resolver) {
    userProvidedResolver = resolver;
    return this;
  };

  this.catch = function (rejector) {
    userProvidedRejector = rejector;
  };

  executorFunction(resolve, reject);
}

const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 4000);
});

p2.then((value) => {
  log(value);
})
  .then((value) => log(value))
  .catch((error) => log(error));
