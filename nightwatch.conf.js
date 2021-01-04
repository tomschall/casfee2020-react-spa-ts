// Autogenerated by Nightwatch
// Refer to the online docs for more details: https://nightwatchjs.org/gettingstarted/configuration/
const Services = {};
const browserSize = 'window-size=1920,1080';
loadServices();

module.exports = {
  src_folders: ['nightwatch'],
  page_objects_path: ['nightwatch/page_objects'],

  webdriver: {
    start_process: true,
    server_path: 'node_modules/.bin/chromedriver',
    cli_args: ['--verbose'],
    port: 9000,
    keep_alive: { enabled: true, keepAliveMsecs: 2000 },
  },

  test_settings: {
    default: {
      globals: {
        url: 'http://localhost:3000',
        waitForConditionTimeout: 5000,
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        chromeOptions: {
          args: ['--no-sandbox', '--disable-gpu', browserSize],
        },
        addons: {
          chrome: 'stable',
        },
      },
    },
    production: {
      globals: {
        url: 'https://chickenfest.ch',
        waitForConditionTimeout: 5000,
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        chromeOptions: {
          args: ['--no-sandbox', '--disable-gpu', browserSize],
        },
        addons: {
          chrome: 'stable',
        },
      },
    },
  },
};

function loadServices() {
  try {
    Services.seleniumServer = require('selenium-server');
  } catch (err) {}

  try {
    Services.chromedriver = require('chromedriver');
  } catch (err) {}

  try {
    Services.geckodriver = require('geckodriver');
  } catch (err) {}
}
