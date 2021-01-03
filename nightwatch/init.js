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
  require('./testChatApp')(),
  require('./meta')(),
);
