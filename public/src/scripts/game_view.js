import Game from "./game";
import Sound from "./sound";
import {setUpModals} from "./page";
import Util from "./util";

class GameView{
  constructor(ctx){
    this.ctx = ctx;
    this.game = new Game()
    this.lastTime = 0;
    this.animate = this.animate.bind(this);
    this.start = this.start.bind(this);
    this.started = false;
    this.bgi = new Image();
    this.bgi.src = "../../assets/images/clouds.jpg";
    this.bgiX = 0;
    this.bgiY = 0;

    this.bgm = new Sound("../../assets/sounds/flappypongbgm.mp3");
    this.bgm.sound.volume = .15;
    this.bgm.sound.classList.add("background-music");

    this.gom = new Sound("../../assets/sounds/flappygameover.mp3");
    this.gom.sound.volume = .15;

    this.name = "Big Floppa";
    
    setUpModals();
  }

  animate(currentTime) {
    this.drawBackground(this.ctx);

    const delta = currentTime - this.lastTime;
    if (this.game.inPlay){
      this.bgm.play();
      requestAnimationFrame(this.animate);
      this.game.draw(this.ctx);
      this.handleMovement();
      this.game.moveObjects();
      this.lastTime = currentTime;
    }else{
      const scoreboard = document.getElementsByClassName("scoreboard")[0];
      scoreboard.classList.toggle("hidden");
      const playAgainBtn = document.getElementsByClassName("play-again-btn")[0];
      playAgainBtn.classList.toggle("hidden");
      playAgainBtn.onclick = () => {
        this.restart();
        playAgainBtn.classList.toggle("hidden");
        scoreboard.classList.toggle("hidden");
      }
      this.bgm.stop();
      this.gom.sound.currentTime=0;
      this.gom.play();
      let scoresArray = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : [];
      let newScoreObj;
      newScoreObj = [this.name, this.game.score.score];
      scoresArray.push(newScoreObj);
      const topTen = scoresArray.sort((a, b) => b[1] - a[1]).slice(0, 10);
      this.drawGameOver(topTen);
      localStorage.setItem('scores', JSON.stringify(topTen));

    }

  }

  drawGameBegin(){
    this.ctx.drawImage(this.bgi, 0, 0);
    this.ctx.drawImage(this.bgi, this.x, this.y - this.canvasHeight);

    this.ctx.font = "small-caps bold 100px Courier New";
    this.ctx.fillStyle = "darkgray";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Click screen to play", 480, 300);
    const cvs = document.getElementById("mycanvas");

    const name = document.getElementsByClassName("name-input")[0];
    const nameForm = document.getElementsByClassName("name-form")[0];

    name.classList.toggle("hidden");
    name.addEventListener('change', (e) => {
      e.preventDefault();
      name.value = e.target.value;
    })
    nameForm.addEventListener("submit", e => {
      e.preventDefault();
      name.classList.toggle("hidden")
    })
    cvs.onclick = () => {
      if (!this.started){
        if (!name.classList.contains("hidden")){
          name.classList.toggle("hidden");
        }
        this.name = name.value || this.name;
        this.start();
      }
    }
  }

  drawGameOver(){
    ctx.font = "small-caps bold 80px Courier New";
    ctx.fillStyle = "darkgray";
    ctx.textAlign = "center";

    ctx.fillText("Final Score: " + this.game.score.score, 480, 100);

    Util.addScore({ user: this.name, score: this.game.score.score }).then((res) => {
      setUpModals();
    })
  }

  drawBackground() {
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, 960, 640);

    this.ctx.drawImage(this.bgi, this.bgiX, this.bgiY);
  }

  start() {
    this.started = true;
    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      this.key = e.keyCode
    })
    window.addEventListener('keyup', (e) => {
      e.preventDefault();
      this.key = null;
    })
    window.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.game.player.flap();
    })
    requestAnimationFrame(this.animate);
  }

  restart(){
    this.game = new Game();
    this.gom.stop();
    requestAnimationFrame(this.animate);
  }

  handleMovement(){
    if (this.key === 32) {this.game.player.flap()}
  }
}

export default GameView;