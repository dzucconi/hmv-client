import audiate from "audiate";
import fetch from "axios";
import parameters from "queryparams";

import { API } from "./config";
import Player from "./lib/player";

window.parameters = parameters;

const params = parameters({
  text: "",
  shape: "sine",
  scalar: 1.0,
  octave: 3,
  fit: false
  // `pause` is implicit and does not define a default
  // `id` is optional
});

const DOM = {
  root: document.getElementById("root")
};

const render = html =>
  (DOM.root.innerHTML = `<div class="Stage">${html}</div>`);

const init = () => {
  if (!params.text && !params.id) {
    DOM.root.innerHTML = `
      <form>
        <label>begin typing, then &lt;enter&gt;</label>
        <input name='text' autofocus>
      </form>
    `;

    return;
  }

  render("Rendering");

  if (params.id) {
    return fetch
      .get(`${API.base}/${params.id}`)
      .then(({ data: { output, mp3 } }) => {
        DOM.root.innerHTML = "Loading";

        audiate({
          message: "Ready. Click to begin playback.",
          onEnable: () =>
            new Player({
              el: DOM.root,
              render,
              frames: output,
              params: params,
              sound: mp3
            }).play()
        });
      })
      .catch(err => render(err.message));
  }

  fetch
    .get(`${API.base}${API.endpoint}.json?${parameters.encode(params)}`)
    .then(({ data }) => {
      render("Loading");

      audiate({
        message: "Ready. Click to begin playback.",
        onEnable: () =>
          new Player({
            el: DOM.root,
            render,
            frames: data,
            params: params
          }).play()
      });
    })
    .catch(err => render(err.message));
};

document.addEventListener("DOMContentLoaded", init);
