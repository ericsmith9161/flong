// Return a randomly oriented vector with the given length.
import axios from 'axios';

const Util = {

  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  dist(v1, v2){
    return Math.sqrt(((v1[0] - v2[0]) ** 2)+ ((v1[1] - v2[1]) ** 2))
  },

  norm(vec){
    return Util.dist([0,0], vec)
  },

  isCollided(ball, obj){
    if (obj.pos[0] === 0){
      if ((ball.pos[0] > 0) && ball.pos[0] <= obj.width) {
        const objTop = obj.pos[1] - obj.height / 2;
        const objBtm = obj.pos[1] + obj.height / 2
        if (ball.pos[1] > objTop && ball.pos[1] < objBtm) {
          return true
        }
      }
    }else{
      if (ball.pos[0] > 940){
        return true;
      }
    }



    return false;
  },

  getScores(){
    return axios.get(`/api/scores/scores`).then(response => {
      return response.data;
    });
  },

  addScore(data){
    return axios.post(`/api/scores/`, data);
  }

};

export default Util;