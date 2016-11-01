import { api } from '../config';
import { Howl } from 'howler';
import animate from './animate';

export default class Player {
  constructor({ el, frames, message }) {
    this.el = el;
    this.frames = frames;
    this.message = message;
    this.playing = false;
    this.animation = animate(frames);
  }

  sound() {
    return this.__sound__ = this.__sound__ || new Howl({
      preload: false,
      loop: false,
      src: [`${api.base}/${api.endpoint}.wav?text=${this.message}`],
      format: ['wav']
    });
  }

  load() {
    return this.__loaded__ = this.__loaded__ || new Promise(resolve => {
      this.sound().once('load', resolve);
      this.sound().load();
    });
  }

  play() {
    if (this.playing) return;

    return this.load()
      .then(() => {
        this.playing = true;

        this.animation
          .run({
            step: (frame, next) => {
              if (!this.playing) return;

              this.el.innerHTML = frame.word;
              setTimeout(next, frame.duration * 1000);
            },
            cycle: () => {
              this.sound().play();
            }
          });

        return this;
      });
  }

  stop() {
    this.playing = false;
    this.sound().stop();
    this.animation.reset();
    this.el.innerHTML = '';
    return this;
  }

  toggle() {
    if (this.playing) {
      this.stop();
      return this;
    }

    this.play();
    return this;
  }
}
