const message = 'nightwatch is sending a message';

module.exports = () => ({
  'Add 2 messages in nightwatch (public)': (browser) => {
    browser
      .waitForElementVisible('body')
      .pause(3000)
      .setValue('textarea#chat-message-input', message)
      .pause(1000)
      .click('button#message_submit')
      .pause(1000)
      .setValue('textarea#chat-message-input', message)
      .pause(1000)
      .click('button#message_submit')
      .pause(3000)
      .waitForElementVisible('#message-list');
    // .elements('css selector', '#message-list', (element) => {
    //   browser.getText(
    //     'css selector',
    //     'p.MuiTypography-root:nth-child(even)',
    //     function (element) {
    //       // this.assert.equal(typeof element, 'object');
    //       this.assert.equal(element.value, message);
    //       console.log('message', element.value);
    //     },
    //   );
    // });
  },
});
