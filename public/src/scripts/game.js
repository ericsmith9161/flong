import Ball from "./ball";
import Util from "./util";
import Score from "./score";
import Sound from "./sound";
import Player from "./player";


class Game {
  constructor(){
    this.player = new Player();
    this.ball = new Ball([480,320])
    this.wall = {
      pos: [940, 320],
      width: 20,
      height: 640,
    };

    this.frameNum = 1;
    this.inPlay = true;

    this.score = new Score();

    this.pong = new Sound("../../assets/sounds/ballbounce.mp3");
    this.pong.sound.volume = .3;
  }

  checkBounds(pos){
    if (pos[1] < -50 || pos[1] > 690){
      this.inPlay = false;
    }
  }

  isOutOfBounds(pos){
    if(pos[1] < 0){
      return "top";
    }else if(pos[1] > 640){
      return "bottom";
    }else{
      return null;
    }
  }

  moveObjects(){
    this.player.move()
    this.ball.move();
    if (this.ball.pos[1] >= 640 || this.ball.pos[1] <= 0) {
      this.ball.vel = [this.ball.vel[0], -this.ball.vel[1]];
      this.pong.sound.currentTime = 0;
      this.pong.play();
      // this.ball.altered = true;
    }
    if (this.ball.pos[0] < 0){
      this.inPlay = false;
    }
    this.checkBounds(this.player.pos);
    if (this.ball.vel[0] < 0){
      const playerBallCollide = Util.isCollided(this.ball, this.player);
      if (playerBallCollide) {
        this.pong.sound.currentTime = 0;
        this.pong.play();
        this.score.score += 1;
        this.ball.collide(this.player);
        if (this.player.height > 30) {
          this.player.height -= 2;
          this.player.width -= 2;
        }
        this.ball.altered = false;
      }
    }
    else{
      if (Util.isCollided(this.ball, this.wall)) {
        this.pong.sound.currentTime = 0;
        this.pong.play();
        this.ball.collide(this.wall);
        this.ball.altered = false;
      }
    }

    this.frameNum++;
  }

  draw(ctx){
    this.player.draw(ctx);
    this.ball.draw(ctx);

    this.score.drawScore(ctx);
  }
}

export default Game;