import canvas from './canvas';
import ranColor from './ranColor';
import ranDir from './ranDirection';

const ctx = canvas.getContext('2d');

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;

    this.radius = radius;
    this.color = color;

    this.velocity = velocity;
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
  }
}

const spawnCount = 10;

const particles = [];

for (let i = 0; i < spawnCount; i++) {
  particles.push(
    new Particle(100, 100, 5, ranColor(), { x: ranDir(), y: ranDir() })
  );
}

function animate() {
  requestAnimationFrame(animate);

  particles.forEach((particle) => {
    particle.velocity.x = ranDir();
    particle.velocity.y = ranDir();
    particle.update();
    particle.draw();
  });
}
console.log(particles);
animate();
