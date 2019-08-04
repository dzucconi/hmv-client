import { API } from "../config";
import { Howl } from "howler";
import textFit from "textfit";
import animate from "./animate";
import timeout from "./timeout";

export default class Player {
  constructor({ el, render, frames, params, sound = null }) {
    this.el = el;
    this.render = render;
    this.frames = frames;
    this.playing = false;
    this.animation = animate(frames);
    this.fit = params.fit;

    this.timeline = [];
    frames.reduce((memo, frame, i) => {
      frame.start = memo += (frames[i - 1] || {}).duration || 0;
      this.timeline.push(frame);
      return memo;
    }, 0);

    if (sound) {
      this.sound = new Howl({
        preload: false,
        loop: false,
        format: [sound.split(".").pop()],
        src: [sound]
      });
    } else {
      this.sound = new Howl({
        preload: false,
        loop: false,
        format: ["wav"],
        src: [
          `${API.base}/${API.endpoint}.wav?${window.parameters.encode(params)}`
        ]
      });
    }
  }

  load() {
    return (this.__loaded__ =
      this.__loaded__ ||
      new Promise(resolve => {
        this.sound.once("load", resolve);
        this.sound.load();
      }));
  }

  play() {
    return this.load().then(() => {
      this.sound.play();

      this.timeline.map((frame, i) => {
        timeout(() => {
          this.render(frame.word);

          if (this.fit) textFit(this.el, { maxFontSize: 500 });

          if (this.timeline.length - 1 === i) {
            timeout(() => {
              this.play();
            }, frame.duration * 1000);
          }
        }, frame.start * 1000);
      });
    });
  }
}
