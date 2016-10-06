const over = (i, limit) => i + 1 < limit ? i + 1 : 0;

export default frames => {
  let n = -1;

  const r = {
    run: (each, start, end) => {
      if (n === 0) start();
      if (n === frames.length - 1) end();
      each(r.step(), () => {
        r.run(each, start, end);
      });
    },

    step: () =>
      frames[n = over(n, frames.length)],
  };

  return r;
};
