const openAddChannelDropdown = '#collapse_add_channel';
const messageList = '#message-list';

module.exports = () => ({
  'Add channel - public': (browser) => {
    browser
      .click(openAddChannelDropdown)
      .pause(1000)
      .setValue('input[id="add-channel-input"]', 'nightwatch')
      .pause(1000)
      .click('button[type="submit"]')
      .pause(3000)
      .waitForElementVisible(messageList);
  },
  'Add channel - private': (browser) => {
    browser
      .click(openAddChannelDropdown)
      .pause(1000)
      .setValue('input[id="add-channel-input"]', 'private nightwatch')
      .click('input[name="private"]')
      .pause(1000)
      .click('button[type="submit"]')
      .pause(3000)
      .waitForElementVisible(messageList);
  },
});
