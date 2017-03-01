import parameters from 'queryparams';
import fetch from 'axios';
import { api } from './config';
import Player from './lib/player';

window.parameters = parameters;

const params = parameters({
  text: '',
  shape: 'sine',
  scalar: 1.0,
  octave: 3,
  fit: false,
  // pause is implicit and does not define a default
});

const DOM = {
  stage: document.getElementById('stage'),
  notifications: document.getElementById('notifications'),
};

const init = frames => {
  new Player(DOM.stage, frames, params)
    .play();
};

export default () => {
  if (!params.text) {
    DOM.stage.innerHTML = `
      <form>
        <input name='text' autofocus>
      </form>
    `;

    return;
  }

  DOM.stage.innerHTML = 'Rendering';

  fetch
    .get(`${api.base}${api.endpoint}.json?${parameters.encode(params)}`)
    .then(({ data }) => {
      DOM.stage.innerHTML = 'Loading';
      init(data);
    })
    .catch(e => {
      DOM.stage.innerHTML = e;
    });
};
