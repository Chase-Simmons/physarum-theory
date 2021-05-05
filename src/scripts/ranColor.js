function randomColor() {
  const randomColorNum = Math.floor(Math.random() * 16777215).toString(16);

  const randomColorString = `#${randomColorNum}`;

  return randomColorString;
}

export default randomColor;
