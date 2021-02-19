const fakeDelay = (fn) => setTimeout(fn, 1500);

module.exports = (req, res, next) => {
  fakeDelay(next);
};
