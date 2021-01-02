const messageList = '#message-list';
const channelName = 'general';

module.exports = () => ({
  'Go to channel: select channel, close dropdown, check url': (browser) => {
    browser
      .useCss()
      .click(`a[aria-label="go to channel ${channelName}"]`)
      .pause(3000)
      .url((result) => {
        console.log(result);
      })
      .assert.urlContains(channelName)
      .useXpath()
      .click("//div[contains(@aria-label, 'open channel list')]");
  },
});
