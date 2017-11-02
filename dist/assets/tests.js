'use strict';

define('dummy/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/chart-viewer.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/chart-viewer.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
});
define('dummy/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  var run = Ember.run;
  function destroyApp(application) {
    run(application, 'destroy');
  }
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var resolve = Ember.RSVP.resolve;
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/resolver', 'dummy/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('dummy/tests/helpers/start-app', ['exports', 'dummy/app', 'dummy/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  var merge = Ember.merge;
  var run = Ember.run;
  function startApp(attrs) {
    var attributes = merge({}, _environment.default.APP);
    attributes = merge(attributes, attrs); // use defaults, but you can override;

    return run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('dummy/tests/integration/components/fusioncharts-xt-test', ['ember-qunit'], function (_emberQunit) {
    'use strict';

    (0, _emberQunit.moduleForComponent)('fusioncharts-xt', 'Integration | Component | fusioncharts xt', {
        integration: true
    });

    (0, _emberQunit.test)('It should render the chart in a div element', function (assert) {
        feedChartConfig(this);
        this.render(Ember.HTMLBars.template({
            "id": "ooRMBQNR",
            "block": "{\"symbols\":[],\"statements\":[[1,[25,\"fusioncharts-xt\",null,[[\"width\",\"height\",\"type\",\"dataFormat\",\"dataSource\"],[[20,[\"width\"]],[20,[\"height\"]],[20,[\"type\"]],[20,[\"dataFormat\"]],[20,[\"dataSource\"]]]]],false]],\"hasEval\":false}",
            "meta": {}
        }));
        assert.equal(this.$('div').prop("tagName").toUpperCase(), 'DIV');
    });

    (0, _emberQunit.test)('It should render a svg element for chart', function (assert) {
        feedChartConfig(this);
        this.render(Ember.HTMLBars.template({
            "id": "ooRMBQNR",
            "block": "{\"symbols\":[],\"statements\":[[1,[25,\"fusioncharts-xt\",null,[[\"width\",\"height\",\"type\",\"dataFormat\",\"dataSource\"],[[20,[\"width\"]],[20,[\"height\"]],[20,[\"type\"]],[20,[\"dataFormat\"]],[20,[\"dataSource\"]]]]],false]],\"hasEval\":false}",
            "meta": {}
        }));
        assert.equal(this.$('svg').prop("tagName").toUpperCase(), 'SVG');
    });

    function feedChartConfig(comp) {
        comp.set('width', 600);
        comp.set('height', 400);
        comp.set('type', 'column2d');
        comp.set('dataFormat', 'json');
        comp.set('dataSource', sampleData);
    }

    var sampleData = {
        "chart": {
            "caption": "Harry's SuperMart",
            "subCaption": "Top 5 stores in last month by revenue",
            "numberPrefix": "$",
            "theme": "ocean"
        },
        "data": [{
            "label": "Bakersfield Central",
            "value": "880000"
        }, {
            "label": "Garden Groove harbour",
            "value": "730000"
        }, {
            "label": "Los Angeles Topanga",
            "value": "590000"
        }, {
            "label": "Compton-Rancho Dom",
            "value": "520000"
        }, {
            "label": "Daly City Serramonte",
            "value": "330000"
        }]
    };
});
define('dummy/tests/test-helper', ['dummy/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('dummy/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fusioncharts-xt-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fusioncharts-xt-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
