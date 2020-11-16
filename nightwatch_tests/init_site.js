module.exports = {
  'ChickenFest site gets loaded': function (browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body')
      .pause(3000)
      .click('input[name=email]')
      .pause(500)
      .setValue('input[name=email]', 'tweets@webrooster.ch')
      .pause(500)
      .setValue('input[name=password]', '_Tweets_3ster');
  },

  'Insert message into channel': (browser) => {
    browser
      .click('button[type=submit]')
      .waitForElementVisible('body')
      .assert.titleContains('Chicken Chat - CasFee 2020')
      .setValue('input[id=chat-message-input]', 'nightwatch')
      .pause(500)
      .setValue('input[id=chat-message-input]', browser.Keys.ENTER)
      .pause(500)
      .getText('css selector', 'ul#message-list li', function (element) {
        this.assert.equal(typeof element, 'object');
        this.assert.equal(
          element.value,
          'webrooster 16 days ago\nGoile, wah?\nREPLY',
        );
        console.log('element', element.value);
      });
  },

  'Select channel "testing"': (browser) => {
    browser
      .url('http://localhost:3000/channel/testing')
      .waitForElementVisible('body')
      .pause(3000)
      .click('a[data-channel-name="testing"]')
      .pause(3000)
      .end();
  },
};
