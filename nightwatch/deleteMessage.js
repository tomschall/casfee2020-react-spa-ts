const messageList = '#message-list';

module.exports = () => ({
  'Delete message': (browser) => {
    browser
      .waitForElementVisible('body')
      .pause(3000)
      .waitForElementVisible('#message-list')
      .click(
        'css selector',
        '#message-list span button.MuiButtonBase-root:last-child',
        () => {
          console.log('Message deleted!');
        },
      )
      .pause(3000);
  },
});
