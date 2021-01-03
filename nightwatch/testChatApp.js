module.exports = () => ({
  'Testing chat app': (browser) => {
    const channel = 'general';
    const message = 'nightwatch says hello';
    const page = browser.page.chatApp();

    browser.url(browser.globals.url).waitForElementVisible('body').pause(3000);

    page
      .login(browser.globals.user, browser.globals.pw)
      .sendMessage(message)
      .pause(3000)
      .selectChannel(channel)
      .urlContains(channel)
      .closeChannelListDropdown()
      .pause(1000)
      .ariaChannelListDropdown();
  },
});
