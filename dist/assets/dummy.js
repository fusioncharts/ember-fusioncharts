"use strict";



define('dummy/app', ['exports', 'dummy/resolver', 'ember-load-initializers', 'dummy/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Application = Ember.Application;


  var App = Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define("dummy/components/chart-viewer", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Component = Ember.Component;


    var dataSource = {
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

    exports.default = Component.extend({
        title: 'Ember-FusionCharts Wrapper',
        width: 600,
        height: 400,
        type: 'column2d',
        dataFormat: null,
        dataSource: null,
        chartConfig: null,
        events: null,
        actualValue: '',

        init: function init() {
            this._super.apply(this, arguments);
            this.set('chartConfig', {
                'containerBackgroundColor': '#ffffff'
            });
            this.set('dataFormat', 'json');
            this.set('dataSource', dataSource);
            var self = this;
            this.set('events', {
                dataplotRollOver: function dataplotRollOver(eventObj, dataObj) {
                    self.set('actualValue', dataObj.value);
                }
            });
        },


        actions: {
            onClick: function onClick() {
                this.set('dataFormat', 'xml');
                var newDataSource = "<chart caption=\"Top 10 Most Popular Sports in the World\"\n            subcaption=\"Based on number of viewers\" yaxisname=\"Number of Viewers\" plotgradientcolor=\"\"\n            bgcolor=\"FFFFFF\" showplotborder=\"0\" divlinecolor=\"CCCCCC\" showvalues=\"1\" showcanvasborder=\"0\"\n            canvasbordercolor=\"CCCCCC\" canvasborderthickness=\"1\" showyaxisvalues=\"0\" showlegend=\"1\"\n            showshadow=\"0\" labelsepchar=\": \" basefontcolor=\"000000\" labeldisplay=\"AUTO\"\n            numberscalevalue=\"1000,1000,1000\" numberscaleunit=\"K,M,B\"\n            palettecolors=\"#008ee4,#9b59b6,#6baa01,#e44a00,#f8bd19,#d35400,#bdc3c7,#95a5a6,#34495e,#1abc9c\"\n            showborder=\"0\"  rotateValues=\"0\" placevaluesInside=\"0\" valueFontColor=\"#909090\" theme=\"fint\">\n            <set label=\"Football\" value=\"3500000000\" tooltext=\"Popular in: {br}Europe{br}Africa{br}Asia{br}Americas\" />\n            <set label=\"Cricket\" value=\"4400000000\" tooltext=\"Popular in: {br}India{br}UK{br}Pakistan{br}Australia\" />\n            <set label=\"Field Hockey\" value=\"2200000000\" tooltext=\"Popular in: {br}Asia{br}Europe{br}Africa{br}Australia\" />\n            <set label=\"Tennis\" value=\"1000000000\" color=\"e44a00\" tooltext=\"Popular in: {br}Europe{br}Americas{br}Asia\" />\n            <set label=\"Volleyball\" value=\"900000000\" tooltext=\"Popular in: {br}Asia{br}Europe{br}Americas{br}Australia\" />\n            <set label=\"Table Tennis\" value=\"900000000\" tooltext=\"Popular in: {br}Asia{br}Europe{br}Africa{br}Americas\" />\n            <set label=\"Baseball\" value=\"500000000\" tooltext=\"Popular in: {br}US{br}Japan{br}Cuba{br}Dominican Republic\" />\n            <set label=\"Golf\" value=\"400000000\" tooltext=\"Popular in: {br}US{br}Canada{br}Europe\" />\n            <set label=\"Basketball\" value=\"400000000\" tooltext=\"Popular in: {br}US{br}Canada\" />\n            <set label=\"American football\" value=\"390000000\" tooltext=\"Popular in:{br}US\" />\n            </chart>";
                this.set('dataSource', newDataSource);
            }
        }
    });
});
define('dummy/components/fusioncharts-xt', ['exports', 'ember-fusioncharts/components/fusioncharts-xt'], function (exports, _fusionchartsXt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _fusionchartsXt.default;
    }
  });
});
define('dummy/ember-fusioncharts/tests/addon.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | addon');

  QUnit.test('ember-fusioncharts/components/fusioncharts-xt.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-fusioncharts/components/fusioncharts-xt.js should pass ESLint\n\n');
  });

  QUnit.test('ember-fusioncharts/utils/options.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-fusioncharts/utils/options.js should pass ESLint\n\n');
  });

  QUnit.test('ember-fusioncharts/utils/utils.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-fusioncharts/utils/utils.js should pass ESLint\n\n');
  });
});
define('dummy/ember-fusioncharts/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('ember-fusioncharts/components/fusioncharts-xt.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-fusioncharts/components/fusioncharts-xt.js should pass ESLint\n\n');
  });
});
define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('dummy/initializers/export-application-global', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('dummy/router', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var EmberRouter = Ember.Router;


  var Router = EmberRouter.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {});

  exports.default = Router;
});
define('dummy/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("dummy/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MXF88V1c", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"chart-viewer\"],false],[0,\"\\n\\n\"],[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "dummy/templates/application.hbs" } });
});
define("dummy/templates/components/chart-viewer", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "3dDydsg8", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[7],[0,\"\\n\\n    \"],[6,\"h1\"],[7],[1,[18,\"title\"],false],[8],[0,\"\\n\\n    \"],[1,[25,\"fusioncharts-xt\",null,[[\"width\",\"height\",\"type\",\"dataFormat\",\"dataSource\",\"events\",\"chartConfig\"],[[20,[\"width\"]],[20,[\"height\"]],[20,[\"type\"]],[20,[\"dataFormat\"]],[20,[\"dataSource\"]],[20,[\"events\"]],[20,[\"chartConfig\"]]]]],false],[0,\"\\n\\n    \"],[6,\"p\"],[7],[0,\"Actual Value: \"],[1,[18,\"actualValue\"],false],[8],[0,\"\\n\\n    \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"onClick\"]],[7],[0,\"Change Chart Data\"],[8],[0,\"\\n\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "dummy/templates/components/chart-viewer.hbs" } });
});


define('dummy/config/environment', [], function() {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("dummy/app")["default"].create({});
}
//# sourceMappingURL=dummy.map
