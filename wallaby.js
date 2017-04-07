var wallabyWebpack = require('wallaby-webpack');

var electronParams = {};
if(process.env.DISABLE_GPU){
  /* if you are having issues with your GPU such as https://github.com/wallabyjs/public/issues/1076
   * then simply defined an environment variable in the trouble environment DISABLE_GPU=true and electron will use
   * chrome environment with the GPU disabled
   */
  electronParams.runner = '--disable-gpu';
}

var webpackPostprocessor = wallabyWebpack({
  entryPatterns: [
    'src/wallabyTest.js',
    'src/**/*spec.js'
  ],

  module: {
    loaders: [
      {test: /\.css$/, loader: 'raw-loader'},
      {test: /\.html$/, loader: 'raw-loader'},
      {test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.styl$/, loaders: ['raw-loader', 'stylus-loader']},
      {test: /\.less$/, loaders: ['raw-loader', 'less-loader']},
      {test: /\.scss$|\.sass$/, loaders: ['raw-loader', 'sass-loader']},
      {test: /\.(jpg|png)$/, loader: 'url-loader?limit=128000'}
    ]
  }
});

var compilerOptions = require('./src/tsconfig.spec.json').compilerOptions;

module.exports = function (wallaby) {

  return {
    files: [
      { pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false },
      { pattern: 'node_modules/chai/chai.js', instrument: false },
      { pattern: 'node_modules/sinon-chai/lib/sinon-chai.js', instrument: false },
      { pattern: 'src/**/*.ts', load: false },
      { pattern: 'src/**/*.d.ts', ignore: true },
      { pattern: 'src/**/*.css', load: false },
      { pattern: 'src/**/*.less', load: false },
      { pattern: 'src/**/*.scss', load: false },
      { pattern: 'src/**/*.sass', load: false },
      { pattern: 'src/**/*.html', load: false },
      { pattern: 'src/**/*spec.ts', ignore: true }
    ],

    tests: [
      {pattern: 'src/**/*spec.ts', load: false}
    ],

    testFramework: 'mocha',

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },

    env: {
      kind: 'electron',
      params: electronParams
    },

    postprocessor: webpackPostprocessor,

    setup: function () {
      window.expect = chai.expect;
      window.__moduleBundler.loadTests();
    },

    debug: true
  };
};
