const toggleAddChannel = '#collapse_add_channel';
const messageList = '#message-list';

module.exports = () => ({
  'Add channel - public': (browser) => {
    browser
      .waitForElementVisible('body')
      .pause(3000)
      .click(toggleAddChannel)
      .pause(1000)
      .setValue('input[id="add-channel-input"]', 'nightwatch')
      .pause(1000)
      .click('button[type="submit"]')
      .pause(3000)
      .waitForElementVisible(messageList);
  },
  'Add channel - private': (browser) => {
    browser
      .click(toggleAddChannel)
      .pause(1000)
      .setValue('input[id="add-channel-input"]', 'private nightwatch')
      .click('input[name="private"]')
      .pause(1000)
      .click('button[type="submit"]')
      .pause(3000)
      .waitForElementVisible(messageList);
  },
  // 'Go to channel nightwatch': (browser) => {
  //   browser
  //     .click('a[aria-label="go to channel nightwatch"]')
  //     .waitForElementVisible(messageList)
  //     .pause(5000);
  // },
});
