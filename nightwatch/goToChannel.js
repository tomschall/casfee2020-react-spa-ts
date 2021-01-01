const messageList = '#message-list';
const channelName = 'nightwatch';

module.exports = () => ({
  'Go to channel nightwatch': (browser) => {
    browser
      .waitForElementVisible(messageList)
      .pause(3000)
      .click(`a[aria-label="go to channel ${channelName}"]`)
      .pause(3000);
  },
});
