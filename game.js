class Game {
  constructor() {
    this.canvas = document.getElementById('asteroids-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.ship = new Ship();
  }
  play() {
    setInterval(() => {
      this.resetCanvas();
      this.setBackground();
      this.ship.draw(this.ctx);
    }, 33)
  }
  resetCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  setBackground() {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

class Ship {
  constructor() {
    this.x = 250
    this.y = 250
    this.shape = [[0, -10], [-4, 3], [4, 3]];
    this.angularVelocity = 0
    this.angle = 0
    this.power = 0
    this.velocity = {x: 0, y: 0}
    this.bullets = [];

    document.addEventListener('keydown', (event) => {
      console.log(event.keyCode)
      if(event.keyCode === 37) {
        this.angularVelocity = -Math.PI / 30
      }
      if(event.keyCode === 39) {
        this.angularVelocity = Math.PI / 30
      }
      if(event.keyCode === 38) {
        this.power = true
      }
      if(event.keyCode === 40) {
        this.velocity.x *= .9
        this.velocity.y *= .9
      }
      if(event.keyCode === 32) {
        this.shoot();
      }
    })
    
    document.addEventListener('keyup', (event) => {
      console.log(event.keyCode)
      if(event.keyCode === 37 || event.keyCode === 39) {
        this.angularVelocity = 0
      }
      if(event.keyCode === 38) {
        this.power = false;
      }
    })

  }

  draw(ctx) {
    this.drawBullets(ctx)
    this.update()
    console.log("drawing")
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1.25;

    ctx.restore();
    ctx.save();
    ctx.beginPath();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle)
    ctx.moveTo(this.shape[0][0], this.shape[0][1]);
    ctx.lineTo(this.shape[1][0], this.shape[1][1]);
    ctx.lineTo(this.shape[2][0], this.shape[2][1]);
    ctx.lineTo(this.shape[0][0], this.shape[0][1]);
    ctx.closePath()
    console.log(this.x)
    console.log(this.y)
    console.log(this.angle)
    console.log(this.shape)

    ctx.stroke()
    ctx.restore()
  }

  shoot() {
    const bulletSpeed = 5; // Adjust bullet speed as needed
    const bullet = {
      x: this.x,
      y: this.y,
      velocityX: bulletSpeed * Math.sin(this.angle),
      velocityY: -bulletSpeed * Math.cos(this.angle)
    };
    this.bullets.push(bullet);
  }
  updateBullets() {
    this.bullets.forEach((bullet, index) => {
      bullet.x += bullet.velocityX;
      bullet.y += bullet.velocityY;
      // Remove bullets that are out of bounds
      if (bullet.x < 0 || bullet.x > 500 || bullet.y < 0 || bullet.y > 500) {
        this.bullets.splice(index, 1);
      }
    });
  }

  drawBullets(ctx) {
    ctx.fillStyle = 'red'; // Set bullet color
    this.bullets.forEach((bullet) => {
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, 2, 0, Math.PI * 2); // Draw bullet as a small circle
      ctx.fill();
    });
  }

  update() {
    this.angle += this.angularVelocity

    this.velocity.x *= .985
    this.velocity.y *= .985

    if(this.power) {
      this.velocity.x += Math.sin(this.angle) / 5
      this.velocity.y += -Math.cos(this.angle) / 5
    }
    this.y += this.velocity.y
    this.x += this.velocity.x

    if(this.x > 500) {
      this.x = 0
    }
    if(this.x < 0) {
      this.x = 500
    }
    if(this.y > 500) {
      this.y = 0
    }
    if(this.y < 0) {
      this.y = 500
    }
  }
}
const game = new Game();
game.play();