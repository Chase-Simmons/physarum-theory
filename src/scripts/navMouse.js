import canvas from './canvas';

function navMouse(coords) {
  console.log(coords);
  const x = coords.x;
  const y = coords.y;

  const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);

  return { x: Math.cos(angle), y: Math.sin(angle) };
}

export default (coords) => {
  navMouse(coords);
};
