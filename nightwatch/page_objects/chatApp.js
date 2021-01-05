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
    messageList: {
      selector: '#message-list',
      locateStrategy: 'css',
    },
    addUserToChannelButton: {
      selector: '//button[contains(@aria-label, "add user to channel")]',
      locateStrategy: 'xpath',
    },
    channelListDropdown: {
      selector: '//div[contains(@aria-label, "open channel")]',
      locateStrategy: 'xpath',
    },
    channelListContainer: {
      selector:
        '//div[contains(@aria-label, "open channel list")]/following-sibling::node()',
      locateStrategy: 'xpath',
    },
    addChannelDropdown: {
      selector: '//div[contains(@aria-label, "open add channel")]',
      locateStrategy: 'xpath',
    },
    addChannelInput: {
      selector: '//input[contains(@placeholder, "Your channel name")]',
      locateStrategy: 'xpath',
    },
    checkPrivateChannel: {
      selector: 'input[name="private"]',
      locateStrategy: 'css',
    },
    addChannelSubmit: {
      selector: '//button/span[contains(text(), "Add new channel")]',
      locateStrategy: 'xpath',
    },
    messageInput: {
      selector: 'textarea#chat-message-input',
      locateStrategy: 'css',
    },
    messageSubmit: {
      selector: '//button[contains(@aria-label, "Send message")]',
      locateStrategy: 'xpath',
    },
    deleteMessageButton: {
      selector:
        '//*[@id="message-list"]/div[last()]/div[2]/div[1]/div[2]/div/span/button',
      locateStrategy: 'xpath',
    },
  },

  commands: [
    {
      login(user, password) {
        return this.click('@email')
          .setValue('@email', user)
          .click('@password')
          .setValue('@password', password)
          .click('.auth0-lock-submit')
          .expect.element('body').to.be.visible;
      },
      sendMessage(message) {
        return this.setValue('@messageInput', message)
          .pause(1000)
          .assert.valueContains('@messageInput', message)
          .click('@messageSubmit');
      },
      deleteMessage(query) {
        return this.waitForElementVisible('@messageList')
          .pause(3000)
          .useXpath()
          .click('@deleteMessageButton')
          .useCss()
          .assert.not.containsText('@messageList', query)
          .pause(3000);
      },
      selectChannel(channel) {
        return this.useCss()
          .click(`a[aria-label="go to channel ${channel}"]`)
          .pause(3000);
      },
      checkRedirect(channel) {
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
      addChannelPublic(channelName) {
        const channelNumber = Math.floor(Math.random() * 100);

        return this.click('@addChannelDropdown')
          .pause(3000)
          .setValue('@addChannelInput', `${channelName}${channelNumber}`)
          .pause(3000)
          .useXpath()
          .click('@addChannelSubmit')
          .pause(5000)
          .assert.containsText(
            '@channelListContainer',
            `${channelName}${channelNumber}`,
          )
          .assert.containsText(
            '@messageList',
            `Welcome to channel ${channelName}${channelNumber}`,
          );
      },
      addChannelPrivate(channelName) {
        const channelNumber = Math.floor(Math.random() * 100);
        return this.click('@addChannelDropdown')
          .pause(3000)
          .setValue('@addChannelInput', `${channelName}${channelNumber}`)
          .pause(3000)
          .click('@checkPrivateChannel')
          .pause(1000)
          .click('@addChannelSubmit')
          .pause(5000)
          .assert.containsText(
            '@channelListContainer',
            `${channelName}${channelNumber}`,
          )
          .assert.containsText(
            '@messageList',
            `Welcome to channel ${channelName}${channelNumber}`,
          )
          .expect.element('@addUserToChannelButton').to.be.visible;
      },
    },
  ],
};
