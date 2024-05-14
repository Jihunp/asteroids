class Asteroid {
  constructor() {
    // hw can be how to fix for edge case
    // we don't want circle to populate in the circle

    this.x = Math.floor(Math.random() * 501)
    this.y = Math.floor(Math.random() * 501)
    this.radius = (Math.floor(Math.random() * 3) + 2) * 12
    this.velocity = { x: Math.random() * 4 - 2, y: Math.random() * 4 - 2 }
  }

  draw(ctx) {
    this.update()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1.25
    ctx.save()
    ctx.beginPath()

    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.closePath()

    ctx.stroke()
    ctx.restore()
  }
  update() {
    this.x += this.velocity.x
    this.y += this.velocity.y

    if(this.x > 500 + this.radius) {
      this.x = 0 - this.radius
    }
    if(this.x < 0 - this.radius) {
      this.x = 500 + this.radius
    }
    if(this.y > 500 + this.radius) {
      this.y = 0 - this.radius
    }
    if(this.y < 0 - this.radius) {
      this.y = 500 + this.radius
    }
  }

  isHit(bullet) {
    return Math.sqrt((this.x - bullet.x) ** 2 + (this.y - bullet.y) ** 2) < this.radius + bullet.radius
  }
}