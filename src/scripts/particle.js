import canvas from './canvas';
import ranColor from './ranColor';
import navigate from './navigate';
import navMouse from './navMouse';

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
    // new TrailingParticle(this.x, this.y, this.radius + 5);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (mouseover === false) {
      if (
        this.x > canvas.width ||
        this.x < 0 ||
        this.y > canvas.height ||
        this.y < 0
      ) {
        this.velocity.x = navigate().x;
        this.velocity.y = navigate().y;
      }
    } else {
      const navigateTo = navMouse(mouseCoords, { x: this.x, y: this.y });
      this.velocity.x = navigateTo.x;
      this.velocity.y = navigateTo.y;
    }
  }

  reset() {
    this.velocity.x = navigate().x;
    this.velocity.y = navigate().y;
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
const spawnCount = 5000;
const size = 1;
const particles = [];
const TrailingParticles = [];

let mouseover = false;
const mouseCoords = {
  x: undefined,
  y: undefined,
};

window.addEventListener('mousemove', (e) => {
  mouseover = true;
  mouseCoords.x = e.clientX;
  mouseCoords.y = e.clientY;
});
window.addEventListener('mouseout', () => {
  mouseover = false;
  particles.forEach((particle) => {
    particle.reset();
  });
});

for (let i = 0; i < spawnCount; i++) {
  particles.push(
    new Particle(
      window.innerWidth / 2,
      window.innerHeight / 2,
      size,
      ranColor(),
      {
        x: navigate().x,
        y: navigate().y,
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
animate();
