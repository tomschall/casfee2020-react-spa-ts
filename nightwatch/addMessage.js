const message = 'nightwatch testing send message';

module.exports = () => ({
  'Add message - channel general': (browser) => {
    browser
      .waitForElementVisible('body')
      .pause(3000)
      .setValue('textarea#chat-message-input', message)
      .pause(1000)
      .click('button#message_submit')
      .pause(3000)
      .waitForElementVisible('#message-list')
      .getText(
        'css selector',
        'p.MuiTypography-root:last-child',
        function (element) {
          this.assert.equal(typeof element, 'object');
          this.assert.equal(element.value, message);
          console.log('message', element.value);
        },
      );
  },
});
