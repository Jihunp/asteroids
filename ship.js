class Ship {
  constructor() {
    this.x = 250
    this.y = 250
    this.shape = [[0, -10], [-4, 3], [4, 3]];
    this.angularVelocity = 0
    this.angle = 0
    this.power = 0
    this.velocity = {x: 0, y: 0}
    this.isFiring = false;

    this.hit = false;
    this.radius = 4

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
      if(event.keyCode === 32) {
        let bullet = new Bullet(this.x, this.y, this.angle)
        this.isFiring = true;
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

  isHit(asteroid) {
    return Math.sqrt((this.x - asteroid.x) ** 2 + (this.y - asteroid.y) ** 2) < this.radius + asteroid.radius
  }
}