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
  // id is optional
});

const DOM = {
  stage: document.getElementById('stage'),
  notifications: document.getElementById('notifications'),
};

export default () => {
  if (!params.text && !params.id) {
    DOM.stage.innerHTML = `
      <form>
        <input name='text' autofocus>
      </form>
    `;

    return;
  }

  DOM.stage.innerHTML = 'Rendering';

  if (params.id) {
    fetch.get(`${api.base}/${params.id}`)
      .then(({ data }) => {
        DOM.stage.innerHTML = 'Loading';
        new Player(DOM.stage, data.output, params, data.mp3).play();
      })
      .catch(e => {
        DOM.stage.innerHTML = e;
      });

  } else {
    fetch.get(`${api.base}${api.endpoint}.json?${parameters.encode(params)}`)
      .then(({ data }) => {
        DOM.stage.innerHTML = 'Loading';
        new Player(DOM.stage, data, params).play();
      })
      .catch(e => {
        DOM.stage.innerHTML = e;
      });
  }
};
