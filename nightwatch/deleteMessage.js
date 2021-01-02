const message = 'nightwatch sending a message';
const messageList = '#message-list';
const lastDeleteButton =
  '//*[@id="message-list"]/div[last()]/div[2]/div[1]/div[2]/div/span/button';

module.exports = () => ({
  'Delete last message and check precence after': (browser) => {
    browser
      .waitForElementVisible('#message-list')
      .pause(3000)
      .useXpath()
      .click(lastDeleteButton)
      .useCss()
      .assert.not.containsText(messageList, message)
      .pause(3000);
  },
});
