const over = (i, limit) => i + 1 < limit ? i + 1 : 0;

export default frames => {
  let n = -1;

  const r = {
    run: ({ step, cycle }) => {
      if (n === -1 || n === frames.length - 1) cycle();

      step(r.step(), () => {
        r.run({ step, cycle });
      });
    },

    step: () =>
      frames[n = over(n, frames.length)],
  };

  return r;
};
