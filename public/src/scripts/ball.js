import Util from "./util";

class Ball{
  constructor(pos) {
    this.pos = pos;
    this.vel = [-4,0];
    this.radius = 35;
    this.altered = false;
    this.cliff = document.getElementById("cliff-mouth");

  }

  draw(ctx){
    let x = this.pos[0];
    let y = this.pos[1];
    let r = this.radius;

    ctx.drawImage(this.cliff, x - r/2, y - r/2, 2*r, 2*r)

    // ctx.beginPath();
    // ctx.arc(x, y, r, 0, 2 * Math.PI);
    // ctx.fillStyle = "#ffffff";
    // ctx.fill();
  }

  collide(obj){
    const BALLSPEED = Util.norm(this.vel);
    const MAXBOUNCEANGLE = 5*Math.PI/12
    const relativeIntersectY = (obj.pos[1]+(obj.height/2) - this.pos[1]);
    const normalizedRelativeIntersectionY = (relativeIntersectY / (obj.height/2));
    const bounceAngle = normalizedRelativeIntersectionY * MAXBOUNCEANGLE;
    let newVx = Math.max(4,1.05*BALLSPEED * Math.cos(bounceAngle));
    let newVy = Math.max(4,1.05*BALLSPEED * -Math.sin(bounceAngle));

    if (obj.pos[0] === 0) {
      this.vel = [newVx, newVy];
    }else{
      console.log(newVx);
      if (this.altered === false){
        this.vel = [-newVx, -newVy];
      }else{
        this.vel = [-newVx, newVy];
      }
    }
  }

  move(){
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  }
}

export default Ball;