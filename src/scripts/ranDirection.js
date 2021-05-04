export default () => {
  let randomDirection;

  const randomBool = Math.floor(Math.random() * 2);

  if (randomBool === 1) {
    randomDirection = -1;
  } else {
    randomDirection = 1;
  }
  return randomDirection;
};
