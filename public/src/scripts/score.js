class Score{
  constructor(){
    this.score = 0;
    this.name = "Moe Szyslak";
  }

  drawScore(ctx) {
    ctx.font = "small-caps bold 25px Courier New";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score: " + this.score, 480, 20);
  }
}

export default Score;