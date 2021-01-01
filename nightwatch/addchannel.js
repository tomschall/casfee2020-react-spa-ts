const openAddChannelDropdown =
  'span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock';

module.exports = () => ({
  'Add channel - public': (browser) => {
    browser
      .waitForElementVisible('body')
      .click(openAddChannelDropdown)
      .pause(1000)
      .setValue('input[id="add-channel-input"]', 'nightwatch')
      .pause(1000)
      .click('button[type="submit"]')
      .pause(5000);
  },
  'Add channel - private': (browser) => {
    browser
      .url(browser.globals.url)
      .waitForElementVisible('body')
      .click(openAddChannelDropdown)
      .pause(1000)
      .setValue('input[id="add-channel-input"]', 'private nightwatch')
      .click('input[name="private"]')
      .pause(1000)
      .click('button[type="submit"]')
      .pause(5000);
  },
});
