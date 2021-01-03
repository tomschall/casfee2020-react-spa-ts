module.exports = {
  url: 'http://localhost:3000/channel/general',
  elements: {
    email: {
      selector: 'input[name=email]',
      locateStrategy: 'css',
    },
    password: {
      selector: 'input[name=password]',
      locateStrategy: 'css',
    },
    channelListDropdown: {
      selector: '//div[contains(@aria-label, "open channel")]',
      locateStrategy: 'xpath',
    },
    channelListContainer: {
      selector:
        '//div[contains(@aria-label, "open channel")]/following-sibling::node()',
      locateStrategy: 'xpath',
    },
    messageInput: {
      selector: 'textarea#chat-message-input',
      locateStrategy: 'css',
    },
    messageSubmit: {
      selector: 'button#message_submit',
      locateStrategy: 'css',
    },
  },
  commands: [
    {
      login(user, password) {
        return this.click('@email')
          .setValue('@email', user)
          .click('@password')
          .setValue('@password', password)
          .click('.auth0-lock-submit');
      },
      sendMessage(message) {
        return this.setValue('@messageInput', message)
          .pause(1000)
          .assert.valueContains('@messageInput', message)
          .click('@messageSubmit');
      },
      selectChannel(channel) {
        return this.useCss()
          .click(`a[aria-label="go to channel ${channel}"]`)
          .pause(3000);
      },
      urlContains(channel) {
        return this.assert.urlContains(channel);
      },
      closeChannelListDropdown() {
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
          .expect.element('@channelListDropdown').to.be.visible;
      },
      threadsList() {},
    },
  ],
};
