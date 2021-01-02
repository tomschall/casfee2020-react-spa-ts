module.exports = {
  url: 'http://localhost:3000/channel/general',
  elements: {
    messageListContainer: '#message-list',
    channelListDropdown: {
      selector: '//div[contains(@aria-label, "open channel")]',
      locateStrategy: 'xpath',
    },
    channelListContainer: {
      selector:
        '//div[contains(@aria-label, "open channel")]/following-sibling::node()',
      locateStrategy: 'xpath',
    },
  },
  commands: [
    {
      selectChannel(channel) {
        return this.useCss()
          .click(`a[aria-label="go to channel ${channel}"]`)
          .pause(3000);
      },
      urlContains(channel) {
        return this.assert.urlContains(channel);
      },
      checkChannelListDropdown() {
        return this.click('@channelListDropdown').assert.attributeEquals(
          '@channelListContainer',
          'class',
          'MuiCollapse-container MuiCollapse-hidden',
        );
      },
      ariaChannelListDropdown() {
        return this.assert
          .attributeEquals(
            '@channelListDropdown',
            'aria-label',
            'open channel list',
          )
          .assert.attributeEquals(
            '@channelListDropdown',
            'aria-disabled',
            'false',
          )
          .expect.element('@channelListContainer').to.not.be.visible;
      },
    },
  ],
};
