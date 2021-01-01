const messageList = '#message-list';
const lastDeleteButton =
  '//*[@id="message-list"]/div[last()]/div[2]/div[1]/div[2]/div/span/button';

module.exports = () => ({
  'Delete last message': (browser) => {
    browser
      .waitForElementVisible('#message-list')
      .pause(3000)
      .useXpath()
      .click(
        '//*[@id="message-list"]/div[last()]/div[2]/div[1]/div[2]/div/span/button',
      )
      .pause(3000);
  },
});
