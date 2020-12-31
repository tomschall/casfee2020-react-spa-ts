module.exports = {
  'Polling Dashboard Tests': (browser) => {
    browser
      .url('http://localhost:3000/dashboard/polling')
      .waitForElementVisible('body')
      .pause(3000)
      .end();
  },
};
