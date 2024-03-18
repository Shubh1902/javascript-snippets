const exampleElement = document.querySelector(".example");

let startTime,
  rightDone = false;
function step(timeStamp) {
  if (!startTime) startTime = timeStamp;
  if (!rightDone) {
    const elapsedTime = timeStamp - startTime;
    const newPosition = Math.min(elapsedTime * 0.1, 200);
    exampleElement.style.transform = `translate(${newPosition}px)`;
    window.requestAnimationFrame(step);
    if (newPosition === 200) {
      startTime = timeStamp;
      rightDone = true;
    }
  } else {
    const elapsedTime = timeStamp - startTime;
    const newPosition = 200 - Math.min(elapsedTime * 0.1, 200);
    exampleElement.style.transform = `translate(${newPosition}px)`;
    window.requestAnimationFrame(step);
    if (newPosition === 0) {
      startTime = timeStamp;
      rightDone = false;
    }
  }
}

window.requestAnimationFrame(step);
