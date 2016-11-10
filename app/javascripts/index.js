import parameters from 'queryparams';
import fetch from 'axios';
import { api } from './config';
import Player from './lib/player';

window.parameters = parameters;

const { message } = parameters({
  message: ''
});

const DOM = {
  stage: document.getElementById('stage'),
  notifications: document.getElementById('notifications'),
};

const init = frames => {
  const player = new Player({
    el: DOM.stage,
    message,
    frames,
  });

  player.play();
};

export default () => {
  if (!message) {
    DOM.stage.innerHTML = `
      <form>
        <input name='message' autofocus>
      </form>
    `;

    return;
  }

  DOM.stage.innerHTML = 'Rendering';

  fetch
    .get(`${api.base}${api.endpoint}.json?text=${message}`)
    .then(({ data }) =>
      init(data));
};
