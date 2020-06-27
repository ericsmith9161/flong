class Player{
  constructor(){
    this.pos = [0,320];
    this.speed = 0;
    this.draw = this.draw.bind(this);
    this.height = 100;
    this.width = 100;
    this.bird = document.getElementById("flappy-bird");
  }

  draw(ctx){
    let x = this.pos[0];
    let y = this.pos[1];
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.drawImage(this.bird, x-this.width/2,y-this.height/2, this.width, this.width)
  }

  move(){
    this.pos = [
      this.pos[0], this.pos[1] + this.speed 
    ]
    this.collisionPos = {
      top: this.pos[1] - this.height/2,
      bottom: this.pos[0] + this.height/2
    }
    if (this.speed <= 8){
      this.speed += 0.5;
    }
  }

  flap(){
    if (this.speed > 8){
      this.speed -= 24;
    }
  }

}

export default Player;