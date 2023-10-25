const qs = document.querySelector.bind(document);

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 8 + 5;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill()
  }
}

const dotSize = 10
let particleArray = [];
let hue = 180;
const displayParticlesTrail = true
const nbParticles = 10
const mouse = { x: undefined, y: undefined }

const canvas = qs('#canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

// Desktop event listener
canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < nbParticles; i++) {
    particleArray.push(new Particle());
  }
})

// Mobile event listener
canvas.addEventListener('touchmove', (e) => {
  [...e.changedTouches].forEach(touch => {
    mouse.x = touch.pageX;
    mouse.y = touch.pageY;
    for (let i = 0; i < nbParticles; i++) {
      particleArray.push(new Particle());
    }
  })
})

function animate() {

  if (displayParticlesTrail) {
    // Add a semi-transparent black rectangle at each frame
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    // Reset the background with an opaque black rectangle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  handleParticles()

  hue += 0.5

  requestAnimationFrame(animate);
}
animate();

function handleParticles() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    particleArray = particleArray.filter(particle => particle.size > 0.3)
  }
}
