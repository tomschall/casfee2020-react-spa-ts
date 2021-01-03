module.exports = Object.assign(
  {
    before: (browser, done) => {
      done();
    },
    after: (browser, done) => {
      browser.end();
      done();
    },
  },

  describe('Testing chat app', function () {
    test('auth0 login', (browser) => {
      const page = browser.page.chatApp();

      browser
        .url(browser.globals.url)
        .waitForElementVisible('body')
        .pause(3000);

      page.login(browser.globals.user, browser.globals.pw);
    });

    test('send message', (browser) => {
      const message = 'nightwatch sending a message';
      const page = browser.page.chatApp();

      page.sendMessage(message);
    });

    test('delete message', (browser) => {
      const query = 'nightwatch';
      const page = browser.page.chatApp();

      page.deleteMessage(query);
    });

    test('select channel', (browser) => {
      const channel = 'general';
      const page = browser.page.chatApp();

      page.selectChannel(channel).checkRedirect(channel);
    });

    test('channel dropdown', (browser) => {
      const page = browser.page.chatApp();

      page.closeChannelListDropdown().ariaChannelListDropdown();
    });

    test('aria - channellist dropdown', (browser) => {
      const page = browser.page.chatApp();

      page.ariaChannelListDropdown();
    });

    test('add channel (public)', (browser) => {
      const channelName = 'nightwatch';
      const page = browser.page.chatApp();

      browser.pause(3000);

      page.addChannelPublic(channelName);
    });

    test('add channel (private)', (browser) => {
      const channelName = 'nightwatch private';
      const page = browser.page.chatApp();

      browser.pause(3000);

      page.addChannelPrivate(channelName);
    });
  }),

  // Testing HEAD-Tag: seo, font/iconfont includes etc.
  require('./meta')(),
);
