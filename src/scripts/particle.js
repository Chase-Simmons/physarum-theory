import canvas from './canvas';
import ranColor from './ranColor';
import ranDir from './ranDirection';

const ctx = canvas.getContext('2d');
// ctx.filter = 'blur(1px';

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = '#ffffff';
    this.velocity = velocity;
    this.trail = [];
  }

  draw() {
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

  manageTrail() {
    //   this.trail.push(
    //     new Particle(this.x, this.y, this.radius, this.color, {
    //       x: this.velocity.x,
    //       y: this.velocity.y,
    //     })
    //   );
    //   if (this.trail.length >= 89) {
    //     this.trail.shift();
    //     // console.log(this.trail);
    //     // debugger;
    //   }
    //   for (let i = 0; i < this.trail.length; i++) {
    //     this.trail[i].color = this.color + String(i + 10);
    //   }
  }
}

const spawnCount = 200;
const size = 2;
const particles = [];

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
}

setInterval(() => {
  decreaseAlphas();
}, 100);
// console.log(particles);
animate();
