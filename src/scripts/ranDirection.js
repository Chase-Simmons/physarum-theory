export default () => {
  let randomDirection;

  const randomBool = Math.floor(Math.random() * 2);

  if (randomBool === 1) {
    randomDirection = -2;
  } else {
    randomDirection = 2;
  }
  return randomDirection;
};
