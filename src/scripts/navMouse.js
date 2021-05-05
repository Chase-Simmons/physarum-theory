function navMouse(coords, oldCoords) {
  const x = coords.x;
  const y = coords.y;

  oldCoords.x += Math.random() * 400;
  oldCoords.y += Math.random() * 400;
  const angle = Math.atan2(y - oldCoords.y, x - oldCoords.x);

  return { x: Math.cos(angle), y: Math.sin(angle) };
}

export default (coords, oldCoords) => {
  return navMouse(coords, oldCoords);
};
