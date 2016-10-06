import fetch from 'axios';
import { Howl } from 'howler';
import params from './lib/params';
import animate from './lib/animate';

const CONFIG = {
  api: {
    base: 'http://hmv.work.damonzucconi.com'
  },
  message: null,
  speed: 1000,
};

const PARAMS = params(CONFIG);

const DOM = {
  stage: document.getElementById('stage'),
};

export default () => {
  if (!PARAMS.message) return;

  DOM.stage.innerHTML = 'Rendering'

  fetch
    .get(`${CONFIG.api.base}/render.json?text=${PARAMS.message}`)
    .then(({ data }) => {
      const play = sound =>
        animate(data)
          .run({
            step: (frame, next) => {
              DOM.stage.innerHTML = frame.word;
              setTimeout(next, frame.duration * 1000);
            },
            cycle: () => {
              sound.play();
            }
          });

      const sound = new Howl({
        src: [`${CONFIG.api.base}/render.wav?text=${PARAMS.message}`],
        format: ['wav'],
        onload: () => play(sound),
      });
    });
};
