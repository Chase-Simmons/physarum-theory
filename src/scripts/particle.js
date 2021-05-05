import canvas from './canvas';
import ranColor from './ranColor';
import ranDir from './ranDirection';

const ctx = canvas.getContext('2d');
// ctx.filter = 'blur(1px)';

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = 'rgba(255,255,255)';
    this.velocity = velocity;
  }

  draw() {
    new TrailingParticle(this.x, this.y, this.radius + 5);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (
      this.x > canvas.width ||
      this.x < 0 ||
      this.y > canvas.height ||
      this.y < 0
    ) {
      this.velocity.x = ranDir();
      this.velocity.y = ranDir();
    }
  }
}

class TrailingParticle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.opacity = 255;

    this.initiateDiffusion();
    this.add();
  }

  initiateDiffusion() {
    setInterval(() => {
      if (this.opacity > 1) {
        this.opacity -= 1;
      } else if (this.opacity === 1) {
        this.opacity -= 1;
        this.remove();
      }
    }, 100);
  }

  add() {
    TrailingParticles.push(this);
  }
  remove() {
    TrailingParticles.shift();
  }
}
const spawnCount = 200;
const size = 2;
const particles = [];
const TrailingParticles = [];

for (let i = 0; i < spawnCount; i++) {
  particles.push(
    new Particle(
      window.innerWidth / 2,
      window.innerHeight / 2,
      size,
      ranColor(),
      {
        x: ranDir(),
        y: ranDir(),
      }
    )
  );
}

function animate() {
  requestAnimationFrame(animate);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
}

function decreaseAlphas() {
  let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 3] = pixels.data[i + 3] - 1; //alpha
  }

  ctx.putImageData(pixels, 0, 0);
  // defuseParticles();
}

// function defuseParticles() {
// let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

// const row = canvas.width;

// const pixelsForDefusion = [];

// for (let i = 0; i < pixels.data.length; i += 4) {
//   let pixel = i - 4;
//   if (pixel < 0) {
//     pixel = 0;
//   }
//   const r = i;
//   const g = i + 1;
//   const b = i + 2;
//   const a = i + 3;

//   if (pixels.data[a] !== 0) {
//     pixelsForDefusion.push(pixel);
// pixels.data[r - pixel] = pixels.data[r];
// pixels.data[g - pixel] = pixels.data[b];
// pixels.data[b - pixel] = pixels.data[g];
// pixels.data[a - pixel] = pixels.data[a] - 5;
// pixels.data[r + pixel] = pixels.data[r];
// pixels.data[g + pixel] = pixels.data[g];
// pixels.data[b + pixel] = pixels.data[b];
// pixels.data[a + pixel] = pixels.data[a] - 5;
//   }
// }

//   ctx.putImageData(pixels, 0, 0);
// console.log(pixelsForDefusion);
// debugger;
// }

setInterval(() => {
  decreaseAlphas();
}, 100);
animate();

setInterval(() => {
  console.log(TrailingParticles);
}, 5000);
