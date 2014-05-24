/* global casper, isogram */

'use strict';

function loadAnalytics(args) {
  if (args === undefined) {
    eval(isogram());
  } else {
    eval(isogram(args));
  }
}

var testArgs = [
  undefined,
  'isogr',
  'isogra',
  'isogram'
];

casper.start('test/browser/index.html', function() {
  casper.test.begin('isogram()', 1, test => {
    test.assertEvalEquals(
      () => typeof isogram,
      'function',
      'should be a Function.'
    );
    test.done();
  });
  
}).each(testArgs, function(itself, arg) {
  casper.test.begin(`The script generated using isogram() with ${
    arg? arg.length: 'no'
  } arguments.`, 2, test => {
    this.reload(() => {
      casper.evaluate(loadAnalytics);
      test.assertEvalEquals(
        () => typeof window.ga,
        'function',
        'should create a global function named "ga".'
      );
      test.assertEquals(
        this.getElementAttribute('script', 'src'),
        '//www.google-analytics.com/analytics.js',
        'should create a script tag for loading analytics.js.'
      );
      test.done();
    });
  });
}).run();