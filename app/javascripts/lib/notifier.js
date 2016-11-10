export default el => ({
  notify: message => {
    el.innerHTML = message;
  },
});
