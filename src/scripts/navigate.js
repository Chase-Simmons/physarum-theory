import canvas from './canvas';

function navigate() {
  let randomDirection;

  // const randomBool = Math.floor(Math.random() * 2);

  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;

  const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);

  return { x: Math.cos(angle), y: Math.sin(angle) };
}

export default navigate;
