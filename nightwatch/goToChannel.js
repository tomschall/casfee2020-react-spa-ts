module.exports = () => ({
  'Testing chat app': (browser) => {
    const channel = 'general';
    const page = browser.page.chatApp();

    page
      .selectChannel(channel)
      .urlContains(channel)
      .checkChannelListDropdown()
      .ariaChannelListDropdown();
  },
});
