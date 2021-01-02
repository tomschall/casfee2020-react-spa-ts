const message = 'nightwatch sending a message';
const messageList = '#message-list';

module.exports = () => ({
  'Check thread link - sidebar': (browser) => {
    browser
      .pause(3000)
      .useXpath()
      .click('//*[@id="root"]/div/main/nav/div/div/div[3]/a')
      .pause(3000)
      .useXpath()
      .expect.element('//*[@id="root"]/div/div/main/div[2]/header/div').to.be
      .visible;
  },
  'Check thread list': (browser) => {
    browser.expect.element(
      '//*[@id="root"]/div/div/main/div[2]/div/div/div[1]/div',
    ).to.be.present;
  },
});
