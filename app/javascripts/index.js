import parameters from 'queryparams';
import fetch from 'axios';
import { api } from './config';
import Player from './lib/player';

window.parameters = parameters;

const PARAMS = parameters({
  message: ''
});

const DOM = {
  stage: document.getElementById('stage'),
  notifications: document.getElementById('notifications'),
};

export default () => {
  if (!PARAMS.message) {
    DOM.stage.innerHTML = `
      <form>
        <input name='message' autofocus>
      </form>
    `;

    return;
  }

  DOM.stage.innerHTML = 'Rendering';

  fetch
    .get(`${api.base}/${api.endpoint}.json?text=${PARAMS.message}`)
    .then(({ data }) => {

      const player = new Player({
        el: DOM.stage,
        frames: data,
        message: PARAMS.message,
      });

      player.play();

      // DOM.stage.addEventListener('click', e => {
      //   e.preventDefault();
      //   player.toggle();
      // });
    });
};
