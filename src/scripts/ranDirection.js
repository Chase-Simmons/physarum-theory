export default () => {
  let randomDirection;

  const randomBool = Math.floor(Math.random() * 2);

  if (randomBool === 1) {
    randomDirection = -Math.floor(Math.random() * 2);
  } else {
    randomDirection = Math.floor(Math.random() * 2);
  }
  return randomDirection;
};
