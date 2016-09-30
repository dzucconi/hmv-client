import axios from 'axios';
import params from './lib/params';
import animate from './lib/animate';

const CONFIG = {
  api: {
    base: 'http://hmv.work.damonzucconi.com'
  },
  message: 'Hello world',
  speed: 1000,
};

const PARAMS = params(CONFIG);

const DOM = {
  stage: document.getElementById('stage'),
};

export default () => {
  axios
    .get(`${CONFIG.api.base}/render.json?text=${PARAMS.message}`)
    .then(({ data }) => {

      animate(data)
        .run((frame, next) => {
          DOM.stage.innerHTML = frame.word;
          setTimeout(next, frame.duration * 1000);
        });

    });
};
