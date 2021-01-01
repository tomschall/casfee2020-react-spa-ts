const messageList = '#message-list';
const channelName = 'general';

module.exports = () => ({
  'Go to channel: select channel, close dropdown, check url': (browser) => {
    browser
      .waitForElementVisible(messageList)
      .click(`a[aria-label="go to channel ${channelName}"]`)
      .pause(3000)
      .url((result) => {
        console.log(result);
      })
      .assert.urlContains(browser.globals.channel)
      .useXpath()
      .click("//div[contains(@aria-label, 'open channel list')]");
  },
});
