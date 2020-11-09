module.exports = {
  'ChickenFest site gets loaded': function (browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body')
      .pause(3000)
      .click('input[name=email]')
      .pause(500)
      .setValue('input[name=email]', 'kimi@gmail.com')
      .pause(500)
      .setValue('input[name=password]', 'admin1234.$')
      .pause(500)
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
          'thomas.schallert 6 days ago\nWelcome to general\nREPLY',
        );
        console.log('element', element.value);
      })
      .end();
  },
};
