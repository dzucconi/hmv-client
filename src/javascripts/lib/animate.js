import step from "./step";

export default frames => {
  const r = {
    frame: -1,

    run: ({ step, cycle }) => {
      if (r.frame === -1 || r.frame === frames.length - 1) cycle();

      step(r.step(), () => {
        r.run({ step, cycle });
      });
    },

    step: () => frames[(r.frame = step(r.frame, frames.length))],

    reset: () => (r.frame = -1)
  };

  return r;
};
