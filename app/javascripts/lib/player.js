import { api } from '../config';
import { Howl } from 'howler';
import animate from './animate';
import timeout from './timeout';

export default class Player {
  constructor({ el, frames, message }) {
    this.el = el;
    this.frames = frames;
    this.message = message;
    this.playing = false;
    this.animation = animate(frames);

    this.timeline = [];
    frames.reduce((memo, frame, i) => {
      frame.start = memo += (frames[i - 1] || {}).duration || 0;
      this.timeline.push(frame);
      return memo;
    }, 0);

    this.sound = new Howl({
      preload: false,
      loop: false,
      format: ['wav'],
      src: [`${api.base}/${api.endpoint}.wav?text=${message}`],
    });
  }

  load() {
    return this.__loaded__ = this.__loaded__ || new Promise(resolve => {
      this.sound.once('load', resolve);
      this.sound.load();
    });
  }

  play() {
    return this
      .load()
      .then(() => {
        this.sound.play();

        this.timeline.map((frame, i) => {

          timeout(() => {
            this.el.innerHTML = frame.word;

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
