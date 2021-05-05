function randomDirection() {
  let randomDirection;

  const randomBool = Math.floor(Math.random() * 2);

  if (randomBool === 1) {
    randomDirection = -(Math.random() * 1);
  } else {
    randomDirection = Math.random() * 1;
  }

  return randomDirection;
}

export default randomDirection;
