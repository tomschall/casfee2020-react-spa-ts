module.exports = {
  'Login user': function (browser) {
    browser
      .url(browser.globals.url)
      .waitForElementVisible('body')
      .pause(3000)
      .click('input[name=email]')
      .setValue('input[name=email]', browser.globals.user)
      .click('input[name=password]')
      .setValue('input[name=password]', browser.globals.pw)
      .click('.auth0-lock-submit')
      .waitForElementVisible('body')
      .pause(1000);
  },
  'HEAD - check metatags, font includes, viewport': (browser) => {
    browser

      .waitForElementVisible('body')
      .verify.title('Chicken Chat - CasFee 2020')
      .verify.attributeEquals(
        {
          selector: 'link[rel="icon"]',
          index: 0,
        },
        'href',
        `${browser.globals.url}favicon.ico`,
      )
      .verify.attributeEquals(
        'meta[name="description"]',
        'content',
        'CASFEE 2020 - Hochschule für Technik Rapperswil',
      )
      .verify.attributeEquals(
        'meta[name="viewport"]',
        'content',
        'width=device-width, initial-scale=1, maximum-scale=1',
      )
      .assert.attributeContains(
        {
          selector: 'link[rel="stylesheet"]',
          index: 0,
        },
        'href',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
      )
      .assert.attributeContains(
        {
          selector: 'link[rel="stylesheet"]',
          index: 1,
        },
        'href',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
      )
      .end();
  },
};
