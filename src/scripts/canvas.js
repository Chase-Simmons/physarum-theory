const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.imageSmoothingEnabled = true;

document.body.append(canvas);

export default canvas;
