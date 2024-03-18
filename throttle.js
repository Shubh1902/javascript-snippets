function throttle(fn, interval = 500) {
  let running = false;
  return function (...args) {
    if (!running) {
      running = true;
      fn.call(this, ...args);
      setTimeout(() => {
        running = false;
      }, interval);
    }
  };
}
