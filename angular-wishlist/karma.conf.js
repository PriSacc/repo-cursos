// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/angular-wishlist'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false, //cuando corremos jasmin, quede la consola abierta --> true
    browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessCI'],
    customLaunchers: { //que los tests los tiene que correr dentro de un navegador
      ChromeHeadlessCI: { //que corra el navegador en como headless --> que no abre la ventana gráfica, garantiza que no tire error si circle no tiene instalado las librerias de graficas de mi SO
        base: 'ChromeHeadless',
        flags: ['--no-sandBox', '--disable-gpu', '--disable-translate', '--disable-extensions', '--remote-debugging-port=9223']
      }
    },
    singleRun: false,
    restartOnFileChange: true
  });
};
