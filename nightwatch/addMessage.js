const message = 'nightwatch sending a message';
const messageList = '#message-list';

module.exports = () => ({
  'Add message channel general': (browser) => {
    browser
      .useCss()
      .waitForElementVisible(messageList)
      .pause(1000)
      .setValue('textarea#chat-message-input', message)
      .pause(1000)
      .click('button#message_submit')
      .pause(3000)
      .assert.containsText(messageList, message);
  },
});
