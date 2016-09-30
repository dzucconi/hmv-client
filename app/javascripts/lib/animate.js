const over = (i, limit) => i + 1 < limit ? i + 1 : 0;

export default frames => {
  let n = -1;

  const r = {
    run: fn =>
      fn(r.step(), () => r.run(fn)),

    step: () =>
      frames[n = over(n, frames.length)],
  };

  return r;
};
