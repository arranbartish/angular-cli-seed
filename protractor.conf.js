// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

//const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:4200/',
  //chromeOnly: true,
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  framework: 'mocha',
  // jasmineNodeOpts: {
  //   showColors: true,
  //   defaultTimeoutInterval: 30000,
  //   print: function() {}
  // },
  mochaOpts: {
    reporter: "spec",
    slow: 3000,
    ui: 'bdd',
    timeout: 30000
    //bail: true 5143805700
  },
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  onPrepare: function() {
    //global.chai = require('chai');
    //chai.use(require('chai-string'));
    //chai.use(require('chai-as-promised'));
    //global.sinon = require('sinon');
    //global.expect = chai.expect;
    //jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
