class Game {
  constructor() {
    this.canvas = document.getElementById('asteroids-canvas');
    this.ctx = this.canvas.getContext('2d'); 

    this.shipHit = false;
    this.ship = new Ship();

    this.asteroids = [];
    for(let i = 0; i < 10; i++) {
      this.asteroids.push(new Asteroid())
    }

  }
  play() {
    setInterval(() => {
      if(!this.shipHit) {        
        this.resetCanvas();
        this.setBackground();
        
        this.ship.draw(this.ctx);
        this.asteroids.forEach((asteroid) => {
          asteroid.draw(this.ctx)
        })
        
        // this.ship.bullets.forEach((bullet) => {
        //   bullet.draw(this.ctx)
        // })

      } else {
        this.ctx.font = '48px Arial';
        this.ctx.fillStyle = 'red';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2);
      }
      this.update()
    }, 33)
  }
  resetCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  setBackground() {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  update() {
    this.ship.bullets.forEach((bullet) => {
      const bulletIndex = this.ship.bullets.indexOf(bullet)
      if (bullet.isOutOfBounds()) {
        this.ship.bullets.splice(bulletIndex, 1)
      }
    })
    this.asteroids.forEach((asteroid) => {
      const asteroidIndex = this.asteroids.indexOf(asteroid)
      this.ship.bullets.forEach((bullet) => {
        const bulletIndex = this.ship.bullets.indexOf(bullet)
        if (this.asteroid.isHit(bullet)) {
          this.asteroids.splice(asteroidIndex, 1)
          this.ship.bullets.splice(bulletIndex, 1)
        }
      })
    })

    this.asteroids.forEach((asteroid) => {
      if (this.ship.isHit(asteroid)) {
        this.shipHit = true;
      }
    })
    console.log(this.ship.bullets.length);
  }
}

const game = new Game();
game.play();