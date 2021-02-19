const fakeDelay = (fn) => setTimeout(fn, 500);

module.exports = (req, res, next) => {
  fakeDelay(next);
};
