module.exports = () => ({
  'Login user': (browser) => {
    browser
      .url(browser.globals.url)
      .waitForElementVisible('body')
      .pause(3000)
      .click('input[name=email]')
      .setValue('input[name=email]', browser.globals.user)
      .click('input[name=password]')
      .setValue('input[name=password]', browser.globals.pw)
      .click('.auth0-lock-submit')
      .waitForElementVisible('body');
  },
});
