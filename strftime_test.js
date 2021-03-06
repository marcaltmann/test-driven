function assert(message, expr) {
  if (!expr) {
    throw new Error(message);
  }

  assert.count++;

  return true;
}

assert.count = 0;

function output(text, color) {
  var p = document.createElement('p');
  p.innerHTML = text;
  p.style.color = color;
  document.body.appendChild(p);
}

testCase('strftime test', {
  setUp: function() {
    this.date = new Date(2009, 9, 2, 22, 14, 45);
  },
  'test format specifier %Y': function() {
    assert('%Y should return full year', Date.formats.Y(this.date) === 2009);
  },
  'test format specifier %m': function() {
    assert('%m should return month', Date.formats.m(this.date) === '10');
  },
  'test format specifier %d': function() {
    assert('%d should return day of month', Date.formats.d(this.date) === '02');
  },
  'test format specifier %y': function() {
    assert('%y should return year as two digits', Date.formats.y(this.date) === '09');
  },
  'test format specifier %F': function() {
    assert('%F should be shortcut for %Y-%m-%d', Date.formats.F === ('%Y-%m-%d'));
  },
});

function testCase(name, tests) {
  assert.count = 0;
  var successful = 0;
  var testCount = 0;
  var hasSetup = typeof tests.setUp === 'function';
  var hasTeardown = typeof tests.tearDown === 'function';

  for (var test in tests) {
    if (!/^test/.test(test)) {
      continue;
    }

    testCount++;

    try {
      if (hasSetup) {
        tests.setUp();
      }

      tests[test]();
      output(test, '#0c0');

      if (hasTeardown) {
        tests.tearDown();
      }

      // If the tearDown method throws an error, it is considered a test failure,
      // so we don't count success until all methods have run successfully.
      successful++;
    } catch(e) {
      output(test + ' failed: ' + e.message, '#c00');
    }
  }

  var color = successful === testCount ? '#0c0' : '#c00';
  output(
    '<strong>' + testCount + ' tests, ' + (testCount - successful) + ' failures</strong>',
    color);
}
