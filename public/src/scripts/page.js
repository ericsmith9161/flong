import axios from 'axios';

export const setUpModals = () => {
  window.axios = axios;
  const scoreContent = document.getElementsByClassName("score-content")[0];
  const sCFK = scoreContent.firstElementChild;
  scoreContent.innerHTML = sCFK.outerHTML;

  const getScores = () => {
    return axios.get(`/api/scores/scores`)
  }

  getScores().then((data) => {
    let hiScore;
    let hiScores = data.data;
    hiScores = hiScores.slice(0,25);

    for (let i = 0; i < hiScores.length; i++) {
      hiScore = document.createElement('p')
      hiScore.textContent = `${i+1}. ${hiScores[i].user}  ${hiScores[i].score}`;
      scoreContent.appendChild(hiScore);
    }
  });
}
