import audiate from 'audiate';
import fetch from 'axios';
import parameters from 'queryparams';
import { api } from './config';
import Player from './lib/player';

window.parameters = parameters;

const params = parameters({
  text: '',
  shape: 'sine',
  scalar: 1.0,
  octave: 3,
  fit: false,
  // `pause` is implicit and does not define a default
  // `id` is optional
});

const DOM = {
  stage: document.getElementById('Stage'),
};

const render = x =>
  DOM.stage.innerHTML = x;

export default () => {
  if (!params.text && !params.id) {
    DOM.stage.innerHTML = `
      <form>
        <input name='text' autofocus>
      </form>
    `;

    return;
  }

  render('Rendering');

  if (params.id) {
    return fetch
      .get(`${api.base}/${params.id}`)
      .then(({ data: { output, mp3 } }) => {
        render('Loading');

        audiate(() =>
          new Player({
            el: DOM.stage,
            frames: output,
            params: params,
            sound: mp3,
          }).play()
        );
      })
      .catch(render);
  }

  fetch
    .get(`${api.base}${api.endpoint}.json?${parameters.encode(params)}`)
    .then(({ data }) => {
      render('Loading');

      audiate(() =>
        new Player({
          el: DOM.stage,
          frames: data,
          params: params,
        }).play()
      );
    })
    .catch(render);
};
