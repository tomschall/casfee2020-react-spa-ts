module.exports = Object.assign(
  {
    before: (browser, done) => {
      done();
    },
    after: (browser, done) => {
      browser.end();
      done();
    },
  },
  require('./login')(),
  require('./addChannel')(),
  require('./goToChannel')(),
  require('./addMessage')(),
  require('./deleteMessage')(),
  require('./meta')(),
);
