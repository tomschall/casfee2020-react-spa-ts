module.exports = {
  'ChickenFest site gets loaded': function (browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body')
      .pause(3000)
      .click('input[name=email]')
      .pause(300)
      .setValue('input[name=email]', browser.globals.user)
      .pause(300)
      .setValue('input[name=password]', browser.globals.pw);
  },

  'Insert message into channel': (browser) => {
    browser
      .click('button[type=submit]')
      .waitForElementVisible('body')
      .assert.titleContains('Chicken Chat - CasFee 2020')
      .setValue('input[id=chat-message-input]', 'nightwatch')
      .pause(300)
      .setValue('input[id=chat-message-input]', browser.Keys.ENTER)
      .pause(300)
      .getText('css selector', '#message-list', function (element) {
        this.assert.equal(typeof element, 'object');
        this.assert.equal(element.value, '"AD"');
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
